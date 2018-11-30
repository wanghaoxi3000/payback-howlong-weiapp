<template>
  <div class="page">
    <van-notify id="van-notify" />
    <BaseBlock title="卡信息" buttonTitle="创建" buttonIcon="add-o" :loading="loading" @clickButton="openDialog" />

    <div class="loading" v-if="loading">
      <van-loading/>
    </div>

    <CreditList :credits="creditList" @openPopup="openPopup"></CreditList>

    <CreditPopup :showPopup.sync="showPopup" :creditItem="creditItem" @openDialog="openDialog" @fetchData="fetchData"/>

    <van-dialog id="van-dialog"
      :show="EditDialog"
      use-slot
      :showCancelButton="true"
      @confirm="confirmDialog"
      @close="closeDialog">
      <van-field :value="creditItem.Name" label="名称" placeholder="请输入名称" :border="true" @change="changeName"/>
      <van-field :value="creditItem.BillDay" type="number" label="账单日" placeholder="请输入账单日" :error-message="errorVal.BillDay" :border="true" @change="changeBillDay"/>
      <van-field :value="creditItem.PayDay" type="number" label="还款日" placeholder="请输入还款日" :error-message="errorVal.PayDay" :border="true" @change="changePayDay"/>
      <div class="billDay"><span>固定还款日: &nbsp;&nbsp;</span><van-switch :checked="creditItem.PayFix" size="20px" @change="changePayFix"/></div>
    </van-dialog>
  </div>
</template>

<script>
import { creditList, addCredit } from '@/api/credit.js'
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
      creditList: [],
      creditItem: {
        Name: '',
        BillDay: '',
        PayDay: '',
        PayFix: true
      },
      showPopup: false,
      EditDialog: false,
      errorVal: {
        BillDay: '',
        PayDay: ''
      }
    }
  },

  created () {
    this.initData()
  },

  methods: {
    async initData () {
      await this.$store.dispatch('Login', '1')
      await this.fetchData()
    },

    async fetchData () {
      this.loading = true
      const { data } = await creditList()
      this.creditList = data
      this.loading = false
    },

    openPopup (val) {
      /** @description 获取目标credit */
      this.creditItem = this.creditList[val]
      this.showPopup = true
    },

    openDialog (val) {
      /** @description 点击创建按钮 弹出Dialog */
      this.EditDialog = true
      for (const v in this.creditItem) {
        if (typeof this.creditItem[v] === 'boolean') {
          this.creditItem[v] = false
          continue
        }
        this.creditItem[v] = ''
      }
    },

    closeDialog () {
      /** @description 取消Dialog */
      this.EditDialog = false
    },

    changeName ({ mp }) {
      /** @description 监听Name值 */
      this.creditItem.Name = mp.detail
    },

    changeBillDay ({ mp }) {
      /** @description 监听BillDay值 */

      this.creditItem.BillDay = parseInt(mp.detail)
      if (this.creditItem.BillDay > 29) {
        this.errorVal.BillDay = '不能大于29'
      }
      if (this.creditItem.BillDay < 29) {
        this.errorVal.BillDay = ''
      }
    },

    changePayDay ({ mp }) {
      /** @description 监听PayDay值 */
      this.creditItem.PayDay = parseInt(mp.detail)
      if (this.creditItem.PayDay > 28) {
        this.errorVal.PayDay = '不能大于28'
      }
      if (this.creditItem.PayDay < 28) {
        this.errorVal.PayDay = ''
      }
    },

    changePayFix ({ mp }) {
      /** @description 监听PayFix值 */
      this.creditItem.PayFix = mp.detail
    },

    async confirmDialog () {
      /** @description 点击Dialog确认按钮 */
      try {
        const { data } = await addCredit(this.creditItem)
        console.log(data)
        this.fetchData()
      } catch (err) {
        for (const val in err.response.data) {
          this.errorVal[val] = err.response.data[val]
        }
      }
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
