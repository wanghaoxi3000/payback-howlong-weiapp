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
import {creditList} from '@/api/credit'
import Notify from '@/../static/vant/notify/notify'
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
      await this.fetchData()
      this.refresh = true
    },

    async fetchData () {
      /** @description 获取信用卡信息 */
      this.loading = true
      try {
        const { result } = await creditList()
        this.creditList = result.data
      } catch (err) {
        wx.reportMonitor('0', 1)
        console.log(err)
        this.creditList = []
        wx.reportMonitor('0', 1)
        Notify('获取卡信息失败, 请重试')
      } finally {
        this.loading = false
      }
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
