<template>
  <div :class="{'base-content--padding' : padding}">
    <p v-if="title" class="base-content__header">{{ title }}</p>
    <van-button v-if="buttonTitle" size="small" round type="primary" custom-class="base-content-button">
      <van-icon v-if="buttonIcon" :name="buttonIcon" custom-class="base-content-button__icon"/>
      {{buttonTitle}}
    </van-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    buttonTitle: {
      type: String,
      defult: null
    },
    buttonIcon: {
      type: String,
      defult: null
    },
    padding: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      defult: false
    }
  },
  data () {
    return {
      creditEditDialog: false
    }
  },
  methods: {
    clickButton () {
      this.$emit('clickButton')
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
}

.base-content--padding .base-content__header {
  padding-left: 0;
}

.base-content-button {
  float: right;
  border: none !important;
  background: #409eff !important;
  margin: 8px 15px;
}

.base-content-button__icon {
  float: left !important;
  line-height: 28px !important;
}
</style>
