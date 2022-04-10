<template>
  <div class="todo-list">
    <list-bar class="list-item">
      <template #icon>
        <van-icon
          name="circle"
          v-show="item.done == false"
          :color="item.color"
          @click="goDone"
        />
        <van-icon
          name="success"
          color="#aaa"
          @click="goTodo"
          v-show="item.done == true"
        />
      </template>
      <template #content>
        <div @click="goEdit">
          <h4>{{ item.content }}</h4>
          <p>{{ time }}</p>
        </div>
      </template>
      <template #delete>
        <div class="delete" @click="goDelete">
          <van-icon name="delete-o" />
        </div>
      </template>
    </list-bar>
  </div>
</template>

<script>
import ListBar from "@/components/toDoList/ListBar.vue";
export default {
  name: "ToDoList",
  components: { ListBar },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
    },
  },
  computed: {
    time() {
      const date = new Date(this.item.time);
      return date.toTimeString();
    },
  },
  methods: {
    goDelete() {
      this.$store.dispatch("deleteList", this.item.id);
    },

    goEdit() {
      // 打开弹层,将本身内容填到文本框中
      // 发送事件到newbutton组件
      let oldListIndex = this.$store.state.todoList.findIndex(
        (val) => val.id === this.$store.state.currentDateTodo[this.index].id
      );
      this.$bus.$emit("goEdit", oldListIndex);
    },
    goDone() {
      // 将vuex中done改为true  completeTodoList
      const id = this.$store.getters.currentTodoList[this.index].id;
      this.$store.commit("completeList", id);
    },
    goTodo() {
      const id = this.$store.getters.currentDoneList[this.index].id;
      this.$store.commit("notCompleteList", id);
    },
  },
};
</script>

<style scoped>
h4 {
  font-weight: 400;
  font-size: 14px;
  color: rgb(24, 24, 24);
}
p {
  margin-top: 5px;
  font-size: 10px;
  width: 30px;
  height: 20px;
  overflow: hidden;
}
.delete {
  width: 35px;
  height: 35px;
  font-size: 20px;
  color: #fff;
  margin-top: 17px;
  margin-left: 9px;
  background-color: rgb(255, 42, 42);
  border-radius: 50%;
  text-align: center;
  line-height: 35px;
}
</style>
