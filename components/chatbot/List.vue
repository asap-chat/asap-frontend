<template>
  <v-app-bar
    :elevation="0"
    class="tw-border-b"
    order="2"
  >
    <v-app-bar-title class="font-weight-bold tw-text-lg">
      ตั้งค่าการตอบกลับของแชตบอท
    </v-app-bar-title>
  </v-app-bar>
  <div class="pa-2">
    <div class="tw-flex tw-justify-between mb-7">
      <div class="tw-flex tw-items-center">
        <span class="tw-text-xl font-weight-bold text-primary">
          {{ chatbotMsg.data.length }}
        </span>
        &nbsp; รูปแบบการตอบกลับของแชตบอท
      </div>
      <div class="tw-flex tw-gap-3 tw-items-center tw-w-96">
        <v-text-field
          density="compact"
          variant="outlined"
          color="primary"
          rounded="lg"
          placeholder="ค้นหา"
          bg-color="white"
          hide-details
          v-model="searchKeyword"
        >
          <template v-slot:prepend-inner>
            <v-icon color="primary">mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <v-btn
          prepend-icon="mdi-plus"
          color="primary"
          class="font-weight-bold"
          flat
          rounded="lg"
          @click="chatbotCreation = true"
        >
          <template v-slot:prepend> <v-icon color="white"></v-icon> </template>เพิ่มใหม่
        </v-btn>
      </div>
    </div>
    <div
      class="tw-justify-items-center tw-overflow-y-auto"
      style="max-height: calc(100vh - 230px)"
    >
      <div class="tw-text-center mt-12">
        {{ filteredChatbotMsg.length === 0 ? 'ไม่พบรูปแบบการตอบกลับของแชตบอทที่คุณค้นหา' : '' }}
      </div>

      <div class="tw-grid tw-grid-cols-1 xl:tw-grid-cols-2">
        <ChatbotCard
          v-for="item in filteredChatbotMsg"
          class="mb-3"
          :id="item._id"
          :keyword="item.keyword"
          :reply-message="item.replyMessage"
          @edit="storeEdit(item._id, item.keyword, item.replyMessage)"
        />
      </div>
      <v-pagination
        v-if="filteredChatbotMsg.length !== 0"
        v-model="page"
        :length="pageCount"
        rounded="circle"
        @click="changePagination"
      ></v-pagination>
    </div>
  </div>

  <ChatbotCreation
    v-model="chatbotCreation"
    @close="chatbotCreation = false"
    :page="page"
  />
  <ChatbotEditing
    v-model="chatbotEditing"
    :id="selectedChatbot?.id"
    :keyword="selectedChatbot?.keyword"
    :reply-message="selectedChatbot?.replyMessage"
    :page="page"
    @close="chatbotEditing = false"
  />
</template>
<script setup lang="ts">
import { getChatbotMsg } from '~/services/chatbot.service'

const page = ref(1)
const { chatbotMsg } = await getChatbotMsg(page.value)
const pageCount = computed(() => {
  return chatbotMsg.value.pageCount
})

const chatbotCreation = ref(false)
const chatbotEditing = ref(false)

const selectedChatbot = ref<any>({
  _id: '',
  keyword: [''],
  replyMessage: '',
})

const storeEdit = (id: string, keyword: string, replyMessage: string) => {
  selectedChatbot.value = { id, keyword, replyMessage }
  chatbotEditing.value = true
}

const searchKeyword = ref('')
const filteredChatbotMsg = computed(() => {
  const keyword = searchKeyword.value.toLowerCase().trim()
  return chatbotMsg.value.data
    .sort((a: any, b: any) => {
      const dateA = new Date(a.updatedAt)
      const dateB = new Date(b.updatedAt)

      return dateB.getTime() - dateA.getTime()
    })
    .filter((item: any) => {
      return (
        item.keyword.some((kw: any) => kw.toLowerCase().includes(keyword)) ||
        item.replyMessage.toLowerCase().includes(keyword)
      )
    })
})

function scrollToTop() {
  var scrollableDiv = document.getElementById('scrollableDiv')
  if (scrollableDiv) {
    scrollableDiv.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

const changePagination = () => {
  getChatbotMsg(page.value)
  scrollToTop()
}
</script>
