<template>
  <div class="px-4 pt-26 bg-white">
    <!-- title -->
    <div class="px-6">
      <div class="font-black text-3xl">登入</div>
      <div class="text-lg text-gray-700 mt-1">欢迎来到 Tik对局助手</div>
    </div>
    <!-- form -->
    <div class="mt-16 px-2">
      <nut-form>
        <nut-form-item label="用户名" label-width="68">
          <input
            class=""
            v-model="loginForm.username"
            placeholder="请输入用户名"
            type="text"
            max-length="16"
          />
        </nut-form-item>
        <nut-form-item label="密码" label-width="68">
          <input
            class=""
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            max-length="32"
          />
        </nut-form-item>
        <nut-form-item label="验证码" label-width="68">
          <div class="flex justify-between">
            <input
              class=" w-[52%]"
              v-model="loginForm.verifyCode"
              placeholder="请输入验证码"
              type="text"
              max-length="4"
            />
            <img
              class="h-[50rpx] w-[48%] border-none"
              :src="captchaImg"
              @click="getCaptchaImg"
            />
          </div>
        </nut-form-item>
        <nut-form-item class="!p-0"></nut-form-item>
      </nut-form>
      <div class="mt-1 p-4 flex justify-between">
        <div class="text-blue-500 text-sm">忘记密码</div>
        <div class="text-blue-500 text-sm">注册账号</div>
      </div>
      <div class="mt-2 ">
        <nut-button block size="large" type="primary" @click="handleLogin"
          >登入</nut-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Taro, { useReady } from '@tarojs/taro'
import { getCaptcha } from '../../api/common'
import { useUserStore } from '../../store'

const userStore = useUserStore()

const loginForm = reactive({
  username: '',
  password: '',
  mac: 'weixin',
  captchaId: '',
  clientVersion: 'weixin',
  verifyCode: '',
})

const captchaImg = ref('')

useReady(async () => {
  await getCaptchaImg()
})

async function getCaptchaImg() {
  const res = await getCaptcha()
  loginForm.captchaId = res.id
  captchaImg.value = res.img
}

async function handleLogin() {
  try {
    await userStore.doLogin(loginForm)
    setTimeout(() => {
      Taro.reLaunch({ url: '/pages/index/index' })
    }, 1000)
  } catch (err) {
    console.log(err)
    await getCaptchaImg()
  }
}
</script>
