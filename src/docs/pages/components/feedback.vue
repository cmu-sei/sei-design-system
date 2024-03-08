<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Loading Skeleton
      </h2>
      <div>
        <SdsLoadingSkeleton
          height="h-48"
          width="w-1/5"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Loading Spinner
      </h2>
      <div>
        <SdsLoadingSpinner size="md" />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Toaster
      </h2>
      <div>
        <SdsButton
          kind="secondary"
          @click="addToast()"
        >
          Generate a toast
        </SdsButton>
        <SdsToaster
          v-model="modelValue"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = ref<any[]>([])

const addToast = () => {
  const index = Math.floor(Math.random() * Math.floor(4));
  const toasts = [
    {
      id: Math.random(),
      title: "Success Toast",
      text: "This is the content of this toast.",
      type: "success",
    },
    {
      id: Math.random(),
      title: "Info Toast",
      text: "This is the content of this toast.",
      type: "info",
    },
    {
      id: Math.random(),
      title: "Warning Toast",
      text: "This is the content of this toast.",
      type: "warning",
    },
    {
      id: Math.random(),
      title: "Danger Toast",
      text: "This is the content of this toast.",
      type: "danger",
      noAutoHide: true,
    },
  ];
  modelValue.value.unshift(toasts[index]);
}

defineOptions({
  name: 'FeedbackPage'
})

definePage({
  meta: {
    title: 'Feedback'
  }
})

useHead({
  title: 'Feedback'
})
</script>
