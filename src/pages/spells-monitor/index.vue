<template>
  <div class="p-4 w-full h-full">
    <!-- 无数据 -->
    <div
      v-if="!isShow"
      class="w-full h-[80%] flex flex-col justify-center items-center"
    >
      <img
        class="!border-none p-2"
        :src="defaultAvatar"
        height="200px"
        width="200px"
      />
      <span class="font-black text-lg p-2">未获取到当前账号的对局数据</span>
      <span class="text-sm text-gray-600 p-2"
        >对局是否已经开始，或者尝试重新重新进入此页面</span
      >
    </div>
    <!-- 有数据 -->
    <div v-if="isShow" class="w-full flex flex-col justify-center items-center">
      <div class="w-full flex items-center justify-between text-sm">
        <span>{{ wsData.gameInfo.gameMode }}</span>
        <span>{{ wsData.gameInfo.mapName }}</span>
        <span>{{ wsData.gameInfo.mapTerrain }}</span>
      </div>
      <div class="flex justify-evenly items-center p-2">
        <div class="text-sm text-gray-900">操作延迟时间：</div>
        <nut-inputnumber class="ml-2" v-model="dalyTime" step="2" />
      </div>
      <!-- 主要显示 -->
      <div class="mt-2">
        <div
          class="w-full flex items-center justify-between px-1 py-4"
          v-for="(item, index) in wsData.playerlist"
          :key="index"
        >
          <img :src="item.championImg" width="60px" height="60px" />
          <div class="flex flex-col justify-center px-2">
            <span class="font-bold text-sm">{{ item.summonerName }}</span>
            <span class="text-sm text-gray-600 mt-1">{{
              item.championName
            }}</span>
          </div>
          <div class="flex">
            <div
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
                :src="item.summonerSpells.one.img"
                width="48px"
                height="48px"
              />
              <span class="text-gray-800 text-xs">{{
                item.summonerSpells.one.name
              }}</span>
            </div>
            <div class="flex flex-col items-center justify-center px-2">
              <div
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
                  width="48px"
                  height="48px"
                />
                <span class="text-gray-800 text-xs">{{
                  item.summonerSpells.two.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Taro, { useReady, useDidHide } from '@tarojs/taro'
import { useUserStore } from '../../store'
import io from 'weapp.socket.io'
import defaultAvatar from '../../assets/imgs/404.png'

const userStore = useUserStore()
let socket = null

const dalyTime = ref(0)
const isShow = ref(false)
const wsData = reactive({
  playerlist: [],
  gameInfo: {},
})

useReady(() => {
  socket = io('http://localhost:3001/')
  // 监听socket连接
  socket.on('connect', function() {
    console.log('房间socket连接成功')
    socket.emit('joinRoom', { roomId: userStore.wxOpenId }) // 加入房间

    // 获取数据
    socket.emit('getPlayerlist', { roomId: userStore.wxOpenId })
    socket.emit('getGameInfo', { roomId: userStore.wxOpenId })
  })

  socket.on('playerlist', (data) => {
    if (data) {
      wsData.playerlist = data
      isShow.value = true
    }
  })

  socket.on('gameInfo', (data) => {
    if (data) {
      wsData.gameInfo = data
      isShow.value = true
    }
  })
})

useDidHide(() => {
  if (socket) {
    socket.disconnect()
  }
})

function handleSpellsMonitor(
  summonerName,
  championName,
  spellName,
  cooldownBurn
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
  Taro.showToast({
    title: `发送成功`,
    duration: 1500,
    icon: 'none',
    mask: false,
  })
}
</script>
