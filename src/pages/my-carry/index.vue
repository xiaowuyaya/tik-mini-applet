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
        <view class="flex w-full py-3 justify-evenly items-center">
          <view class="px-2 text-base font-bold">1.</view>
          <u-avatar
            class="py-2"
            :src="retData.fisrtChamp.icon"
            size="large"
          ></u-avatar>
          <view class="px-2 w-[55%]">
            {{ retData.fisrtChamp.champProficiency }}
          </view>
        </view>
        <view class="flex w-full py-3 justify-evenly items-center">
          <view class="px-2 text-base font-bold">2.</view>
          <u-avatar
            class="py-2"
            :src="retData.secendChamp.icon"
            size="large"
          ></u-avatar>

          <view class="px-2 w-[55%]">
            {{ retData.secendChamp.champProficiency }}
          </view>
        </view>
        <view class="flex w-full py-3 justify-evenly items-center">
          <view class="px-2 text-base font-bold">3.</view>
          <u-avatar
            class="py-2"
            :src="retData.thirdChamp.icon"
            size="large"
          ></u-avatar>
          <view class="px-2 w-[55%]">
            {{ retData.thirdChamp.champProficiency }}
          </view>
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
import { getCarryChamp, getRankData } from '../../api/common'
import { environmentList } from '../../utils/options'

const showPicker = ref(false)
const form = reactive({
  summonerName: '',
  server: 0,
})
const serverName = ref('请选择大区')
const retData: any = ref({
  fisrtChamp: { icon: '', champProficiency: '' },
  secendChamp: { icon: '', champProficiency: '' },
  thirdChamp: { icon: '', champProficiency: '' },
})

async function handleSearch() {
  try {
    retData.value = await getCarryChamp(form)
    retData.value.status = true
  } catch (err) {
    console.log(err)
    retData.value.status = false
  }
}

function confirmEnvironment(e: any) {
  form.server = e[0].value
  serverName.value = e[0].label
}
</script>

<style></style>
