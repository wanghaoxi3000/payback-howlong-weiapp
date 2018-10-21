<template>
  <div class="page">
    <BaseBlock :title="'卡信息'">
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格2" value="内容2" label="描述信息" :border="false" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="单元格2" value="内容2" label="描述信息" :border="false" />
      </van-cell-group>
    </BaseBlock>
  </div>
</template>

<script>
import BaseBlock from '@/components/BaseBlock'

export default {
  components: {
    BaseBlock
  }
}
</script>

<style>

</style>
