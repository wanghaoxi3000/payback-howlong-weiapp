<template>
  <div class="page">
    <BaseBlock title="卡信息" buttonTitle="创建" buttonIcon="add-o" @clickButton="openDialog" />

    <div class="loading" v-if="loading">
      <van-loading/>
    </div>

    <CreditList :credits="creditList" @openPopup="openPopup"></CreditList>

    <CreditPopup :showPopup.sync="showPopup" :creditItem="creditItem" @openDialog="openDialog"/>

    <van-dialog id="van-dialog"
      :show="EditDialog"
      use-slot
      :showCancelButton="true"
      @confirm="confirmDialog"
      @close="closeDialog">
      <van-field :value="creditItem.Name" label="Name" placeholder="请输入Name" :border="true"/>
      <van-field :value="creditItem.BillDay" label="账单日" placeholder="请输入账单日" :border="true"/>
      <van-field :value="creditItem.PayDay" label="还款日" placeholder="请输入还款日" :border="true"/>
      <div class="billDay"><span>固定还款日: &nbsp;&nbsp;</span><van-switch :checked="creditItem.PayFix" size="20px" /></div>
    </van-dialog>
  </div>
</template>

<script>
import { creditList } from '@/api/credit.js'

import BaseBlock from '@/components/BaseBlock'
import CreditList from './components/CreditList'
import CreditPopup from './components/CreditPopup'
// import CreditDialog from './components/CreditDialog'

export default {
  components: {
    BaseBlock,
    CreditList,
    CreditPopup
  },
  data () {
    return {
      loading: true,
      creditList: [],
      creditItem: {},
      showPopup: false,
      EditDialog: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true

      const { data } = await creditList()
      this.creditList = data
      this.loading = false
    },
    openPopup (val) {
      this.creditItem = this.creditList[val]
      this.showPopup = true
    },
    openDialog (val) {
      this.EditDialog = true
    },
    closeDialog () {
      this.EditDialog = false
      this.creditItem = {}
    },
    confirmDialog () {
      console.log(this.creditItem)
    }
  }
}
</script>

<style>
.loading {
  text-align: center;
}

.index-bottom-space {
  align-self: flex-end;
}
</style>
