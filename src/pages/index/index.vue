<template>
  <div class="page">
    <BaseBlock :title="'卡信息'">
      <div class="loading" v-if="loading">
        <van-loading/>
      </div>

      <CreditList v-else :credits="creditList"></CreditList>
    </BaseBlock>


    <!-- <div class="index-bottom-space">
      <van-button type="primary" size="small">test</van-button>
    </div> -->
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
      loading: true,
      creditList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true

      const {data} = await creditList()
      this.creditList = data

      this.loading = false
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
