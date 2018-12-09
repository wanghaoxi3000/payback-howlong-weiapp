<template>
  <div>
    <van-popup :show="showPopup" position="bottom" custom-class="bottom" overlay-style="overlay" @close="closePopup">
      <p class="credit">账单日: {{creditItem.BillDay}} &nbsp;&nbsp; 还款日: {{creditItem.PayDay}} &nbsp;&nbsp; 固定还款日: {{creditItem.PayFix ? '是' : '否'}}</p>
      <van-button size="large" custom-class="handle-botton" @click="clickEdit"><van-icon name="edit-data" custom-class="edit-icon"/> 修改</van-button>
      <van-button size="large" type="danger" custom-class="handle-botton" @click="clickDelete"><van-icon name="delete" custom-class="edit-icon"/> 删除</van-button>
    </van-popup>

    <van-dialog id="van-dialog" :show="deleteDialog" :showCancelButton="true" title="删除" message="即将删除此条记录, 是否继续?" @confirm="deleteconfirm" @close="closeDialog"/>
  </div>
</template>

<script>
import { deleteCredit } from '@/api/credit.js'

import Notify from '@/../static/vant/notify/notify'

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
      deleteDialog: false
    }
  },
  methods: {
    clickEdit () {
      this.$emit('openDialog')
      this.closePopup()
    },
    clickDelete () {
      this.deleteDialog = true
      this.closePopup()
    },
    closeDialog () {
      this.deleteDialog = false
    },
    closePopup () {
      this.$emit('update:showPopup', false)
    },
    async deleteconfirm () {
      try {
        await deleteCredit(this.creditItem.Id)
        this.$emit('fetchData')
        Notify({
          text: '删除成功',
          backgroundColor: '#4b0'
        })
      } catch (err) {
        console.log(err)
        Notify('删除失败')
      }
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
.billDay {
  display: flex;
  font-size: 16px;
  padding: 10px 15px;
}
</style>
