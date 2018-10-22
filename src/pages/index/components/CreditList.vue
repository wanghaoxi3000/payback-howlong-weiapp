<template>
  <div>
    <van-cell-group v-for="(item, index) in credits" :key="index">
      <van-cell :title="item.Name" @click="clickCell(index)">
        <view slot="right-icon">
          <van-tag size="medium" round>{{item.DateDetail.IntervalPay}} 天</van-tag>
        </view>
      </van-cell>
      <van-transition :show="item.showDetail" name="fade-right" >
        <van-cell title="test" :border="false"></van-cell>
      </van-transition>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    credits: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      showDetail: {}
    }
  },
  methods: {
    clickCell (index) {
      if (this.credits[index].showDetail) {
        this.credits[index].showDetail = false
      } else {
        this.$set(this.credits[index], 'showDetail', true)
      }
    }
  }
}
</script>

<style>

</style>
