<template>
  <v-app-bar
    :elevation="0"
    class="tw-border-b"
    order="3"
  >
    <template v-slot:append>
      <div
        class="tw-flex tw-mr-2"
        v-if="isEnabled && props.status === Status.PENDING"
      >
        <v-icon
          color="primary"
          class="pb-1 mr-1"
          >mdi-robot-excited-outline</v-icon
        >แชตบอทกำลังทำงาน
      </div>

      <ChatStatus
        :id="props.id"
        :status="props.status"
      />
    </template>
    <template v-slot:prepend>
      <v-img
        :width="40"
        :height="40"
        aspect-ratio="1/1"
        cover
        class="tw-rounded-full"
        :src="storeCustomer.pictureUrl"
      ></v-img>
    </template>
    <v-app-bar-title class="font-weight-bold">
      <v-icon
        :class="storeCustomer.source === SocialType.INSTAGRAM ? 'pb-1' : 'pb-6'"
        size="x-small"
        >{{ generateSocialIcon(storeCustomer.source) }}</v-icon
      >
      {{ storeCustomer.displayName }}
    </v-app-bar-title>
  </v-app-bar>
</template>
<script setup lang="ts">
import profileSrc from '~/assets/images/profile.png'
import { SocialType } from '~/constants/SocialType'
import { getChatbotStatus } from '~/services/chatbot.service'
import { Status } from '~/constants/Status'

const props = defineProps<{
  id: string
  status: any
}>()

const storeCustomer = useStoreCustomer()

const { data } = (await getChatbotStatus()).chatbotStatus.value
const statusLine = ref(data[0].isEnabledLine)
const statusFb = ref(data[0].isEnabledFacebook)
const statusIg = ref(data[0].isEnabledInstagram)

const isEnabled = computed(() => {
  const { source } = storeCustomer.value
  return (
    (source === SocialType.LINE && statusLine.value) ||
    (source === SocialType.FACEBOOK && statusFb.value) ||
    (source === SocialType.INSTAGRAM && statusIg.value)
  )
})
</script>
