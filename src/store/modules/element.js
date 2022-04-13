import Vue from 'vue';
import { compCommonStyle, eleCommonStyle } from '@utils/style';

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
      const { projectData, currPageIdx } = state;
      const currPage = projectData.pages[currPageIdx];
      const { uuid } = payload;

      const index = currPage.elements.findIndex(_ => _.uuid === uuid);

      const element = {
        ...currPage.elements[index],
        ...payload
      };

      Vue.set(currPage.elements, index, element);
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
      const { elements } = context.getters.currPage;

      // 1. 加载组件的配置
      const libComp = require.context(
        '../../components/lib',
        true,
        /\.\/(\w+\/config\.js$)/
      );
      const fileName = component.replace(component[0], component[0].toUpperCase());
      const compConfig = libComp(`./${fileName}/config.js`);

      const { defaultStyle, defaultProps } = compConfig;

      // 2. 元素组件样式相关
      // 2.1 计算元素层级
      const defaultZIndex = 100;
      const zIndex = Math.max(...elements.map(_ => _.eleStyle.zIndex), defaultZIndex) + 1;

      // 2.2 配置元素的样式
      element.compStyle = {
        ...compCommonStyle,
        ...defaultStyle,
        ...element.compStyle
      };

      element.eleStyle = {
        ...eleCommonStyle,
        ...element.eleStyle,
        zIndex: element.eleStyle.zIndex || zIndex
      };

      // 3. 动画列表
      element.animations = element.animations || [];

      // 4. 组件默认props
      if (!element.props) {
        element.props = JSON.parse(JSON.stringify(defaultProps));
      }

      // 5. 添加元素
      context.commit('ADD_ELEMENT', element);

      // 6. 改变当前选中的元素
      context.commit('SET_FOCUSLIST', [element.uuid]);
    },

    /**
     * 移除元素
     * @param context context
     * @param payload payload
     */
    removeElement(context, payload) {
      const { uuid } = payload;

      // 1. 移除元素
      context.commit('DELETE_ELEMENT', uuid);

      // 2. 重置当前选中的元素
      context.commit('SET_FOCUSLIST', []);
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
    },

    /**
     * 改变图层
     * @param type 类型: up 上移、down 下移、top 置顶、bottom 置底
     */
    changeZIndex(context, payload) {
      const { uuid, type } = payload;
      const { getElementByUUID, elementsByZIndexASC } = context.getters;

      // 当前操作的元素
      const currElement = getElementByUUID(uuid);
      const currIdx = elementsByZIndexASC.findIndex(_ => _.uuid === uuid);
      const currZIndex = currElement.eleStyle.zIndex;

      // 上移，与上一层交换；下移，与下一层交换
      if (['up', 'down'].includes(type)) {
        const idx = type === 'up' ? currIdx + 1 : currIdx - 1;
        const target = elementsByZIndexASC[idx] || currElement;

        currElement.eleStyle.zIndex = target.eleStyle.zIndex;
        target.eleStyle.zIndex = currZIndex;
      }

      // 置顶，后面全部前移，与冒泡差不多
      if (type === 'top') {
        for (let i = currIdx + 1; i < elementsByZIndexASC.length; i++) {
          const temp = elementsByZIndexASC[i].eleStyle.zIndex;
          elementsByZIndexASC[i].eleStyle.zIndex = currElement.eleStyle.zIndex;
          currElement.eleStyle.zIndex = temp;
        }
      }

      // 置底，前面全部往后移，与冒泡差不多
      if (type === 'bottom') {
        for (let i = currIdx - 1; i >= 0; i--) {
          const temp = elementsByZIndexASC[i].eleStyle.zIndex;
          elementsByZIndexASC[i].eleStyle.zIndex = currElement.eleStyle.zIndex;
          currElement.eleStyle.zIndex = temp;
        }
      }
    }
  },

  getters: {
    currElement: (state, getters) =>
      getters.currPage.elements.find(_ => _.uuid === state.focusList[0]) ||
      { animations: [] },

    getElementByUUID: (state, getters) => (uuid) => getters.currPage.elements.find(_ => _.uuid === uuid),

    // 根据zIndex升序排序的元素
    elementsByZIndexASC: (state, getters) => getters.currPage.elements.sort((a, b) => a.eleStyle.zIndex - b.eleStyle.zIndex)
  }
};
