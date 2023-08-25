<template>
  <div
    ref="root"
    v-uid
    data-id="sds-form-group"
    class="w-full"
  >
    <label
      :for="id"
      class="flex gap-1 items-center mb-2 font-medium"
    >
      <slot name="label"><span>{{ label }}</span></slot>
      <span
        v-if="required"
        class="text-red-500 dark:text-red-300 text-xs"
      >* required</span>
    </label>
    <slot
      :id="id"
      :valid="state"
      :invalid="state === false"
      :required="required"
      :readonly="readonly"
    />
    <p
      v-if="state && validFeedback"
      class="block text-xs italic text-green-700 dark:text-green-300 py-1"
    >
      <slot name="validFeedback">
        <span>{{ validFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="state === false && invalidFeedback"
      class="block text-xs italic text-red-500 dark:text-red-300 py-1"
    >
      <slot name="invalidFeedback">
        <span>{{ invalidFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="description"
      class="block text-xs italic text-gray-600 dark:text-gray-500 py-1"
    >
      <slot name="description">
        <span>{{ description }}</span>
      </slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Uid } from '@shimyshack/uid'

export default defineComponent({
  name: 'SdsFormGroup',
  directives: {
    uid: Uid,
  },
})
</script>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'

const props = defineProps({
  label: { type: String, default: null },
  labelFor: { type: String, default: null },
  description: { type: String, default: null },
  validFeedback: { type: String, default: null },
  invalidFeedback: { type: String, default: null },
  state: { type: Boolean as PropType<boolean | null>, default: null },
  required: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
})

const root = ref()

const id = computed(() => {
  return props.labelFor || `${root.value?.id}_form-control`
})
</script>
