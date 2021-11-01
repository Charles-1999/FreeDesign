export default {
  namespaced: true,

  state: {
    // 快照
    snapshots: [[]],

    // 当前索引
    cursor: 0
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
      if (cursor <= 0) {
        cursor = 0;
      }
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
      const { state, getters } = context;
      const { cursor } = state;

      if (cursor <= 0) return getters.currSnapShot;

      context.commit('SET_CURSOR', cursor - 1);

      context.commit('editor/SET_ELESCHEMA', {
        eleSchema: JSON.parse(JSON.stringify(getters.currSnapShot)) || []
      }, {
        root: true
      });

      return getters.currSnapShot;
    },

    /**
     * 重做
     * @param context context
     * @param payload payload
     * @return 当前快照
     */
    redo(context, payload) {
      const { state, getters } = context;
      const { cursor, snapshots } = state;

      if (cursor >= snapshots.length - 1) return getters.currSnapShot;

      context.commit('SET_CURSOR', cursor + 1);

      context.commit('editor/SET_ELESCHEMA', {
        eleSchema: JSON.parse(JSON.stringify(getters.currSnapShot)) || []
      }, {
        root: true
      });

      return getters.currSnapShot;
    }
  },

  getters: {
    // 当前快照
    currSnapShot: state => state.snapshots[state.cursor]
  }
};
