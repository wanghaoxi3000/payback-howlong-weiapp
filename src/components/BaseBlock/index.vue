<template>
  <div>
    <div :class="{'base-content--padding' : padding}">
      <p v-if="title" class="base-content__header">{{ title }}</p>
      <van-button size="small" custom-class="base-content-button" @click="addCredit"><van-icon name="records" custom-class="base-content-button__icon"/> 创建</van-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    padding: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      creditEditDialog: false
    }
  },
  methods: {
    addCredit () {
      this.$emit('openDialog', 1)
    }
  }
}
</script>

<style>
.base-content__header {
  margin: 0;
  color: rgba(69, 90, 100, 0.6);
  padding: 0px 15px;
  font-weight: 400;
  font-size: 14px;
  float: left;
  line-height: 50px;
}

.base-content--padding {
  padding: 0 15px;
  z-index: -1;
}

.base-content--padding .base-content__header {
  padding-left: 0;
}
.base-content-button {
  color: #409eff !important;
  float: right;
  margin: 8px 15px;
  border: none !important;
}
.base-content-button__icon {
  float:  left !important;
  line-height: 28px !important;
}
</style>
