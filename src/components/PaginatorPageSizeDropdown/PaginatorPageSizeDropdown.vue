<template>
  <SdsActionDropdown
    data-id="sds-paginator-page-size-dropdown"
    kind="secondary"
    variant="gray"
    :title="title"
    :disabled="disabled"
  >
    <template #title>
      <slot 
        name="label" 
        :selection="selection"
      >
        {{ title }}
      </slot>
    </template>
    <template 
      v-for="option in options" 
      :key="JSON.stringify(option)"
    >
      <SdsDropdownItem
        data-id="sds-paginator-page-size-dropdown-item"
        tag="button"
        @click="onClick(option.value)"
      >
        {{ option.text }}
      </SdsDropdownItem>
    </template>
  </SdsActionDropdown>
</template>

<script lang="ts" setup>
interface PaginatorPageSizeDropdownItem {
  value: number;
  text: string;
}

interface PaginatorPageSizeDropdown {
  options?: PaginatorPageSizeDropdownItem[];
  disabled?: boolean;
}

defineOptions({
  name: 'SdsPaginatorPageSizeDropdown'
})

const props = withDefaults(defineProps<PaginatorPageSizeDropdown>(), {
  options: () => [],
  disabled: false
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