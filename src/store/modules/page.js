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

      context.commit('SET_CURR_PAGE_IDX', idx + 1);
    },

    deletePage(context, uuid) {
      context.commit('DELETE_PAGE', uuid);

      // 始终保持有一页
      if (context.state.projectData.pages.length <= 0) {
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
