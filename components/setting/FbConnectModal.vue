<template>
  <v-card>
    <template v-slot:title>
      <div class="font-weight-bold">เชื่อมต่อ Facebook Page</div>
    </template>
    <template v-slot:append>
      <v-btn
        @click="back"
        variant="text"
      >
        <v-icon
          icon="mdi-chevron-left"
          color="secondary-lighten"
        ></v-icon>
      </v-btn>
    </template>
    <v-card-text>
      <ul class="ms-6 tw-text-sm">
        <li>คุณต้องมีสิทธิ์เป็นผู้ดูแลระบบบน Facebook Fanpage เพื่อทำการเชื่อมต่อ</li>
        <li>เฉพาะข้อความใหม่เท่านั้นที่จะปรากฏหลังจากเชื่อมต่อ</li>
        <li>ข้อความที่ส่งจากแพลตฟอร์ม Facebook จะไม่ปรากฏใน ASAP</li>
      </ul>

      <div class="tw-flex tw-justify-center mt-4 mb-2">
        <v-btn
          block
          color="indigo-darken-1"
          size="large"
          variant="flat"
          class="font-weight-bold"
          :loading="loading"
          @click="connect"
        >
          เชื่อมต่อ
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { oauthFacebook } from '~/services/facebook.service'

const emits = defineEmits(['back'])

const back = () => {
  emits('back')
}

const loading = ref(false)

const connect = async () => {
  loading.value = true
  const oauthURL = oauthFacebook()
  window.location.href = oauthURL
}
</script>
