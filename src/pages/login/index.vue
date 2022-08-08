<template>
  <view class="px-4 pt-[148rpx] bg-white !h-full">
    <!-- title -->
    <view class="px-6">
      <view class="font-black text-3xl">登入</view>
      <view class="text-lg text-gray-700 mt-1">欢迎来到 Tik对局助手</view>
    </view>
    <div class="mt-14 px-[60rpx]">
      <u-form :model="loginForm" label-width="120">
        <u-form-item label="登入名"
          ><u-input
            v-model="loginForm.username"
            placeholder="请输入登入名"
            type="text"
            max-length="16"
        /></u-form-item>
        <u-form-item label="密码"
          ><u-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            max-length="32"
        /></u-form-item>
        <u-form-item label="验证码"
          ><u-input
            class="!w-[52%]"
            v-model="loginForm.verifyCode"
            placeholder="请输入验证码"
            type="text"
            max-length="4"
          />

          <template #right>
            <img
              class="!h-[60rpx] !w-[160rpx] border-none"
              :src="captchaImg"
              @click="getCaptchaImg"
            />
          </template>
        </u-form-item>
      </u-form>
      <div class="mt-1 p-4 flex justify-between">
        <div class="text-blue-500 text-sm" @click="noticeClient">忘记密码</div>
        <div class="text-blue-500 text-sm" @click="noticeClient">注册账号</div>
      </div>
      <view class="mt-2"
        ><u-button type="primary" @click="handleLogin">登入</u-button></view
      >
    </div>
  </view>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import { getCaptcha } from '../../api/common'
import { useUserStore } from '../../stores/user'
const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: '',
  captchaId: '',
  verifyCode: '',
})
const captchaImg = ref('')

onReady(async () => {
  await getCaptchaImg()
})
async function getCaptchaImg() {
  const res: any = await getCaptcha()
  loginForm.captchaId = res.id
  captchaImg.value = res.img
}
async function handleLogin(e) {
  if (
    loginForm.username == '' &&
    loginForm.password == '' &&
    loginForm.verifyCode == ''
  ) {
    uni.showToast({
      title: '请输入用户名，密码以及验证码内容',
      icon: 'none',
    })
    return
  }

  try {
    const res = await uni.getUserProfile({ desc: '完善账户信息' })
    const { gender, avatarUrl } = res.userInfo
    await userStore.handleLogin({ ...loginForm, gender, avatarUrl })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/index/index' })
    }, 1000)
  } catch (err) {
    console.log(err)
    await getCaptchaImg()
  }
}

function noticeClient() {
  uni.showToast({
    title: '仅允许在客户端进行此操作',
    icon: 'none',
  })
}
</script>

<style></style>
