<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        app
        rail
        rail-width="60"
        permanent
      >
        <v-list>
          <v-list-item>
            <v-img
              src="/images/logo.png"
              :width="50"
              class="mx-auto"
            />
          </v-list-item>
        </v-list>

        <v-list
          density="compact"
          nav
        >
          <v-list-item
            class="my-6 rounded-md"
            base-color="#B1B1B1"
            color="primary"
            v-for="(item, i) in sidebarList"
            :key="i"
            exact
            link
            :to="item.path"
            :active="i === 3"
            @click="i === 3 ? selectItem('profile') : null"
          >
            <!-- TODO: Tooltip -->

            <template #title>
              <v-row
                no-gutters
                align="center"
                justify="center"
              >
                <v-col
                  cols="12"
                  class="tw-justify-center tw-flex"
                >
                  <v-icon size="large">{{ item.prependIcon }}</v-icon>
                </v-col>
              </v-row>
            </template>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="tw-text-center">
            <v-img
              v-if="userProfile"
              :width="40"
              :height="40"
              :aspect-ratio="1"
              cover
              class="rounded-circle ma-2 tw-cursor-pointer zoom"
              :src="userProfile"
              id="menu-activator"
            ></v-img>
            <v-btn
              v-else
              id="menu-activator"
              class="ma-2"
              variant="text"
              icon="mdi-account-circle-outline"
            />

            <v-menu
              activator="#menu-activator"
              location="end"
            >
              <v-list>
                <v-list-item @click="settingProfile">
                  <v-list-item-title>โปรไฟล์</v-list-item-title>
                </v-list-item>
                <v-list-item @click="useSignOut()">
                  <v-list-item-title>ออกจากระบบ</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-navigation-drawer>
      <v-app-bar
        color="primary"
        app
        density="comfortable"
      >
        <v-app-bar-title class="font-weight-bold tw-text-xl">
          <v-icon
            icon="mdi-cog-outline"
            color="white"
            size="small"
            class="pb-1"
          />
          ตั้งค่า</v-app-bar-title
        >

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer
        permanent
        width="190"
        color="#fafafa"
      >
        <v-list color="primary">
          <div v-for="item in settingItems">
            <v-list-item
              :key="item.value"
              :title="item.title"
              :value="item.value"
              exact
              base-color="#707070"
              :prepend-icon="item.icon"
              :active="selectedItem === item.value"
              @click="selectItem(item.value)"
              :to="item.value"
            ></v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-navigation-drawer>

      <v-main class="tw-bg-[#f2f2f2]">
        <v-container
          fluid
          class="tw-min-h-screen tw-p-6"
        >
          <h1 class="tw-text-xl">
            <v-icon class="pb-2">
              {{
                settingItems.find(
                  (item) => 'setting-' + item.value === route.name
                )?.icon || ''
              }}
            </v-icon>
            {{
              settingItems.find(
                (item) => 'setting-' + item.value === route.name
              )?.title || ''
            }}
          </h1>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
const userProfile = ref()
const router = useRouter()
const route = useRoute()

const sidebarList = [
  {
    prependIcon: 'mdi-message-outline',
    title: 'แชต',
    value: 'chat',
    path: '/chat',
  },
  {
    prependIcon: 'mdi-robot-outline',
    title: 'แชตบอท',
    value: 'chatbot',
    path: '/chatbot',
  },
  {
    prependIcon: 'mdi-message-text-outline',
    title: 'รูปแบบคำตอบ',
    value: 'chat-template',
    path: '/chat-template',
  },
  {
    prependIcon: 'mdi-cog-outline',
    title: 'ตั้งค่า',
    value: 'setting',
    path: '/setting/profile',
  },
]

const settingProfile = () => {
  router.push('/setting/profile')
  selectedItem.value = 'profile'
}
const selectedItem = ref('profile')

const selectItem = (item: string) => {
  selectedItem.value = item
}

const settingItems = [
  {
    title: 'ข้อมูลส่วนตัว',
    value: 'profile',
    icon: 'mdi-account-outline',
  },
  {
    title: 'การตั้งค่าช่องทาง',
    value: 'chat-integration',
    icon: 'mdi-store-cog-outline',
  },
  {
    title: 'สมาชิก',
    value: 'member',
    icon: 'mdi-account-group-outline',
  },
]
</script>