<template>
  <div class="p-4">
    <nut-picker
      v-model:visible="showPicker"
      :columns="environmentList"
      @confirm="changeServer"
    >
    </nut-picker>
    <nut-form>
      <nut-form-item label="大区" label-width="68">
        <span @click="showPicker = !showPicker">{{ serverName }}</span>
      </nut-form-item>
      <nut-form-item label="游戏名" label-width="68">
        <input
          v-model="form.summonerName"
          placeholder="请输入游戏id"
          type="text"
          max-length="12"
        />
      </nut-form-item>
    </nut-form>
    <div class="mt-2 ">
      <nut-button block type="primary" @click="handleSearch">查询</nut-button>
    </div>

    <nut-cell v-if="retData.status">
      <div class=" w-full flex flex-col items-center">
        <div class="w-full text-base text-green-500 text-center my-2">
          查询成功
        </div>
        <div class="flex w-full py-3 justify-evenly items-center">
          <div class="px-2 text-base font-bold ">1.</div>
          <nut-avatar
            class="py-2 "
            size="54"
            :icon="retData.fisrtChamp.icon"
          ></nut-avatar>
          <div class="px-2 w-[55%]">
            {{ retData.fisrtChamp.champProficiency }}
          </div>
        </div>
        <div class="flex w-full py-3 justify-evenly items-center">
          <div class="px-2 text-base font-bold ">2.</div>
          <nut-avatar
            class="py-2"
            size="54"
            :icon="retData.secendChamp.icon"
          ></nut-avatar>
          <div class=" px-2 w-[55%]">
            {{ retData.secendChamp.champProficiency }}
          </div>
        </div>
        <div class="flex w-full py-3 justify-evenly items-center">
          <div class="px-2 text-base font-bold ">3.</div>
          <nut-avatar
            class="py-2"
            size="54"
            :icon="retData.thirdChamp.icon"
          ></nut-avatar>
          <div class="px-2 w-[55%]">
            {{ retData.thirdChamp.champProficiency }}
          </div>
        </div>
      </div>
    </nut-cell>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import { getCarryChamp } from '../../api/common'

const showPicker = ref(false)
const form = reactive({
  summonerName: '123',
  server: '',
})
const serverName = ref('请选择大区')
const environmentList = ref([
  { text: '艾欧尼亚', value: 1 },
  { text: '比尔吉沃特', value: 2 },
  { text: '祖安', value: 3 },
  { text: '诺克萨斯', value: 4 },
  { text: '班德尔城', value: 5 },
  { text: '德玛西亚', value: 6 },
  { text: '皮尔特沃夫', value: 7 },
  { text: '战争学院', value: 8 },
  { text: '弗雷尔卓德', value: 9 },
  { text: '巨神峰', value: 10 },
  { text: '雷瑟守备', value: 11 },
  { text: '无畏先锋', value: 12 },
  { text: '裁决之地', value: 13 },
  { text: '黑色玫瑰', value: 14 },
  { text: '暗影岛', value: 15 },
  { text: '恕瑞玛', value: 16 },
  { text: '钢铁烈阳', value: 17 },
  { text: '水晶之痕', value: 18 },
  { text: '均衡教派', value: 19 },
  { text: '扭曲丛林', value: 20 },
  { text: '教育网专区', value: 21 },
  { text: '影流', value: 22 },
  { text: '守望之海', value: 23 },
  { text: '征服之海', value: 24 },
  { text: '卡拉曼达', value: 25 },
  { text: '巨龙之巢', value: 26 },
  { text: '皮城警备', value: 27 },
  { text: '男爵领域', value: 30 },
  { text: '峡谷之巅', value: 31 },
])
const retData = ref({
  fisrtChamp: { icon: '', champProficiency: '' },
  secendChamp: { icon: '', champProficiency: '' },
  thirdChamp: { icon: '', champProficiency: '' },
})

async function handleSearch() {
  try {
    retData.value = await getCarryChamp(form)
    retData.value.status = true
  } catch (err) {
    console.log(err);
    retData.value.status = false
  }
}

function changeServer(e) {
  form.server = e.selectedOptions[0].value
  serverName.value = e.selectedOptions[0].text
}
</script>
