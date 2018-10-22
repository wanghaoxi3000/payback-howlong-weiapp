<template>
  <div class="page">
    <BaseBlock :title="'卡信息'">
      <CreditList :credits="creditList"></CreditList>
    </BaseBlock>
  </div>
</template>

<script>
import {creditList} from '@/api/credit.js'

import BaseBlock from '@/components/BaseBlock'
import CreditList from './components/CreditList'

export default {
  components: {
    BaseBlock,
    CreditList
  },
  data () {
    return {
      creditList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const {data} = await creditList()
      this.creditList = data
    }
  }
}
</script>

<style>

</style>
