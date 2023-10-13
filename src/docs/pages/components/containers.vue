<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Modal
      </h2>
      <div>
        <SdsButton
          variant="default"
          @click="showModal = !showModal"
        >
          Launch a modal
        </SdsButton>
        <SdsModal
          v-model="showModal"
          size="md"
        >
          <template #title>
            Modal title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsModal>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Panel
      </h2>
      <div>
        <SdsButton
          variant="default"
          @click="showPanel = !showPanel"
        >
          Launch a panel
        </SdsButton>
        <SdsPanel
          v-model="showPanel"
          side="right"
          size="md"
        >
          <template #title>
            Panel title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsPanel>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Section
      </h2>
      <div>
        <SdsSection type="accented">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false)
const showPanel = ref(false)
defineOptions({
  name: 'ContainersPage'
})

definePage({
  meta: {
    title: 'Containers'
  }
})

useHead({
  title: 'Containers'
})
</script>