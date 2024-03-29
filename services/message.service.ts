import { ACCESS_TOKEN, USER } from '~/constants/Token'

const user: any = useCookie(USER)
const access_token = useCookie(ACCESS_TOKEN)

const { shop, isOwner } = user?.value || {}
const { name } = shop || {}

const chatTemplateData = ref()
export const getChatTemplate = async (page: number = 1, onChat: boolean = true) => {
  try {
    const response = await fetch(
      onChat
        ? `${import.meta.env.VITE_BASE_URL}/chat-template?shopName=${name}&$limit=12&page=${page}`
        : `${import.meta.env.VITE_BASE_URL}/chat-template?shopName=${name}`,
      {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + access_token.value,
        },
      }
    )
    if (response.status === 200) {
      chatTemplateData.value = await response.json()
    } else if (response.status === 401) {
      console.log('call - refresh token')
      await useRefreshToken()
      await getChatTemplate(page)
    }
  } catch (error: any) {
    console.log(error)
  }

  return { chatTemplateData }
}

const socialInfo = ref()
export const getSocialAccount = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/social-account?$limit=3`, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + access_token.value,
      },
    })
    if (response.status === 200) {
      socialInfo.value = await response.json()
    } else if (response.status === 401) {
      console.log('call - refresh token')
      await useRefreshToken()
      await getSocialAccount()
    }
  } catch (error: any) {
    console.log(error)
  }

  return { socialInfo }
}

const latestMessages = ref()
export const getLatestMsg = async () => {
  if (isOwner) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/social-message/${name}/latest`,
        {
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + access_token.value,
          },
        }
      )
      if (response.status === 200) {
        latestMessages.value = await response.json()
      } else if (response.status === 401) {
        console.log('call - refresh token')
        await useRefreshToken()
        await getLatestMsg()
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  return { latestMessages }
}

export const updateMsg = async (userId: string, msgId: string) => {
  const res = await useFetch(
    `${import.meta.env.VITE_BASE_URL}/social-message/${name}/${userId}/${msgId}`,
    {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token.value,
      },
      body: JSON.stringify({
        isRead: true,
      }),
    }
  )
  if (res.status.value === 'error') {
    await useRefreshToken()
    await updateMsg(userId, msgId)
  }
  if (res.status.value === 'success') {
    await getLatestMsg()
  }
  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
}

const customer = ref()
export const getCustomer = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat-customer`, {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + access_token.value,
      },
    })
    if (response.status === 200) {
      customer.value = await response.json()
    } else if (response.status === 401) {
      console.log('call - refresh token')
      await useRefreshToken()
      await getCustomer()
    }
  } catch (error: any) {
    console.log(error)
  }
  return { customer }
}

const storeSelectCus: any = useCookie('storeSelectCus')

export const updateChatStatus = async (statusId: string, chatStatus: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat-customer/${statusId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        chatStatus: chatStatus,
      }),
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token.value,
      },
    })

    if (response.status === 200) {
      await getCustomer()
      storeSelectCus.value.status = chatStatus
    } else if (response.status === 401) {
      await useRefreshToken()
      await updateChatStatus(statusId, chatStatus)
    } else {
      console.log('err')
    }
  } catch (error) {
    console.log(error)
  }
}
