<template>
  <view class="p-4 w-full h-full">
    <!-- 无数据 -->
    <view
      v-if="!isShow"
      class="w-full h-[80%] flex flex-col justify-center items-center"
    >
      <img class="!border-none p-2 w-[480rpx]" :src="noFind" />
      <span class="font-black text-lg p-2">该模块已移植到桌面软件中</span>
      <span class="text-sm text-gray-600 p-2"
        >在常用功能中勾选 手动技能计时后重启应用，在游戏中按f1可调出窗口，快捷键可在设置中自定义</span
      >
    </view>
    <!-- 有数据 -->
    <view
      v-if="isShow"
      class="w-full flex flex-col justify-center items-center"
    >
      <view class="w-full flex items-center justify-between text-sm">
        <span>{{ wsData.gameInfo.gameMode }}</span>
        <span>{{ wsData.gameInfo.mapName }}</span>
        <span>{{ wsData.gameInfo.mapTerrain }}</span>
      </view>
      <view class="flex justify-evenly items-center p-2">
        <view class="text-sm text-gray-900">操作延迟时间：</view>
        <u-number-box v-model="dalyTime" :min="0" :max="30"></u-number-box>
      </view>
      <!-- 主要显示 -->
      <view class="mt-2">
        <view
          class="w-full flex items-center justify-between px-1 py-4"
          v-for="(item, index) in wsData.playerlist"
          :key="index"
        >
          <img class="w-[110rpx] h-[110rpx]" :src="item.championImg" />
          <view class="flex flex-col justify-center px-2">
            <span class="font-bold text-sm">{{ item.summonerName }}</span>
            <span class="text-sm text-gray-600 mt-1">{{
              item.championName
            }}</span>
          </view>
          <view class="flex items-center justify-center">
            <view
              class="flex flex-col items-center justify-center px-2"
              @click="
                handleSpellsMonitor(
                  item.summonerName,
                  item.championName,
                  item.summonerSpells.one.name,
                  item.summonerSpells.one.cooldownBurn
                )
              "
            >
              <img
                class="w-[90rpx] h-[90rpx]"
                :src="item.summonerSpells.one.img"
              />
              <span class="text-gray-800 text-xs">{{
                item.summonerSpells.one.name
              }}</span>
            </view>
            <view class="flex flex-col items-center justify-center px-2">
              <view
                class="flex flex-col items-center justify-center px-2"
                @click="
                  handleSpellsMonitor(
                    item.summonerName,
                    item.championName,
                    item.summonerSpells.two.name,
                    item.summonerSpells.two.cooldownBurn
                  )
                "
              >
                <img
                  :src="item.summonerSpells.two.img"
                  class="w-[90rpx] h-[90rpx]"
                />
                <span class="text-gray-800 text-xs">{{
                  item.summonerSpells.two.name
                }}</span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onReady, onHide } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import io from 'weapp.socket.io'
import noFind from '../../assets/imgs/404.png'
import { BASE_URI } from '../../utils/request'

const userStore = useUserStore()
let socket: any = null

const dalyTime = ref(0)
const isShow = ref(false)
const wsData: any = reactive({
  playerlist: [],
  gameInfo: {},
})

// onReady(async () => {
//   socket = io(`${BASE_URI}`)
//   // 监听socket连接
//   socket.on('connect', function () {
//     uni.showToast({
//       title: '链接服务器成功，正在获取数据',
//       icon: 'none',
//     })
//     socket.emit('joinRoom', { roomId: userStore.wxOpenId }) // 加入房间

//     // 获取数据
//     socket.emit('getPlayerlist', { roomId: userStore.wxOpenId })
//     socket.emit('getGameInfo', { roomId: userStore.wxOpenId })
//   })

//   socket.on('playerlist', (data: any) => {
//     if (data) {
//       wsData.playerlist = data
//       if (data.length != 0) {
//         isShow.value = true
//       }
//     }
//   })

//   socket.on('gameInfo', (data: any) => {
//     if (data) {
//       wsData.gameInfo = data
//       if (data.length != 0) {
//         isShow.value = true
//       }
//     }
//   })
// })

onHide(() => {
  if (socket) {
    uni.showToast({
      title: '服务器连接已断开',
      icon: 'none',
    })
    socket.disconnect()
  }
})

function handleSpellsMonitor(
  summonerName: string,
  championName: string,
  spellName: string,
  cooldownBurn: number
) {
  socket.emit('spells', {
    roomId: userStore.wxOpenId,
    data: {
      summonerName,
      championName,
      spellName,
      cooldownBurn: Number(cooldownBurn - dalyTime.value),
    },
  })
  uni.showToast({
    title: '发送成功',
    icon: 'none',
  })
}
</script>

<style></style>
