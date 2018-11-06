<template>
  <div>
    <van-popup :show="showPopup" position="bottom" custom-class="bottom" overlay-style="overlay" @close="closePopup">
      <p class="credit">账单日: {{creditItem.BillDay}} &nbsp;&nbsp; 还款日: {{creditItem.PayDay}} &nbsp;&nbsp; 固定还款日: {{creditItem.PayFix ? '是' : '否'}}</p>
      <van-button size="large" custom-class="handle-botton" @click="clickEdit"><van-icon name="edit-data" custom-class="edit-icon"/> 修改</van-button>
      <van-button size="large" type="danger" custom-class="handle-botton" @click="clickDelete"><van-icon name="delete" custom-class="edit-icon"/> 删除</van-button>
    </van-popup>
    <van-dialog id="van-dialog" :showCancelButton="true" :show="creditDeleteDialog" title="删除" message="此操作将永久删除该文件, 是否继续?" @close="closeDialog"/>
  </div>
</template>

<script>
export default {
  props: {
    creditItem: {
      type: Object,
      default: {}
    },
    showPopup: {
      type: Boolean,
      default: false
    },
    creditEditDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      creditDeleteDialog: false
    }
  },
  methods: {
    clickEdit () {
      this.$emit('openDialog', 0)
      this.closePopup()
    },
    clickDelete () {
      this.creditDeleteDialog = true
      this.closePopup()
    },
    closeDialog () {
      this.creditDeleteDialog = false
    },
    closePopup () {
      this.$emit('update:showPopup', false)
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
  padding-right: 55px !important;
}
.edit-icon {
  float: left !important;
  line-height: 60px !important;
  padding: 0px 0 0 30px !important;
}
.billDay{
  display: flex;
  font-size: 16px;
  padding:10px 15px;

}
</style>
