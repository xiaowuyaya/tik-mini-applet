<template>
  <div class="p-4">
    <!-- header box -->
    <div class="bg-custom-primary text-white px-4 py-6 rounded">
      <div class="flex items-center justify-start">
        <nut-avatar size="68" :icon="userStore.avatarUrl"></nut-avatar>
        <div class="flex flex-col ml-5" @click="toLogin">
          <div class="font-bold text-lg">{{ userStore.nickName }}</div>
          <div class="text-sm mt-1 text-gray-300">{{ userStore.username }}</div>
        </div>
      </div>
    </div>
    <nut-cell>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <span>订阅状态：</span>
          <span v-if="!userStore.wxOpenId" class="text-red-500">未订阅</span>
          <span v-if="userStore.wxOpenId" class="text-green-500">已订阅</span>
        </div>
        <div class="text-custom-primary">
          <span v-if="!userStore.wxOpenId" @click="handleWxLogin"
            >开始订阅</span
          >
        </div>
      </div>
    </nut-cell>
    <nut-grid :column-num="2" :border="false" icon-size="36" icon-color="#fff">
      <nut-grid-item
        :icon="svgs.monitor"
        text="召唤师技能提醒"
        @click="handleRouter('spellsMonitor')"
      ></nut-grid-item>
      <nut-grid-item
        :icon="svgs.rank_data"
        text="隐藏分查询"
        @click="handleRouter('rankData')"
      ></nut-grid-item>
    </nut-grid>
    <nut-cell-group>
      <nut-cell
        title="我的本命英雄"
        to="/"
        @click="handleRouter('myCarry')"
      ></nut-cell>
      <nut-cell
        title="黑名单列表"
        is-link
        @click="handleRouter('blacklist')"
      ></nut-cell>
      <nut-cell
        title="英雄时刻"
        is-link
        @click="handleRouter('heroTime')"
      ></nut-cell>
      <nut-cell
        title="问题反馈"
        is-link
        @click="handleRouter('feedBack')"
      ></nut-cell>
    </nut-cell-group>
    <!-- 授权 -->
    <nut-popup
      pop-class="popclass"
      :style="{ width: '75%' }"
      v-model:visible="showAuthLogin"
      :z-index="100"
    >
      <div class="p-5">
        <div class="w-full text-center text-sm mb-4">点击按钮授权登入</div>
        <nut-button block type="success" @click="userStore.wxLogin"
          >绑定Tik对局助手</nut-button
        >
      </div>
    </nut-popup>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, ref } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import { useUserStore } from '../../store'
import { getToken } from '../../utils/auth'
import svgs from '../../assets/svgs'

const userStore = useUserStore()
const showAuthLogin = ref(false)

useReady(async () => {
  if (getToken()) {
    await userStore.myInfo({
      mac: 'weixin',
      clientVersion: 'weixin',
    })
  } else {
    userStore.isLogin = false
  }
})

function toLogin() {
  if (userStore.isLogin) {
    return
  }
  Taro.navigateTo({ url: '/pages/login/index' })
}

function handleRouter(name) {
  console.log(name)
  switch (name) {
    case 'spellsMonitor':
      if (!userStore.isLogin) {
        Taro.showToast({
          title: `请先登入后再试试看`,
          duration: 1500,
          icon: 'none',
          mask: false,
        })
        return
      }
      if (!userStore.wxOpenId) {
        Taro.showToast({
          title: `请授权登入再试试看`,
          duration: 1500,
          icon: 'none',
          mask: false,
        })
        return
      }
      Taro.navigateTo({ url: '/pages/spells-monitor/index' })
    case 'blacklist':
      if (!userStore.isLogin) {
        Taro.showToast({
          title: `请先登入后再试试看`,
          duration: 1500,
          icon: 'none',
          mask: false,
        })
        return
      }
      Taro.navigateTo({ url: '/pages/blacklist/index' })
      break
    case 'rankData':
      if (!userStore.isLogin) {
        Taro.showToast({
          title: `请先登入后再试试看`,
          duration: 1500,
          icon: 'none',
          mask: false,
        })
        return
      }
      Taro.navigateTo({ url: '/pages/rank-data/index' })
      break
    case 'myCarry':
      if (!userStore.isLogin) {
        Taro.showToast({
          title: `请先登入后再试试看`,
          duration: 1500,
          icon: 'none',
          mask: false,
        })
        return
      }
      Taro.navigateTo({ url: '/pages/my-carry/index' })
      break
    case 'heroTime':
      Taro.showToast({
        title: '开发中，暂未开放',
        duration: 1500,
        icon: 'none',
        mask: false,
      })
      break
  }
}

function handleWxLogin() {
  if (userStore.isLogin) {
    return
  }
  showAuthLogin = !showAuthLogin
}
</script>
