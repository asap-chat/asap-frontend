<template>
  <v-card
    rounded="xl"
    class="tw-border tw-border-[#d4caff]"
    flat
    :width="props.width ? props.width : 370"
    :link="!allowEdit"
  >
    <div class="tw-flex tw-flex-col tw-h-full">
      <div
        class="tw-h-12 tw-flex tw-justify-between tw-items-center bg-primary tw-pl-5 tw-border tw-border-[#d4caff]"
      >
        <div class="tw-w-4/5">
          <div class="tw-items-center font-weight-bold tw-truncate">{{ props.keyword }}</div>
        </div>
        <div v-if="allowEdit">
          <CommonIconButton
            icon="mdi-pencil-outline"
            @click="edit"
          />
        </div>
      </div>
      <div class="pt-8 pb-5 px-5 tw-mt-auto">
        <div class="tw-chat tw-chat-end tw-whitespace-pre-line">
          <div class="tw-chat-bubble tw-bg-[#d4caff] text-black">{{ props.template }}</div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: string
  keyword: string
  template: string
  allowEdit: boolean
  width?: number
}>()
const emits = defineEmits(['edit'])
const edit = () => {
  emits('edit')
}
</script>
