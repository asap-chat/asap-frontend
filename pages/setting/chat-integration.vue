<template>
  <div class="mt-6 mx-auto">
    <v-table
      v-if="socialInfo.length !== 0"
      fixed-header
      class="tw-bg-[#F2F2F2]"
      width="100px"
    >
      <thead>
        <tr class="tw-text-sm">
          <th class="text-left font-weight-bold tw-w-64">ชื่อช่องทาง</th>
          <th class="text-left font-weight-bold tw-w-64">สถานะ</th>
          <th class="text-left tw-w-64"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="tw-text-sm"
          v-for="item in socialInfo"
          :key="item.name"
        >
          <td class="font-weight-bold">
            <v-icon
              class="mr-3 mb-1"
              size="x-large"
              :color="getSocialColor(item.socialType)"
            >
              {{ getSocialIcon(item.socialType) }}
            </v-icon>
            {{ item.name }}
          </td>
          <td :class="item.status ? 'text-info' : 'text-error'">
            <v-icon
              :color="item.status ? 'info' : 'error'"
              size="sm"
              class="mr-1"
              >{{ item.status ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon
            >{{ item.status ? 'พร้อมใช้งาน' : 'พบปัญหา' }}
          </td>
          <td class="text-center">
            <v-btn
              variant="flat"
              class="font-weight-bold"
              color="error"
              >ยกเลิกการเชื่อมต่อ</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="tw-text-center">
      <v-btn
        variant="flat"
        class="font-weight-bold tw-mx-auto mt-4"
        color="info"
        prepend-icon="mdi-plus-circle-outline"
        @click="connectDialog = true"
      >
        <template v-slot:prepend>
          <v-icon color="white"></v-icon>
        </template>
        เพิ่มการเชื่อมต่อ</v-btn
      >
    </div>

    <div>
      <v-row justify="center">
        <v-dialog
          v-model="connectDialog"
          width="auto"
        >
          <v-card
            :width="400"
            class="text-center pt-3"
          >
            <v-card-text>
              <v-btn
                class="tw-absolute tw-top-2.5 tw-right-2.5"
                @click="connectDialog = false"
                variant="text"
              >
                <v-icon
                  icon="mdi-close"
                  color="secondary-lighten"
                ></v-icon>
              </v-btn>
              <div class="text-center mx-auto">
                <h3 class="tw-text-xl">เลือกช่องทาง</h3>
                <p class="tw-text-sm tw-opacity-60">เลือกช่องทางที่ต้องการเชื่อมต่อ</p>
              </div>
              <v-table
                fixed-header
                class="tw-bg-white pt-4"
              >
                <tbody>
                  <tr
                    class="tw-text-sm"
                    v-for="item in socialList"
                  >
                    <td class="font-weight-bold text-left">
                      <v-icon
                        class="mr-3 mb-1"
                        size="x-large"
                        :color="getSocialColor(item.socialType)"
                      >
                        {{ getSocialIcon(item.socialType) }}
                      </v-icon>
                      {{ item.name }}
                    </td>

                    <td class="text-center">
                      <v-icon
                        v-if="socialInfo.some((data: any) => data.socialType === item.socialType)"
                        color="info"
                      >
                        mdi-check
                      </v-icon>
                      <v-btn
                        v-else
                        variant="outlined"
                        class="font-weight-bold text-secondary-lighten"
                        @click=";(connectSocialDialog = true), (selectSocial = item.socialType)"
                      >
                        เชื่อมต่อ
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="connectSocialDialog"
          width="auto"
        >
          <component
            :is="getSocialConnectModalComponent(selectSocial)"
            @back="connectSocialDialog = false"
          />
        </v-dialog>
      </v-row>
    </div>
  </div>
  <div class="text-center mt-4"></div>
</template>
<script setup lang="ts">
import { SocialConnectInfo } from '~/interfaces/social.interface'
import SettingLineConnectModal from '~/components/setting/LineConnectModal.vue'
import SettingFbConnectModal from '~/components/setting/FbConnectModal.vue'
import SettingIgConnectModal from '~/components/setting/IgConnectModal.vue'

useHead({
  title: 'การตั้งค่า',
})
definePageMeta({
  layout: 'setting',
})

const connectDialog = ref(false)
const connectSocialDialog = ref(false)
const selectSocial = ref('')

const socialList = [
  {
    name: 'LINE Official Account',
    socialType: SocialType.line,
  },
  {
    name: 'Facebook Page',
    socialType: SocialType.fb,
  },
  {
    name: 'Instagram',
    socialType: SocialType.ig,
  },
]

const socialInfo = [
  // {
  //   name: 'TestLINEOA',
  //   status: true,
  //   socialType: SocialType.line,
  // },
  {
    name: 'TestFacebook',
    status: false,
    socialType: SocialType.fb,
  },
  {
    name: 'TestIG',
    status: true,
    socialType: SocialType.ig,
  },
] as SocialConnectInfo[]

const getSocialConnectModalComponent = (socialType: string) => {
  switch (socialType) {
    case SocialType.line:
      return SettingLineConnectModal
    case SocialType.fb:
      return SettingFbConnectModal
    case SocialType.ig:
      return SettingIgConnectModal
    default:
      return null
  }
}
const getSocialColor = (socialType: string) => {
  switch (socialType) {
    case SocialType.line:
      return '#02c153'
    case SocialType.fb:
      return '#0765FF'
    default:
      return ''
  }
}

const getSocialIcon = (socialType: string) => {
  switch (socialType) {
    case SocialType.line:
      return 'fa:fa-brands fa-line'
    case SocialType.fb:
      return 'fa:fa-brands fa-square-facebook'
    case SocialType.ig:
      return 'mdi-instagram'
    default:
      return ''
  }
}
</script>
<style>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background-color: #f2f2f2;
}
</style>