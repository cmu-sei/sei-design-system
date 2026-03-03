<template>
  <Component
    :is="el"
    :id="id"
    ref="root"
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
      class="flex font-semibold text-gray-900 dark:text-gray-50"
      :class="{
        'opacity-50 pointer-events-none select-none': disabled,
        'gap-1 items-center': labelPosition === 'top',
        'place-content-start': labelAlignment === 'left' && labelPosition === 'top',
        'place-content-center': labelAlignment === 'center' && labelPosition === 'top',
        'place-content-end': labelAlignment === 'right' && labelPosition === 'top',
        'flex-col place-content-start': labelPosition === 'left',
        'text-left': labelAlignment === 'left' && labelPosition === 'left',
        'text-center': labelAlignment === 'center' && labelPosition === 'left',
        'text-right': labelAlignment === 'right' && labelPosition === 'left',
        'mt-0': labelMargin === 0,
        'mt-0.5': labelMargin === 0.5,
        'mt-1': labelMargin === 1,
        'mt-1.5': labelMargin === 1.5,
        'mt-2': labelMargin === 2,
        'mt-2.5': labelMargin === 2.5,
        'mt-3': labelMargin === 3,
        'mt-3.5': labelMargin === 3.5,
        'mt-4': labelMargin === 4,
        'my-4': labelMargin === 'auto',
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
        class="font-normal italic text-gray-600 dark:text-gray-400 text-xs"
      >(optional)</span>
    </Component>
    <div class="grow">
      <!-- @slot Default slot content. This is where you add the form field. @binding id, valid, invalid, disabled, required, readonly. -->
      <div v-if="$slots.default">
        <slot
          :id="id"
          :valid="state === true"
          :invalid="state === false"
          :disabled="disabled"
          :required="required"
          :readonly="readonly"
        />
      </div>
      <p
        v-if="(helperText || $slots.helperText) && !disabled"
        :aria-hidden="disabled ? true : undefined"
        class="block text-xs italic text-gray-600 dark:text-gray-400 pt-1"
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
        v-if="(state && (validFeedback || $slots.validFeedback)) && !disabled"
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
        v-if="(state === false && (invalidFeedback || $slots.invalidFeedback)) && !disabled"
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
interface FormGroupProps {
  /**
   * Determines whether to render the component as a fieldset with a legend or
   * a div with a label.
   */
  el?: 'div' | 'fieldset';
  /**
   * Determines whether to display the required/optional labeling.
   */
  showMarker?: boolean;
  /**
   * Determines the text of the label.
   */
  label?: string | null;
  /**
   * Optionally determine the value of the label's for attribute. Only
   * necessary if you aren't using the automatically generated
   * id and `el` equals `div`.
   */
  labelFor?: string | null;
  /**
   * Determines the alignment of the label.
   */
  labelAlignment?: 'left' | 'center' | 'right';
  /**
   * Determines the width of the label.
   */
  labelWidth?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 'auto';
  /**
   * Determines the top margin of the label.
   */
  labelMargin?: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 'auto' | null;
  /**
   * Determines the display style of the form group.
   */
  labelPosition?: 'left' | 'top';
  /**
   * Determines the helper text of the form field.
   */
  helperText?: string | null;
  /**
   * Determines the success message displayed when `state`
   * is `true`
   */
  validFeedback?: string | null;
  /**
   * Determines the failure message displayed when `state`
   * is `false`
   */
  invalidFeedback?: string | null;
  /**
   * Determines the valid/invalid state of the form group.
   * 
   * If `true`, the field is valid. If `false`, the field is invalid.
   * If `null`, there is no valid or invalid state associated with
   * the field.
   */
  state?: boolean | null;
  /**
   * Determines if the form group is required.
   */
  required?: boolean;
  /**
   * Determines if the form group is readonly.
   */
  readonly?: boolean;
  /**
   * Determines whether the form group is disabled or not.
   */
  disabled?: boolean;
}

defineOptions({
  name: 'SdsFormGroup'
})

const props = withDefaults(defineProps<FormGroupProps>(), {
  el: 'div',
  showMarker: false,
  label: null,
  labelFor: null,
  labelAlignment: 'left',
  labelWidth: 'auto',
  labelMargin: null,
  labelPosition: 'top',
  helperText: null,
  validFeedback: null,
  invalidFeedback: null,
  state: null,
  required: false,
  readonly: false,
  disabled: false,
})

const root = ref()

const id = computed(() => {
  return props.labelFor || useId()
})
</script>
