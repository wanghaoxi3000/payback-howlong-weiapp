<template>
  <div class="page">
    <BaseBlock title="输入卡信息"/>
      <van-cell-group>
        <van-field
          :value="cardInfo.Name"
          label="名称"
          placeholder="请输入名称"
        />
        <van-field
          :value="cardInfo.BillDay"
          type="number"
          label="账单日"
          placeholder="请输入账单日"
        />
        <van-field
          :value="cardInfo.PayDay"
          type="number"
          label="还款日"
          placeholder="请输入还款日"
        />
        <van-switch-cell
          title="固定还款日"
          :checked="cardInfo.PayFix"
          @change="changePayFix"
        />
      </van-cell-group>

      <van-cell-group>
        <van-cell title=" " :border="false">
          <view slot="right-icon">
            <van-button
              type="default"
              size="small"
              custom-class="cardform-button"
              @click="cancel"
            >
              取消
            </van-button>
            <van-button
              type="primary"
              size="small"
              custom-class="cardform-button">
              确定
            </van-button>
          </view>
        </van-cell>
      </van-cell-group>
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
      cardInfo: {
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
  // onLoad () {
  //   this.onLoad()
  // },
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

    onChange ({mp}) {
      console.log(this.checked)
      this.checked = mp.detail
      console.log(this.checked)
    },

    changePayFix ({ mp }) {
      /** @description 监听PayFix值 */
      this.cardInfo.PayFix = mp.detail
    },

    cancel () {
      /** @description 取消并返回上一级 */
      wx.navigateBack({delta: 1})
    }
  }
}
</script>

<style>
.cardform-button {
  margin-right: 10px;
}
</style>
