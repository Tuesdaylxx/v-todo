<template>
  <div class="to-do">
    <!-- 折叠面板 -->
    <van-collapse v-model="activeNames">
      <!-- 待完成 -->
      <van-collapse-item title="待办事项" :value="todoTitle" name="1">
        <div class="todo-wrap">
          <to-do-list
            class="todo-item"
            v-for="(item, index) in currentTodoList"
            :key="index"
            :item="item"
            :index="index"
          >
          </to-do-list>
        </div>
      </van-collapse-item>
      <!-- 已完成 -->
      <van-collapse-item
        title="已完成"
        name="2"
        :value="doneTitle"
        ref="collapseIsShow"
        ><div class="done-wrap">
          <to-do-list
            class="todo-item"
            v-for="(item, index) in currentDoneList"
            :key="index"
            :item="item"
            :index="index"
          >
          </to-do-list></div
      ></van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ToDoList from "@/views/home/childComps/ToDoList.vue";
export default {
  name: "HomeToDo",
  components: { ToDoList },
  data() {
    return {
      activeNames: ["1"],
    };
  },

  computed: {
    ...mapGetters(["currentTodoList", "currentDoneList"]),
    // 待办事项标题
    todoTitle() {
      return this.currentTodoList.length;
    },
    doneTitle() {
      return this.currentDoneList.length;
    },
  },
  mounted() {
    this.$refs.collapseIsShow.toggle(true);
  },
};
</script>

<style scoped>
.to-do >>> .van-collapse-item__content {
  padding: 0 24px;
}
.to-do >>> .van-cell,
.to-do >>> .van-collapse-item__content {
  background-color: transparent;
}
.to-do >>> .van-cell__title {
  font-size: 18px;
  margin-bottom: 10px;
}

.to-do >>> .van-collapse-item:nth-child(2) {
  position: sticky;
  bottom: 55px;
  background-color: var(--color-background);
}
.to-do >>> .van-icon-arrow {
  margin-left: 15px;
}
.todo-wrap {
  padding-bottom: 40px;
}
.done-wrap >>> .list-bar-item {
  background-color: transparent;
}
</style>
