import element from './element';
import { pageCommonStyle } from '@utils/style';

export default {
  mutations: {
    ...element.mutations,

    SET_PAGES(state, pages) {
      state.projectData.pages = pages;
    },

    ADD_PAGE(state, page) {
      state.projectData.pages.push(page);
    },

    DELETE_PAGE(state, pageUUID) {
      const idx = state.projectData.pages.findIndex(_ => _.uuid === pageUUID);

      state.projectData.pages.splice(idx, 1);
    },

    SET_CURR_PAGE_IDX(state, idx) {
      state.currPageIdx = idx;
    }
  },

  actions: {
    ...element.actions,

    addPage(context, page) {
      const { elements = [], pageStyle = {}, config = {} } = page;

      const mixPageStyle = {
        ...pageCommonStyle,
        ...pageStyle
      };

      context.commit('ADD_PAGE', {
        elements,
        pageStyle: mixPageStyle,
        config
      });
    }
  },

  getters: {
    ...element.getters,

    currPage: (state) => state.projectData.pages[state.currPageIdx],

    getPageByIdx: (state) => (currPageIdx) => state.pages[currPageIdx]
  }
};
