<template>
  <div class="page">
    <BaseBlock :title="'卡信息'" @openDialog="openDialog" :creditItem="creditItem"></BaseBlock>
    <div>
       <div class="loading" v-if="loading">
        <van-loading/>
      </div>
      <CreditList v-else :credits="creditList" @openPopup="openPopup"></CreditList>
    </div>

    <CreditPopup :showPopup.sync="showPopup" :creditItem="creditItem" @openDialog="openDialog"/>

    <CreditDialog :creditEditDialog.sync="creditEditDialog" :creditItem="creditItem"/>
  </div>
</template>

<script>
import { creditList } from '@/api/credit.js'

import BaseBlock from '@/components/BaseBlock'
import CreditList from './components/CreditList'
import CreditPopup from './components/CreditPopup'
import CreditDialog from './components/CreditDialog'

export default {
  components: {
    BaseBlock,
    CreditList,
    CreditPopup,
    CreditDialog
  },
  data () {
    return {
      loading: true,
      creditList: [],
      showPopup: false,
      creditItem: {
        Name: '',
        BillDay: '',
        PayDay: '',
        PayFix: true
      },
      showDialog: false,
      creditEditDialog: false
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
      this.creditItem = val
      this.showPopup = true
    },
    openDialog (val) {
      this.creditEditDialog = true
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
  /* align-items: flex-end; */
}
</style>
