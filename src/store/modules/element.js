import Vue from 'vue';
import { compCommonStyle } from '@utils/style';

export default {
  mutations: {
    ADD_ELEMENT(state, element) {
      const { projectData, currPageIdx } = state;

      projectData.pages[currPageIdx].elements.push(element);
    },

    DELETE_ELEMENT(state, uuid) {
      const { projectData, currPageIdx } = state;
      const currPage = projectData.pages[currPageIdx];

      const idx = currPage.elements.findIndex(_ => _.uuid === uuid);

      currPage.elements.splice(idx, 1);
    },

    UPDATE_ELEMENT(state, payload) {
      const { uuid } = payload;
      const index = state.eleSchema.findIndex(_ => _.uuid === uuid);

      const element = {
        ...state.eleSchema[index],
        ...payload
      };

      Vue.set(state.eleSchema, index, element);
    },

    // --------------- 元素样式 ---------------
    UPDATE_ELEMENT_STYLE(state, payload) {
      const { currPageIdx, projectData } = state;
      const { uuid, compStyle, eleStyle } = payload;
      const currPage = projectData.pages[currPageIdx];

      const eleIdx = currPage.elements.findIndex(_ => _.uuid === uuid);
      const element = currPage.elements[eleIdx];

      element.compStyle = {
        ...element.compStyle,
        ...compStyle
      };

      element.eleStyle = {
        ...element.eleStyle,
        ...eleStyle
      };

      Vue.set(currPage.elements, eleIdx, element);
    },

    // --------------- 元素动画 ---------------
    ADD_ANIMATION(state, payload) {
      const { element, animation } = payload;

      element.animations.push(animation);
    },

    DELETE_ANIMATION(state, payload) {
      const { element, animationIdx } = payload;

      element.animations.splice(animationIdx, 1);
    },

    UPDATE_ANIMATION(state, payload) {
      const { element, animationIdx, animation } = payload;

      const newAnimation = {
        ...element.animations[animationIdx],
        ...animation
      };

      Vue.set(element.animations, animationIdx, newAnimation);
    }
  },

  actions: {
    /**
     * 添加元素
     * @param context context
     * @param payload payload
     */
    addElement(context, payload) {
      const { element } = payload;
      const { component } = element;

      // 1. 加载组件的默认样式
      const libComp = require.context(
        // 其组件目录的相对路径
        '../../components/lib',
        // 是否查询其子目录
        true,
        // 匹配基础组件文件名的正则表达式
        /\.\/(\w+\/config\.js$)/
      );
      const fileName = component.replace(component[0], component[0].toUpperCase());
      const compConfig = libComp(`./${fileName}/config.js`);

      const { defaultStyle } = compConfig;
      element.compStyle = {
        ...compCommonStyle,
        ...defaultStyle
      };

      // 2. 动画列表
      element.animations = element.animations || [];

      // 3. 添加元素
      context.commit('ADD_ELEMENT', element);
    },

    /**
     * 设置组件样式
     * @param context context
     * @param payload payload
     */
    setCompStyle(context, payload) {
      const { uuid, compStyle } = payload;

      const element = context.state.eleSchema
        .find(_ => _.uuid === uuid);

      element.compStyle = compStyle;
    },

    /**
     * 更新样式
     * @param context context
     * @param payload payload
     */
    updateStyle(context, payload) {
      const { uuid, compStyle = {}, eleStyle = {} } = payload;

      context.commit('UPDATE_ELEMENT_STYLE', {
        uuid,
        compStyle,
        eleStyle
      });

      return context.getters.getElementByUUID(uuid);
    },

    /**
     * 移动元素
     * @param context context
     * @param payload payload
     * @param payload.eleStyle 拖拽前的元素样式
     */
    elementMove(context, payload) {
      const { uuid, moveX, moveY, eleStyle } = payload;

      const { left, top } = eleStyle;

      context.commit('UPDATE_ELEMENT_STYLE', {
        uuid,
        eleStyle: {
          left: left + moveX,
          top: top + moveY
        }
      });
    },

    /**
     * 元素添加动画
     */
    addAnimation(context, payload) {
      const { animation } = payload;
      const { duration = 1, delay = 0, cycle = 0 } = animation;

      context.commit('ADD_ANIMATION', {
        element: context.getters.currElement,
        animation: {
          ...animation,
          duration,
          delay,
          cycle
        }
      });
    },

    /**
     * 元素更换动画
     */
    changeAnimation(context, payload) {
      const { animationIdx, animation } = payload;

      context.commit('UPDATE_ANIMATION', {
        element: context.getters.currElement,
        animationIdx,
        animation
      });
    }
  },

  getters: {
    currElement: (state, getters) => getters.currPage.elements.find(_ => _.uuid === state.focusList[0]),

    getElementByUUID: (state, getters) => (uuid) => getters.currPage.elements.find(_ => _.uuid === uuid)
  }
};
