<template>
  <view class="p-4">
    <view class="bg-custom-primary text-white px-4 py-4 rounded">
      <view class="flex items-center justify-start" @click="toLogin">
        <u-avatar
          :src="userStore.avatarUrl"
          mode="square"
          size="large"
        ></u-avatar>
        <view class="flex flex-col ml-5">
          <view class="font-bold text-lg">{{ userStore.nickName }}</view>
          <view class="text-sm mt-1 text-gray-300">{{
            userStore.username
          }}</view>
        </view>
      </view>
    </view>

    <view class="p-3 mt-2 bg-white shadow-sm">
      <view class="flex items-center justify-between w-full">
        <view class="flex items-center">
          <span>订阅状态：</span>
          <span v-if="!userStore.wxOpenId" class="text-red-500">未订阅</span>
          <span v-if="userStore.wxOpenId" class="text-green-500">已订阅</span>
        </view>
        <view class="text-custom-primary">
          <span v-if="!userStore.wxOpenId" @click="handleWxBind">开始订阅</span>
        </view>
      </view>
    </view>

    <u-popup
      v-model="showAuthLogin"
      mode="center"
      width="80%"
      height="240rpx"
      border-radius="8"
      :closeable="true"
    >
      <view class="p-4 h-full w-full flex flex-col justify-center items-center">
        <div class="w-full text-center text-sm mb-4">
          点击按钮绑定微信小程序
        </div>
        <u-button type="success" @click="userStore.bindWeApp">绑定</u-button>
      </view>
    </u-popup>

    <view class="p-3 mt-2 bg-white shadow-sm">
      <view class="flex items-center justify-evenly">
        <view
          class="flex pr-6 flex-col items-center justify-center"
          @click="handleRouter('spellsMonitor')"
        >
          <img class="w-[86rpx] h-[86rpx]" :src="svgs.monitor" alt="" />
          <view class="mt-1 grid-text">召唤师技能监听</view>
        </view>
        <view
          class="flex pl-6 flex-col items-center justify-center"
          @click="handleRouter('rankData')"
        >
          <img class="w-[86rpx] h-[86rpx]" :src="svgs.rank_data" alt="" />
          <view class="mt-1 grid-text">隐藏分查询</view>
        </view>
      </view>
    </view>

    <view class="mt-2 shadow-sm">
      <u-cell-group>
        <u-cell-item
          title="本命英雄查询"
          @click="handleRouter('myCarry')"
        ></u-cell-item>
        <u-cell-item
          title="我的黑名单"
          @click="handleRouter('blacklist')"
        ></u-cell-item>
        <u-cell-item
          title="英雄时刻"
          @click="handleRouter('heroTime')"
        ></u-cell-item>
        <u-cell-item title="联系作者"></u-cell-item>
      </u-cell-group>
    </view>

    <u-action-sheet
      :list="logoutList"
      v-model="showLoinout"
      @click="hadnleLogout"
    ></u-action-sheet>

    <view
      class="text-gray-300 absolute bottom-2 text-xs flex items-center justify-center w-full"
    >
      <text>lol-tool.com</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import { useUserStore } from '../../stores/user'
import svgs from '../../assets/svgs'
import { ref } from 'vue'
import { getToken, removeToken } from '../../utils/auth'

const userStore = useUserStore()

const showAuthLogin = ref(false)
const showLoinout = ref(false)
const logoutList = ref([
  {
    text: '退出登入',
    color: 'red',
    fontSize: 34,
  },
])

onReady(async () => {
  if (getToken()) {
    await userStore.getInfo({
      mac: 'weixin',
      clientVersion: 'weixin',
    })
  } else {
    userStore.isLogin = false
  }
})

function handleRouter(name: string) {
  if (!userStore.isLogin) {
    uni.showToast({
      title: '请先登入后再试试看',
      icon: 'none',
    })
    return
  }
  switch (name) {
    case 'spellsMonitor':
      uni.navigateTo({ url: '/pages/spells-monitor/index' })
      break
    case 'blacklist':
      uni.navigateTo({ url: '/pages/blacklist/index' })
      break
    case 'rankData':
      uni.navigateTo({ url: '/pages/rank-data/index' })
      break
    case 'myCarry':
      uni.navigateTo({ url: '/pages/my-carry/index' })
      break
    case 'heroTime':
      uni.showToast({
        title: '开发中，暂未开放',
        duration: 1500,
        icon: 'none',
        mask: false,
      })
      break
  }
}

function toLogin() {
  if (userStore.isLogin) {
    showLoinout.value = true
    return
  }
  uni.navigateTo({ url: '/pages/login/index' })
}

function hadnleLogout() {
  removeToken()
  uni.showToast({
    title: '账号已退出',
    icon: 'none',
  })
  setTimeout(() => {
    userStore.resetUser()
    uni.reLaunch({ url: '/pages/index/index' })
  }, 1000)
}

function handleWxBind() {
  if (!userStore.isLogin) {
    uni.showToast({
      title: '请先登入账号',
      icon: 'none',
    })
    return
  }
  showAuthLogin.value = true
}
</script>

<style></style>