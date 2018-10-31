<template>
  <van-popup :show="show" position="bottom" custom-class="bottom" overlay-style="overlay" @close="closePopup">
    <p class="credit">账单: {{creditItem.BillDay}} &nbsp;&nbsp; 还款日: {{creditItem.PayDay}} &nbsp;&nbsp; 固定还款日: {{creditItem.PayFix ? '是' : '否'}}</p>
    <van-button size="large" custom-class="handle-botton"><van-icon name="edit-data" custom-class="edit-icon"/> 修改</van-button>
    <van-button size="large" type="danger" custom-class="handle-botton"><van-icon name="delete" custom-class="edit-icon"/> 删除</van-button>
  </van-popup>
</template>

<script>
export default {
  props: {
    creditItem: {
      type: Array,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style>
.bottom {
  width: 100%;
  background-color: #fff;
}
.credit {
  line-height: 40px;
  padding: 0 20px;
}
.handle-botton {
  padding-right:55px !important;
}
.edit-icon {
  float: left !important;
  line-height: 60px !important;
  padding: 0px 0 0 30px !important;
}
</style>
