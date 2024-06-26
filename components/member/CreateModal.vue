<template>
  <v-dialog :width="440">
    <v-card class="tw-rounded-xl">
      <v-toolbar
        color="white"
        class="px-4 pt-4"
      >
        <v-toolbar-title class="font-weight-bold">เพิ่มสมาชิกใหม่</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <common-icon-button
            icon="mdi-close"
            size="small"
            color="secondary-lighten"
            @click="close()"
          />
        </v-toolbar-items>
      </v-toolbar>
      <v-form
        v-model="isFormValid"
        class="px-6 pt-3 pb-3"
      >
        <div class="form-control">
          <p class="pb-2">อีเมล</p>
          <CommonTextField
            :rules="[required, checkEmail]"
            v-model="memberData.email"
            id="keyword"
            name="keyword"
            rounded="lg"
            density="compact"
            :error="dupKeyword"
          />
          <p
            class="mb-3 text-error tw-text-sm mt-n3"
            v-if="dupKeyword"
          >
            Email นี้มีอยู่ในระบบแล้ว
          </p>
        </div>
        <div class="form-control tw-mt-4">
          <p class="pb-4">เลือกบทบาท</p>
          <v-radio-group
            color="primary"
            v-model="memberData.role"
            :rules="[required]"
          >
            <v-radio
              v-for="biz in businesses"
              :value="biz.value"
              class="tw-mb-3"
            >
              <template v-slot:label>
                <div :class="memberData.role === biz.value ? 'text-primary ' : 'tw-text-[#8B8C8C]'">
                  <b>{{ biz.label }}</b>
                  <br /><span class="tw-text-xs">{{ biz.description }}</span>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-form>
      <div class="tw-flex tw-justify-end pb-6 px-6">
        <CommonButton
          text="บันทึก"
          icon="mdi-content-save"
          color="primary"
          variant="flat"
          :disabled="!isFormValid"
          @click="createMember(memberData)"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ACCESS_TOKEN, USER } from '~/constants/Cookie'
import { useToast } from 'vue-toastification'
import { getMember } from '~/services/member.service'
import { MemberInfo } from '~/interfaces/social.interface'

const { checkEmail, required } = useFormRules()
const toast = useToast()
const user: any = useCookie(USER)
const access_token = useCookie(ACCESS_TOKEN)
const dupKeyword = ref(false)

const { shop } = user.value || {}

const businesses = [
  {
    label: 'เจ้าของธุรกิจ',
    value: 'owner',
    description: 'เหมาะสำหรับเจ้าของธุรกิจหรือผู้ที่ได้รับมอบหมายให้จัดการระบบเสมือนเจ้าของ',
  },
  {
    label: 'ผู้จัดการ',
    value: 'manager',
    description:
      'เหมาะสำหรับหัวหน้าทีมดูแลลูกค้าที่ต้องกำกับทีมงาน และเอเจนต์ และจัดการระบบได้บางส่วน',
  },
  {
    label: 'เอเจนต์',
    value: 'agent',
    description: 'เหมาะสำหรับผู้ที่มีหน้าที่ดูแลเฉพาะลูกค้าที่ได้รับมอบหมายเท่านั้น',
  },
]
const memberData = ref<MemberInfo>({
  email: '',
  role: '',
  shop: shop,
})
const emits = defineEmits(['close-modal'])
const close = () => {
  emits('close-modal')
  dupKeyword.value = false
  memberData.value.email = ''
  memberData.value.role = ''
}
const isFormValid = ref(false)

const createMember = async (memberData: MemberInfo) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/team-member`, {
      method: 'post',
      body: JSON.stringify({
        email: memberData.email,
        role: memberData.role,
        shop: shop,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token.value,
      },
    })
    if (response.status === 200 || response.status === 201) {
      close()
      toast.success('เพิ่มสมาชิกสำเร็จ', useToastOption)
      await getMember()
    } else if (response.status === 401) {
      dupKeyword.value = false
      await useRefreshToken()
      await createMember(memberData)
    } else if (response.status === 500) {
      dupKeyword.value = true
    } else {
      console.log('err')
    }
  } catch (error) {
    console.error(error)
  }
}

watch(
  () => memberData.value.email,
  (newValue) => {
    dupKeyword.value = false
  }
)
</script>
<style>
.v-label--clickable {
  opacity: 1;
}
</style>
