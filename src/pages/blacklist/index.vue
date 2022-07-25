<template>
  <div class="p-4">
    <nut-table :columns="columnData" :data="blackList" :striped="true">
      <template #nodata>
        <div class="no-data">当前账号无黑名单数据，或网络异常</div>
      </template>
    </nut-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import { getAllBlacklist } from '../../api/blacklist'

const columnData = ref([
  {
    title: '大区',
    key: 'environment',
  },
  {
    title: '账号',
    key: 'summonerName',
  },
  {
    title: '拉黑玩家',
    key: 'banName',
  }
])
const blackList = ref([])

useReady(async () => {
  blackList.value = await getAllBlacklist()
})
</script>
