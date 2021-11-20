import element from './element';
import { pageCommonStyle } from '@utils/style';

export default {
  mutations: {
    ...element.mutations,

    SET_PAGES(state, pages) {
      state.projectData.pages = pages;
    },

    ADD_PAGE(state, { page, idx }) {
      // 没有提供索引，从最后插入
      if (idx === undefined) {
        state.projectData.pages.push(page);
      } else {
        state.projectData.pages.splice(idx + 1, 0, page);
      }
    },

    DELETE_PAGE(state, uuid) {
      const idx = state.projectData.pages.findIndex(_ => _.uuid === uuid);

      state.projectData.pages.splice(idx, 1);
    },

    SET_CURR_PAGE_IDX(state, idx) {
      state.currPageIdx = idx;
    }
  },

  actions: {
    ...element.actions,

    setPages(context, pages) {
      const { focusList, currPageIdx } = context.state;

      // 如果新的改动找不到当前聚焦的元素，就需要清空focusList
      if (!pages[currPageIdx].elements.find(_ => _.uuid === focusList[0])) {
        context.commit('SET_FOCUSLIST', []);
      }

      context.commit('SET_PAGES', pages);
    },

    addPage(context, { page, idx }) {
      const { elements = [], pageStyle = {}, config = {} } = page;

      const mixPageStyle = {
        ...pageCommonStyle,
        ...pageStyle
      };

      context.commit('ADD_PAGE', {
        page: {
          uuid: Date.now(),
          elements,
          pageStyle: mixPageStyle,
          config
        },
        idx
      });

      const pageIdx = idx ? idx + 1 : context.state.currPageIdx + 1;
      context.commit('SET_CURR_PAGE_IDX', pageIdx);
    },

    deletePage(context, uuid) {
      const { currPageIdx, projectData } = context.state;
      const pagesCount = projectData.pages.length;
      const pageIdx = pagesCount <= currPageIdx ? pagesCount - 1 : currPageIdx;

      // 1. 删除页面
      context.commit('DELETE_PAGE', uuid);

      // 2. 重新设置当前页索引
      context.commit('SET_CURR_PAGE_IDX', pageIdx);

      // 3. 始终保持有一页
      if (projectData.pages.length <= 0) {
        context.dispatch('addPage', { page: {} });
      }
    },

    copyPage(context, { page, idx }) {
      context.commit('ADD_PAGE', {
        page: JSON.parse(JSON.stringify(page)),
        idx
      });

      context.commit('SET_CURR_PAGE_IDX', idx + 1);
    }
  },

  getters: {
    ...element.getters,

    currPage: (state) => state.projectData.pages[state.currPageIdx],

    getPageByIdx: (state) => (currPageIdx) => state.pages[currPageIdx]
  }
};
