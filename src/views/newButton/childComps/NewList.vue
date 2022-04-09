<template>
  <div class="new-list">
    <!-- 设定时间 -->
    <div class="setting-time">
      <h3 class="title">设定时间</h3>
      <set-time />
    </div>
    <!-- 添加待办 -->
    <div class="add-content">
      <h3 class="title">添加待办</h3>
      <textarea
        v-model="content"
        placeholder="想做点什么？"
        class="textarea"
      ></textarea>
    </div>
    <!-- 选择颜色 -->
    <div class="color-select">
      <h3 class="title">选择分类</h3>
      <div class="color-radio">
        <i
          class="success"
          ref="success"
          :style="{ left: `${selectColor}px` }"
        ></i>
        <div
          v-for="(item, index) in colorClassify"
          :key="index"
          :style="{ background: item }"
          @click="successActive(item, index)"
        ></div>
      </div>
    </div>
    <!-- 保存 -->
    <div class="save" @click="addToList">添加</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { Dialog } from "vant";
import { Toast } from "vant";
import SetTime from "./SetTime.vue";

export default {
  name: "",
  components: { SetTime },

  data() {
    return {
      // 添加待办
      content: "",
      todoId: "123",
      // 颜色选择
      selectColor: 5,
      colorClassify: [
        "rgb(255, 50, 50)",
        "rgb(84, 84, 255)",
        "rgb(46, 192, 46)",
        "rgb(255, 180, 40)",
      ],
      colorActive: "rgb(255, 50, 50)",
      // 设定时间
      selectTime: "",
      formatDate: "",
    };
  },

  computed: {
    ...mapGetters(["todoListContent"]),
  },

  mounted() {
    // 点击弹出层时初始化弹窗
    this.$bus.$on("initPopup", (index) => {
      this.content = "";
      this.colorActive = "rgb(255, 50, 50)";
      this.selectColor = 5;
      this.todoId = Math.random();
    });
    // 编辑弹窗时将原来值渲染到页面
    this.$bus.$on("goEdit", (index) => {
      this.content = this.todoListContent[index].content;
      this.colorActive = this.todoListContent[index].color;
      this.todoId = this.todoListContent[index].id;
      this.selectColor = this.todoListContent[index].selectColor;
    });
    // 获取设定的时间
    this.$bus.$on("getSelectDate", (val) => {
      this.selectTime = val;
      const date = new Date(val);
      this.formatDate = date.toDateString();
    });
  },
  methods: {
    // 将待办内容传入store todolist
    addToList() {
      if (this.content == "") {
        Dialog({ message: "待办名称不能为空" });
      } else {
        // 获取要传入的信息
        const todo = {};
        todo.id = this.todoId;
        todo.content = this.content;
        todo.color = this.colorActive;
        todo.selectColor = this.selectColor;
        todo.done = false;
        todo.time = this.selectTime;
        todo.formatTime = this.formatDate;
        // 在actions判断是编辑还是新建,然后再保存进store
        this.$store.dispatch("addList", todo).then((res) => {
          Toast({
            message: res,
            duration: 800,
          });
        });
        // 关闭弹出层
        this.$bus.$emit("showPopup");
      }
    },
    // 选中颜色
    successActive(item, index) {
      this.selectColor = 5 + index * 30;
      this.colorActive = item;
    },
  },
};
</script>

<style scoped>
/* 新建文本框 */

.title {
  font-weight: normal;
  line-height: 50px;
  margin-top: 15px;
}

.textarea {
  width: 100%;
  height: 80px;
  background-color: var(--color-background);
  border-radius: 10px;
  border: 0;
  padding: 15px;
  line-height: 25px;
  resize: none;
  font-size: 18px;
}
.textarea::placeholder {
  font-size: 18px;
  color: rgb(210, 210, 210);
}
.radio input {
  margin: 5px;
  width: 20px;
  height: 20px;
  color: red;
  background-color: red;
}
.color-radio {
  display: flex;
}
.color-radio > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
  line-height: 25px;
  text-align: center;
}
.color-radio {
  position: relative;
}
.color-radio .success {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background: url("@/assets/img//home/success.svg") no-repeat;
  background-size: 20px 20px;
}

.save {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 95px;
  height: 45px;
  border-radius: 10px;
  background-color: var(--color-tint-orange);
  color: white;
  line-height: 45px;
  text-align: center;
}
</style>
