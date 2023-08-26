<template>
  <div
    ref="root"
    v-uid
    data-id="sds-form-group"
    class="w-full"
  >
    <label
      :for="id"
      :class="{
        'font-medium': labelWeight === 'medium',
        'font-semibold': labelWeight === 'semibold',
        'font-bold': labelWeight === 'bold',
      }"
      class="flex gap-1 items-center mb-2"
    >
      <slot name="label"><span>{{ label }}</span></slot>
      <span
        v-if="required"
        class="font-normal text-red-500 dark:text-red-300 text-xs"
      >* required</span>
    </label>
    <!-- @slot Default slot content. This is where you add the form field. @binding id, valid, invalid, required, readonly -->
    <slot
      :id="id"
      :valid="state"
      :invalid="state === false"
      :required="required"
      :readonly="readonly"
    />
    <p
      v-if="state && (validFeedback || $slots.validFeedback)"
      class="block text-xs italic text-green-700 dark:text-green-300 py-1"
    >
      <!-- @slot Valid Feedback slot content. This will override the `validFeedback` prop. -->
      <slot name="validFeedback">
        <span>{{ validFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="state === false && (invalidFeedback || $slots.invalidFeedback)"
      class="block text-xs italic text-red-500 dark:text-red-300 py-1"
    >
      <!-- @slot Invalid Feedback slot content. This will override the `invalidFeedback` prop. -->
      <slot name="invalidFeedback">
        <span>{{ invalidFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="description || $slots.description"
      class="block text-xs italic text-gray-600 dark:text-gray-500 py-1"
    >
      <!-- @slot Description slot content. This will override the `description` prop. -->
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
  /**
   * Determines the text of the label.
   */
  label: { type: String, default: null },
  /**
   * Optionally determine the value of the label's for attribute. Only
   * necessary if you aren't using the automatically generated
   * id.
   */
  labelFor: { type: String, default: null },
  /**
   * Determines the font weight of the label.
   */
  labelWeight: { type: String as PropType<'medium' | 'semibold' | 'bold'>, default: 'medium' },
  /**
   * Determines the description/helper text of the form field.
   */
  description: { type: String, default: null },
  /**
   * Determines the success message displayed when `state`
   * is `true`
   */
  validFeedback: { type: String, default: null },
  /**
   * Determines the failure message displayed when `state`
   * is `false`
   */
  invalidFeedback: { type: String, default: null },
  /**
   * Determines the valid/invalid state of the form group.
   * 
   * If `true`, the field is valid. If `false`, the field is invalid.
   * If `null`, there is no valid or invalid state associated with
   * the field.
   */
  state: { type: Boolean as PropType<boolean | null>, default: null },
  /**
   * Determines if the form group is required.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines if the form group is readonly.
   */
  readonly: { type: Boolean, default: false },
})

const root = ref()

const id = computed(() => {
  return props.labelFor || `${root.value?.id}_form-control`
})
</script>
