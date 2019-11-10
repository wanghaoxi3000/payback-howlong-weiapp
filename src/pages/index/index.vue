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
    this.login()
  },

  onShow () {
    this.refreshData()
  },

  methods: {
    login () {
      const app = this
      wx.login({
        success (res) {
          if (res.code) {
            app.initData(res.code)
          } else {
            Notify('获取 user code 失败, 请重试')
          }
        }
      })
    },

    async initData (jsCode) {
      try {
        await this.$store.dispatch('Login', jsCode)
      } catch (err) {
        wx.reportMonitor('0', 1)
        Notify('登录失败, 请重试')
        this.loading = false
        return
      }
      await this.fetchData()
      this.loading = false
      this.refresh = true
    },

    async fetchData () {
      /** @description 获取信用卡信息 */
      try {
        const { result } = await wx.cloud.callFunction({name: 'creditList'})
        this.creditList = result.data
      } catch (err) {
        console.log(err)
        this.creditList = []
        wx.reportMonitor('0', 1)
        Notify('获取卡信息失败, 请重试')
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
