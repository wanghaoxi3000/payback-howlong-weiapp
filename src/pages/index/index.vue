<template>
  <div class="page">
    <van-notify id="van-notify" />
    <BaseBlock title="卡信息" buttonTitle="创建" buttonIcon="add-o" @clickButton="clickCreate" />

    <div class="loading" v-if="loading">
      <van-loading/>
    </div>

    <CreditList v-else :credits="creditList" @openPopup="openPopup"></CreditList>

    <CreditPopup :showPopup.sync="showPopup" :creditItem="creditItem" @editItem="clickEdit" @fetchData="fetchData"/>
  </div>
</template>

<script>
import { creditList } from '@/api/credit.js'
import BaseBlock from '@/components/BaseBlock'
import CreditList from './components/CreditList'
import CreditPopup from './components/CreditPopup'

export default {
  components: {
    BaseBlock,
    CreditList,
    CreditPopup
  },
  data () {
    return {
      loading: true,
      refresh: false,
      showPopup: false,
      creditList: [],
      creditItem: {
        Name: '',
        BillDay: '',
        PayDay: '',
        PayFix: true
      }
    }
  },

  created () {
    this.initData()
  },

  onShow () {
    this.refreshData()
  },

  methods: {
    async initData () {
      await this.$store.dispatch('Login', '1')
      await this.fetchData()
      this.loading = false
      this.refresh = true
    },

    async fetchData () {
      const { data } = await creditList()
      this.creditList = data
    },

    refreshData () {
      /** @description 从其他页面跳回时重载数据 */
      if (this.refresh) {
        this.fetchData()
      }
    },

    openPopup (val) {
      /** @description 获取目标credit */
      this.creditItem = this.creditList[val]
      this.showPopup = true
    },

    clickCreate () {
      /** @description 点击创建按钮跳转页面 */
      wx.navigateTo({
        url: '/pages/cardform/index'
      })
    },

    clickEdit () {
      /** @description 点击修改按钮跳转页面 */
      let creditItem = Object.assign({}, this.creditItem)
      delete creditItem.DateDetail
      wx.navigateTo({
        url: `/pages/cardform/index?data=${JSON.stringify(creditItem)}`
      })
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
