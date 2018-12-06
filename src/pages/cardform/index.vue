<template>
  <div class="page">
    <BaseBlock title="输入卡信息">
      <van-cell-group>
        <van-field
          :value="creditItem.Name"
          label="名称"
          placeholder="请输入名称"
        />
        <van-field
          :value="creditItem.BillDay"
          type="number"
          label="账单日"
          placeholder="请输入账单日"
        />
      </van-cell-group>
    </BaseBlock>
  </div>

    <!-- <van-field
      :value="creditItem.Name"
      label="名称"
      placeholder="请输入名称"
      :border="true"
      @change="changeName"
    />
    <van-field
      :value="creditItem.BillDay"
      type="number"
      label="账单日"
      placeholder="请输入账单日"
      :error-message="errorVal.BillDay"
      :border="true"
      @change="changeBillDay"
    />
    <van-field
      :value="creditItem.PayDay"
      type="number"
      label="还款日"
      placeholder="请输入还款日"
      :error-message="errorVal.PayDay"
      :border="true"
      @change="changePayDay"
    />
    <div class="billDay">
      <span>固定还款日: &nbsp;&nbsp;</span>
      <van-switch :checked="creditItem.PayFix" size="20px" @change="changePayFix"/>
    </div>-->
</template>

<script>
import BaseBlock from '@/components/BaseBlock'

export default {
  components: {
    BaseBlock
  },
  data () {
    return {
      creditItem: {
        Name: '',
        BillDay: '',
        PayDay: '',
        PayFix: true
      },
      errorVal: {
        BillDay: '',
        PayDay: ''
      }
    }
  },
  // onLaunch: function (options) {
  //   console.log(options, 456)
  //   // 这里接收不到传输的extraData对象，url参数可获取到
  //   // 需用小程序原生App({})
  // },
  // onShow: function (options) {
  //   // 这里接收不到传输的extraData对象，url参数可获取到
  //   // 需用小程序原生App({})
  //   console.log(options, 789)
  // },

  onLoad () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      console.log(this.$root.$mp.query)
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
    }
  }
}
</script>

<style>
</style>
