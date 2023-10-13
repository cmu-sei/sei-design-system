<template>
  <Component
    :is="el"
    ref="root"
    v-uid
    :disabled="el === 'fieldset' ? disabled : undefined"
    data-id="sds-form-group"
    class="flex"
    :class="{
      'flex-col gap-2': labelPosition === 'top',
      'gap-4': labelPosition === 'left',
    }"
  >
    <legend
      v-if="el === 'fieldset'"
      class="sr-only"
    >
      <span>{{ label }}</span>
      <span
        v-if="required"
        :class="{
          'sr-only': !showMarker
        }"
      >* required</span>
      <span
        v-if="!required"
        :class="{
          'sr-only': !showMarker
        }"
      >(optional)</span>
    </legend>
    <Component
      :is="el === 'div' ? 'label' : 'span'"
      :for="el === 'div' ? id : undefined"
      :aria-hidden="el === 'fieldset' ? true : undefined"
      class="flex font-semibold"
      :class="{
        'gap-1 items-center': labelPosition === 'top',
        'place-content-start': labelAlignment === 'left' && labelPosition === 'top',
        'place-content-center': labelAlignment === 'center' && labelPosition === 'top',
        'place-content-end': labelAlignment === 'right' && labelPosition === 'top',
        'flex-col place-content-start mt-3': labelPosition === 'left',
        'text-left': labelAlignment === 'left' && labelPosition === 'left',
        'text-center': labelAlignment === 'center' && labelPosition === 'left',
        'text-right': labelAlignment === 'right' && labelPosition === 'left',
        'w-1/12': labelWidth === 1,
        'w-2/12': labelWidth === 2,
        'w-3/12': labelWidth === 3,
        'w-4/12': labelWidth === 4,
        'w-5/12': labelWidth === 5,
        'w-6/12': labelWidth === 6,
        'w-7/12': labelWidth === 7,
        'w-8/12': labelWidth === 8,
        'w-9/12': labelWidth === 9,
        'w-10/12': labelWidth === 10,
        'w-11/12': labelWidth === 11,
        'w-auto': labelWidth === 'auto',
      }"
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
        :class="{
          'sr-only': !showMarker
        }"
        class="font-normal text-red-500 dark:text-red-300 text-xs"
      >* required</span>
      <span
        v-if="!required"
        :class="{
          'sr-only': !showMarker
        }"
        class="font-normal italic text-gray-600 dark:text-gray-500 text-xs"
      >(optional)</span>
    </Component>
    <div class="grow">
      <!-- @slot Default slot content. This is where you add the form field. @binding id, valid, invalid, disabled, required, readonly. -->
      <div>
        <slot
          :id="id"
          :valid="state"
          :invalid="state === false"
          :disabled="disabled"
          :required="required"
          :readonly="readonly"
        />
      </div>
      <p
        v-if="helperText || $slots.helperText"
        class="block text-xs italic text-gray-600 dark:text-gray-500 pt-1"
      >
        <!-- @slot Helper Text slot content. This will override the `helperText` prop. @binding helperText. -->
        <slot
          name="helperText"
          :helper-text="helperText"
        >
          <span>{{ helperText }}</span>
        </slot>
      </p>
      <p
        v-if="state && (validFeedback || $slots.validFeedback)"
        class="block text-xs italic text-green-700 dark:text-green-300 pt-1"
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
        v-if="state === false && (invalidFeedback || $slots.invalidFeedback)"
        class="block text-xs italic text-red-500 dark:text-red-300 pt-1"
      >
        <!-- @slot Invalid Feedback slot content. This will override the `invalidFeedback` prop. @binding invalidFeedback. -->
        <slot
          name="invalidFeedback"
          :invalid-feedback="invalidFeedback"
        >
          <span>{{ invalidFeedback }}</span>
        </slot>
      </p>
    </div>
  </Component>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { Uid } from '@shimyshack/uid'

defineOptions({
  name: 'SdsFormGroup',
  directives: {
    uid: Uid,
  },
})

const props = defineProps({
  /**
   * Determines whether to render the component as a fieldset with a legend or
   * a div with a label.
   */
  el: { type: String as PropType<'div' | 'fieldset'>, default: 'div' },
  /**
   * Determines whether to display the required/optional labeling.
   */
  showMarker: { type: Boolean, default: false },
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
   * Determines the alignment of the label.
   */
  labelAlignment: { type: String as PropType<'left' | 'center' | 'right'>, default: 'left' },
  /**
   * Determines the width of the label.
   */
  labelWidth: { type: [Number, String] as PropType<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 'auto'>, default: 'auto' },
  /**
   * Determines the display style of the form group.
   */
  labelPosition: { type: String as PropType<'left' | 'top'>, default: 'top' },
  /**
   * Determines the helper text of the form field.
   */
  helperText: { type: String as PropType<string | null>, default: null },
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
