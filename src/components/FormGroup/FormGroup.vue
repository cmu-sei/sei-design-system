<template>
  <Component
    :is="el"
    ref="root"
    v-uid
    :disabled="el === 'fieldset' ? disabled : undefined"
    data-id="sds-form-group"
    class="w-full"
  >
    <Component
      :is="el === 'div' ? 'label' : 'legend'"
      :for="el === 'div' ? id : undefined"
      :class="{
        'font-medium': labelWeight === 'medium',
        'font-semibold': labelWeight === 'semibold',
        'font-bold': labelWeight === 'bold',
      }"
      class="flex gap-1 items-center mb-2"
    >
      <!-- @slot Label slot content. This will override the `label` prop. @binding label. -->
      <slot
        name="label"
        :label="label"
      >
        <span>{{ label }}</span>
      </slot>
      <span
        v-if="required"
        class="font-normal text-red-500 dark:text-red-300 text-xs"
      >* required</span>
    </Component>
    <p
      v-if="descriptionPosition === 'top' && (description || $slots.description)"
      class="block text-xs italic text-gray-600 dark:text-gray-500 pb-2"
    >
      <!-- @slot Description slot content. This will override the `description` prop. @binding description. -->
      <slot
        name="description"
        :description="description"
      >
        <span>{{ description }}</span>
      </slot>
    </p>
    <!-- @slot Default slot content. This is where you add the form field. @binding id, valid, invalid, disabled, required, readonly. -->
    <slot
      :id="id"
      :valid="state"
      :invalid="state === false"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
    />
    <p
      v-if="state && (validFeedback || $slots.validFeedback)"
      class="block text-xs italic text-green-700 dark:text-green-300 py-1"
    >
      <!-- @slot Valid Feedback slot content. This will override the `validFeedback` prop. @binding validFeedback. -->
      <slot
        name="validFeedback"
        :valid-feedback="validFeedback"
      >
        <span>{{ validFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="state === false && (invalidFeedback || $slots.invalidFeedback)"
      class="block text-xs italic text-red-500 dark:text-red-300 py-1"
    >
      <!-- @slot Invalid Feedback slot content. This will override the `invalidFeedback` prop. @binding invalidFeedback. -->
      <slot
        name="invalidFeedback"
        :invalid-feedback="invalidFeedback"
      >
        <span>{{ invalidFeedback }}</span>
      </slot>
    </p>
    <p
      v-else-if="descriptionPosition === 'bottom' && (description || $slots.description)"
      class="block text-xs italic text-gray-600 dark:text-gray-500 py-1"
    >
      <!-- @slot Description slot content. This will override the `description` prop. @binding description. -->
      <slot
        name="description"
        :description="description"
      >
        <span>{{ description }}</span>
      </slot>
    </p>
  </Component>
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
   * Determines whether to render the component as a fieldset with a legend or
   * a div with a label.
   */
  el: { type: String as PropType<'div' | 'fieldset'>, default: 'div' },
  /**
   * Determines the text of the label.
   */
  label: { type: String as PropType<string | null>, default: null },
  /**
   * Optionally determine the value of the label's for attribute. Only
   * necessary if you aren't using the automatically generated
   * id and `el` equals `div`.
   */
  labelFor: { type: String as PropType<string | null>, default: null },
  /**
   * Determines the font weight of the label.
   */
  labelWeight: { type: String as PropType<'medium' | 'semibold' | 'bold'>, default: 'medium' },
  /**
   * Determines the description/helper text of the form field.
   */
  description: { type: String as PropType<string | null>, default: null },
  /**
   * Determines the description/helper text of the form field.
   */
  descriptionPosition: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' },
  /**
   * Determines the success message displayed when `state`
   * is `true`
   */
  validFeedback: { type: String as PropType<string | null>, default: null },
  /**
   * Determines the failure message displayed when `state`
   * is `false`
   */
  invalidFeedback: { type: String as PropType<string | null>, default: null },
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
  /**
   * Determines whether the form group is disabled or not.
   */
  disabled: { type: Boolean, default: false },
})

const root = ref()

const id = computed(() => {
  return props.labelFor || `${root.value?.id}_form-control`
})
</script>
