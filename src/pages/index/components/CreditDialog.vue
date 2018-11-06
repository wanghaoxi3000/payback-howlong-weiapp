<template>
  <van-dialog id="van-dialog" use-slot :showCancelButton="true" :show="creditEditDialog" @close="closeEditDialog" @confirm="editBtn">
    <van-field :value="creditItem.Name" label="Name" placeholder="请输入Name" :border="true" @change="changeName"/>
    <van-field :value="creditItem.BillDay" label="账单日" placeholder="请输入账单日" :border="true" @change="changeBillDay"/>
    <van-field :value="creditItem.PayDay" label="还款日" placeholder="请输入还款日" :border="true" @change="changePayDay"/>
    <div class="billDay"><span>固定还款日: &nbsp;&nbsp;</span><van-switch :checked="creditItem.PayFix" size="20px" @change="onChange" /></div>
  </van-dialog>
</template>

<script>
export default {
  props: {
    creditEditDialog: {
      type: Boolean,
      defalte () {
        return false
      }
    },
    creditItem: {
      type: Object,
      default () {
        return {
          Name: '',
          BillDay: '',
          PayDay: '',
          PayFix: true
        }
      }
    }
  },
  data () {
    return {
      creditTarget: {}
    }
  },
  methods: {
    changeName (e) {
      this.creditItem.Name = e.mp.detail
    },
    changeBillDay (e) {
      this.creditItem.BillDay = e.mp.detail
    },
    changePayDay (e) {
      this.creditItem.PayDay = e.mp.detail
    },
    onChange (e) {
      this.creditItem.PayFix = e.mp.detail
    },
    editBtn () {
      console.log(this.creditItem)
    },
    closeEditDialog () {
      this.$emit('update:creditEditDialog', false)
    }
  }
}
</script>

<style>
</style>
