export default {
  namespaced: true,

  state: {
    // 快照
    snapshots: [],

    // 当前索引
    cursor: -1
  },

  mutations: {
    /**
     * 追加一个快照
     * @param state   state
     * @param snapshot  snapshot
     */
    ADD_SNAPSHOT(state, snapshot) {
      state.snapshots.push(snapshot);
    },

    /**
     * 设置当前索引
     * @param state   state
     * @param cursor  cursor
     */
    SET_CURSOR(state, cursor) {
      state.cursor = cursor;
    }
  },

  actions: {
    /**
     * 记录快照
     * @param context context
     * @param payload payload
     * @return 当前快照
     */
    record(context, snapshot) {
      const { cursor, snapshots } = context.state;
      const { editor: { eleSchema } } = context.rootState;

      // 默认在editor的state中取当前的eleSchema
      if (!snapshot) {
        snapshot = JSON.parse(JSON.stringify(eleSchema));
      }

      // 1. 清空后面的快照
      while (cursor < snapshots.length - 1) {
        snapshots.pop();
      }
      // 2. 追加快照
      context.commit('ADD_SNAPSHOT', snapshot);
      // 3. 移动游标
      context.commit('SET_CURSOR', snapshots.length - 1);

      return context.getters.currSnapShot;
    },

    /**
     * 撤销
     * @param context context
     * @param payload payload
     * @return 当前快照
     */
    undo(context, payload) {
      context.commit('SET_CURSOR', context.state.cursor - 1);

      context.commit('editor/setEleSchema', {
        eleSchema: context.getters.currSnapShot
      }, {
        root: true
      });

      return context.getters.currSnapShot;
    },

    /**
     * 重做
     * @param context context
     * @param payload payload
     * @return 当前快照
     */
    redo(context, payload) {
      context.commit('SET_CURSOR', context.state.cursor + 1);

      context.commit('editor/setEleSchema', {
        eleSchema: context.getters.currSnapShot
      }, {
        root: true
      });

      return context.getters.currSnapShot;
    }
  },

  getters: {
    // 当前快照
    currSnapShot: state => state.snapshots[state.cursor]
  }
};
