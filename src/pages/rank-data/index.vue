<template>
  <view class="p-4">
    <view class="py-2 px-4 bg-white shadow-sm">
      <u-form :model="form" label-width="154">
        <u-form-item label="大区"
          ><view
            :class="
              serverName == '请选择大区' ? '!text-gray-500' : 'text-black'
            "
            @click="showPicker = true"
            >{{ serverName }}</view
          ></u-form-item
        >
        <u-form-item label="召唤师名" :border-bottom="false"
          ><u-input
            v-model="form.summonerName"
            placeholder="请输入召唤师id"
            max-length="16"
        /></u-form-item>
      </u-form>
    </view>
    <view class="mt-2"
      ><u-button type="primary" @click="handleSearch">查询</u-button></view
    >

    <view class="py-2 px-4 mt-2 bg-white shadow-sm" v-if="retData.status">
      <view class="w-full flex flex-col items-center">
        <view class="w-full text-base text-green-500 text-center my-2">
          查询成功
        </view>
        <u-avatar
          class="py-2"
          :src="retData.profileImg"
          size="large"
        ></u-avatar>
        <view class="flex w-full justify-between py-1">
          <view>大区</view>
          <view>{{ retData.environment }}</view>
        </view>
        <view class="flex w-full justify-between py-1">
          <view>召唤师</view>
          <view>{{ retData.summonerName }}</view>
        </view>
        <view class="flex w-full justify-between py-1">
          <view>单双排</view>
          <view>{{ retData.soloRank }}</view>
        </view>
        <view class="flex w-full justify-between py-1">
          <view>灵活组排</view>
          <view>{{ retData.flexRank }}</view>
        </view>
        <view class="flex w-full justify-between py-1">
          <view>当前赛季</view>
          <view>{{ retData.currentSeason }}</view>
        </view>
        <view class="flex w-full justify-between py-1">
          <view>大区排名</view>
          <view>{{ retData.allRank }}</view>
        </view>
      </view>
    </view>
    <u-select
      v-model="showPicker"
      mode="single-column"
      :list="environmentList"
      @confirm="confirmEnvironment"
    ></u-select>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getRankData } from '../../api/common'
import { environmentList } from '../../utils/options'

const showPicker = ref(false)
const form = reactive({
  summonerName: '',
  server: 0,
})
const serverName = ref('请选择大区')
const retData = ref<any>({
  status: false,
  summonerName: '',
  environment: '',
  soloRank: '',
  flexRank: '',
  currentSeason: '',
  allRank: '',
  profileImg: '',
})

async function handleSearch() {
  try {
    retData.value = await getRankData(form)
    retData.value.status = true
  } catch (err) {
    retData.value.status = false
  }
}

function confirmEnvironment(e: any) {
  form.server = e[0].value
  serverName.value = e[0].label
}
</script>

<style></style>
