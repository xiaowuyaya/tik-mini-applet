<template>
  <view class="pt-4">
    <u-table>
      <u-tr>
        <u-th>大区</u-th>
        <u-th>账号</u-th>
        <u-th>拉黑玩家</u-th>
        <!-- <u-th>原因</u-th> -->
      </u-tr>
      <u-tr v-for="(item, index) in blackList" :key="index">
        <u-td>{{item.environment}}</u-td>
        <u-td>{{item.summonerName}}</u-td>
        <u-td>{{item.banName}}</u-td>
        <!-- <u-td>{{item.reason}}</u-td> -->
      </u-tr>
    </u-table>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app'
import { getAllBlacklist } from '../../api/user';

const blackList = ref<any>([])

onReady(async () => {
  blackList.value = await getAllBlacklist()
})
</script>

<style></style>
