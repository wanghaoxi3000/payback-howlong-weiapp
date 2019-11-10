<template>
  <div class="page">
    <van-notify id="van-notify" />

    <BaseBlock :title="this.cardInfo._id ? '编辑卡信息' : '输入卡信息'"/>
      <van-cell-group>
        <van-field
          :value="cardInfo.name"
          label="名称"
          placeholder="请输入名称"
          @change="changeName"
        />
        <van-field
          v-model="cardInfo.billDay"
          type="number"
          label="账单日"
          placeholder="请输入账单日"
          @change="changeBillDay"
          :error-message="errorVal.billDay"
        />
        <van-field
          v-model="cardInfo.payDay"
          type="number"
          :label="cardInfo.payFix ? '还款日' : '还款间隔'"
          :placeholder="cardInfo.payFix ? '账单日的下月几日为还款日' : '账单日的几天后为还款日'"
          @change="changePayDay"
          :error-message="errorVal.payDay"
        />
        <van-switch-cell
          title="固定下月还款日"
          :checked="cardInfo.payFix"
          @change="changePayFix"
        />
      </van-cell-group>

      <van-cell-group>
        <van-cell title=" " :border="false" @click.stop>
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
              custom-class="cardform-button"
              :disabled="forbidSubmit"
              @click="submit"
            >
              确定
            </van-button>
          </view>
        </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
import {addCredit, editCredit} from '@/api/credit'
import Notify from '@/../static/vant/notify/notify'
import BaseBlock from '@/components/BaseBlock'

export default {
  components: {
    BaseBlock
  },
  data () {
    return {
      checkItems: ['name', 'billDay', 'payDay'],
      cardInfo: {
        name: '',
        billDay: '',
        payDay: '',
        payFix: true
      },
      errorVal: {
        billDay: '',
        payDay: ''
      }
    }
  },

  onLoad () {
    this.checkData()
  },

  computed: {
    forbidSubmit () {
      // 检查无错误项
      if (this.errorVal.billDay || this.errorVal.payDay) {
        return true
      }

      // 检查无未填项
      for (const v of this.checkItems) {
        if (!this.cardInfo[v]) {
          return true
        }
      }

      return false
    }
  },

  methods: {
    checkData () {
      /** @description 检查是否为修改数据 */
      if (this.$root.$mp.query.data) {
        this.cardInfo = JSON.parse(this.$root.$mp.query.data)
      }
    },

    changeName ({ mp }) {
      /** @description 监听Name值 */
      this.cardInfo.name = mp.detail
    },

    changeBillDay ({ mp }) {
      /** @description 监听BillDay值 */
      this.cardInfo.billDay = parseInt(mp.detail)

      if (this.cardInfo.billDay > 29) {
        this.errorVal.billDay = '不能大于29 (29代表每月最后一天)'
      } else {
        this.errorVal.billDay = ''
      }
    },

    changePayDay ({ mp }) {
      /** @description 监听PayDay值 */
      this.cardInfo.payDay = parseInt(mp.detail)

      if (this.cardInfo.payDay > 28) {
        this.errorVal.payDay = '不能大于28'
      } else {
        this.errorVal.payDay = ''
      }
    },

    changePayFix ({ mp }) {
      /** @description 监听PayFix值 */
      this.cardInfo.payFix = mp.detail
    },

    async submit () {
      /** @description 提交数据 */
      if (!this.forbidSubmit) { // van-button disable 后仍会触发 click 事件
        try {
          if (this.cardInfo._id) {
            await editCredit(this.cardInfo)
            wx.navigateBack({
              delta: 1,
              complete () {
                Notify({
                  text: '修改成功',
                  backgroundColor: '#4b0'
                })
              }
            })
          } else {
            await addCredit(this.cardInfo)
            wx.navigateBack({
              delta: 1,
              complete () {
                Notify({
                  text: '创建成功',
                  backgroundColor: '#4b0'
                })
              }
            })
          }
        } catch (err) {
          Notify(err.message)
        }
      }
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
