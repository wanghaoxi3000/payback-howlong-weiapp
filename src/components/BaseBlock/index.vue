<template>
  <div :class="{'base-content--padding' : padding}">
    <p v-if="title" class="base-content__header">{{ title }}</p>
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
    padding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.base-content__header {
  margin: 0;
  color: rgba(69,90,100,.6);
  padding: 20px 15px 15px;
  font-weight: 400;
  font-size: 14px;
}

.base-content--padding {
  padding: 0 15px;
}

.base-content--padding .base-content__header {
  padding-left: 0;
}

</style>
