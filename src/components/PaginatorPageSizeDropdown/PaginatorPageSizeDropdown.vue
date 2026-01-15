<template>
  <SdsActionDropdown
    data-id="sds-paginator-page-size-dropdown"
    kind="secondary"
    variant="gray"
    :title="title"
    :disabled="disabled"
  >
    <template 
      v-for="option in options" 
      :key="JSON.stringify(option)"
    >
      <SdsDropdownItem
        data-id="sds-paginator-page-size-dropdown-item"
        tag="button"
        @click="onClick(option.value)"
      >
        {{ option.value }}
      </SdsDropdownItem>
    </template>
  </SdsActionDropdown>
</template>

<script lang="ts" setup>
defineOptions({
  name: "SdsPaginatorPageSizeDropdown"
})

const props = defineProps({
  options: {
    type: Array as PropType<{ value: number, text: string }[]>,
    default: (): { value: number, text: string }[] => [],
    validator: (arr: { value: number, text: string }[]) => Array.isArray(arr)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const model = defineModel({ type: Number, default: 0 })
const emit = defineEmits(['update:modelValue'])

const selection = computed({
  get () {
    return model.value
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const options = computed(() => props.options)
const title = computed(() => `${selection.value} per page`)

const onClick = (value: number) => {
  selection.value = value
}
</script>