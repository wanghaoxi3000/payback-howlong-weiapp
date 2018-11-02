<template>
  <div class="page">
    <BaseBlock :title="'卡信息'" >
      <div class="loading" v-if="loading">
        <van-loading/>
      </div>

      <CreditList v-else :credits="creditList" @openPopup="openPopup"></CreditList>
    </BaseBlock>

    <CreditPopup :creditItem="creditItem" :showPopup.sync="showPopup"/>

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
      creditList: [],
      showPopup: false,
      creditItem: '',
      showDialog: false
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
