<template>
  <div class="page">
    <van-notify id="van-notify" />

    <BaseBlock :title="this.cardInfo.Id ? '编辑卡信息' : '输入卡信息'"/>
      <van-cell-group>
        <van-field
          :value="cardInfo.Name"
          label="名称"
          placeholder="请输入名称"
          @change="changeName"
        />
        <van-field
          v-model="cardInfo.BillDay"
          type="number"
          label="账单日"
          placeholder="请输入账单日"
          @change="changeBillDay"
          :error-message="errorVal.BillDay"
        />
        <van-field
          v-model="cardInfo.PayDay"
          type="number"
          :label="cardInfo.PayFix ? '还款日' : '还款间隔'"
          :placeholder="cardInfo.PayFix ? '账单日的下月几日为还款日' : '账单日的几天后为还款日'"
          @change="changePayDay"
          :error-message="errorVal.PayDay"
        />
        <van-switch-cell
          title="固定下月还款日"
          :checked="cardInfo.PayFix"
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

  onLoad () {
    this.checkData()
  },

  computed: {
    forbidSubmit () {
      // 检查无错误项
      if (this.errorVal.BillDay || this.errorVal.PayDay) {
        return true
      }

      // 检查无未填项
      for (const v in this.cardInfo) {
        if (v !== 'PayFix' && !this.cardInfo[v]) {
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
      this.cardInfo.Name = mp.detail
    },

    changeBillDay ({ mp }) {
      /** @description 监听BillDay值 */
      this.cardInfo.BillDay = parseInt(mp.detail)

      if (this.cardInfo.BillDay > 29) {
        this.errorVal.BillDay = '不能大于29 (29代表每月最后一天)'
      } else {
        this.errorVal.BillDay = ''
      }
    },

    changePayDay ({ mp }) {
      /** @description 监听PayDay值 */
      this.cardInfo.PayDay = parseInt(mp.detail)

      if (this.cardInfo.PayDay > 28) {
        this.errorVal.PayDay = '不能大于28'
      } else {
        this.errorVal.PayDay = ''
      }
    },

    changePayFix ({ mp }) {
      /** @description 监听PayFix值 */
      this.cardInfo.PayFix = mp.detail
    },

    async submit () {
      /** @description 提交数据 */
      if (!this.forbidSubmit) { // van-button disable 后仍会触发 click 事件
        try {
          if (this.cardInfo.Id) {
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
          Notify(err.response.data.error)
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
