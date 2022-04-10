<template>
  <div class="home">
    <!-- 日历 -->
    <calendar class="top-wrap" />
    <!-- 补充圆角 -->
    <div class="radius">
      <div class="radius-content"></div>
    </div>
    <!-- 待做列表 -->
    <home-to-do v-if="notEmpty" class="to-do"></home-to-do>
    <!-- 空状态 -->
    <div class="empty" v-else>
      <img :src="$store.state.theme.emptyImg" alt="" />
      <p>暂无日程</p>
    </div>
    <div>{{ $store.getters.singleDate }}</div>
  </div>
</template>

<script>
import Calendar from "@/views/home/childComps/Calendar.vue";
import HomeToDo from "./childComps/HomeToDo.vue";

export default {
  name: "Home",
  components: {
    Calendar,
    HomeToDo,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    notEmpty() {
      return this.$store.state.currentDateTodo.length != 0;
    },
  },

  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
.top-wrap {
  background-color: var(--color-tint);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  padding: 35px 15px 0;
}
.radius {
  margin-top: 125px;
}
.radius {
  height: 60px;
  padding-top: 15px;
  background-color: var(--color-tint);
}
.radius-content {
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  overflow: hidden;
  height: 60px;
  background-color: var(--color-background);
}

.empty {
  margin: 40px auto;
  text-align: center;
}
.empty img {
  margin-bottom: 15px;
  width: 180px;
  height: 180px;
}
.to-do {
  margin-top: -25px;
}
</style>
