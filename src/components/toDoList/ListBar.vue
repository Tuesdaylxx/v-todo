<template>
  <div class="list-bar">
    <van-swipe-cell>
      <div class="list-bar-item">
        <slot name="icon"></slot>
        <div class="item-content">
          <slot name="content"></slot>
        </div>
      </div>
      <template #right>
        <slot name="delete"></slot>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "ListBar",
  components: {},
};
</script>

<style scoped>
.list-bar-item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 12px;
  height: 70px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 5px 2px rgb(100 100 100 / 9%);
}

.list-bar-item >>> .van-swipe-cell {
  width: 100%;
}
.item-content {
  flex: 1;
}

.list-bar-item >>> .van-icon {
  font-weight: 700;
  font-size: 20px;
  margin: 0 15px 0 5px;
}
</style>
