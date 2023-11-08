<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Button
      </h2>
      <div>
        <SdsButton kind="secondary">
          Button
        </SdsButton>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Dropdown
      </h2> 
      <div>
        <sds-dropdown
          title="Dropdown"
        >
          <sds-dropdown-header>
            <p>Signed in as</p>
            <p class="font-semibold truncate">
              tom@example.com
            </p>
          </sds-dropdown-header>
          <sds-dropdown-divider />
          <sds-dropdown-item
            href="/"
            disabled
          >
            Guide
          </sds-dropdown-item>
          <sds-dropdown-item href="#">
            Support
          </sds-dropdown-item>
          <sds-dropdown-item href="#">
            License
          </sds-dropdown-item>
          <sds-dropdown-divider />
          <form
            method="POST"
            action="#"
          >
            <sds-dropdown-item
              tag="button"
              type="submit"
            >
              Sign out
            </sds-dropdown-item>
          </form>
        </sds-dropdown>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Filter By Dropdown
      </h2>
      <div>
        <sds-filter-by-dropdown
          v-model="filterBy.options"
          :title="filterByBtnText"
          enable-filter
          enable-sort-options
          @update:model-value="filtered"
        />
        <p class="mt-4">
          Selected: {{ filterBy.idsText }}
        </p>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Floating Action Button
      </h2>
      <div>
        <sds-floating-action-button
          v-model="fab.tabs"
          show-indicator
          @open="fab.open"
          @close="fab.close"
        >
          <template #tab-icon(tab1)>
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
          </template>
          <template #trigger-icon>
            <img
              src="https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png"
              alt="About SEI"
            >
          </template>
          <template #tab(tab1)="{ tab }">
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
          </template>
          <template #tab(tab2)>
            <p>Hello, there! This is tab 2.</p>
          </template>
          <template #tab(tab3)>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
          </template>
          <template #tab(tab4)>
            <p>Hello, there! This is tab 4.</p>
          </template>
        </sds-floating-action-button>
        Floating Action Button in bottom right corner.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filterBy = reactive({
  options: [
    { id: 1, text: "Option 1", selected: false },
    { id: 2, text: "Option 2", selected: false },
    { id: 3, text: "Option 3", selected: false },
    { id: 4, text: "Option 4", selected: false },
    { id: 5, text: "Option 5", selected: false },
    { id: 6, text: "Option 6", selected: false },
    { id: 7, text: "Option 7", selected: false },
    { id: 8, text: "Option 8", selected: false },
    { id: 9, text: "Option 9", selected: false },
    { id: 10, text: "Option 10", selected: false },
    { id: 11, text: "Option 11", selected: false },
    { id: 12, text: "Option 12", selected: false },
    { id: 13, text: "Option 13", selected: false },
    { id: 14, text: "Option 14", selected: false },
    { id: 15, text: "Option 15", selected: false },
    { id: 16, text: "Option 16", selected: false },
    { id: 17, text: "Option 17", selected: false },
    { id: 18, text: "Option 18", selected: false },
    { id: 19, text: "Option 19", selected: false },
    { id: 20, text: "Option 20", selected: false },
  ],
  idsText: null
})

const filterBySelectedOptions = computed(() => {
  return filterBy.options.filter((i) => i.selected);
})

const filterByBtnText = computed(() => {
  return filterBySelectedOptions.value.length > 0
    ? "One or more options selected"
    : "No options are selected";
})

const filtered = (options: any) => {
  filterBy.idsText = options
    .filter((i: any) => i.selected)
    .map((i: any) => i.id)
    .join(", ");
}

const fab = reactive({
  tabs: [
    { key: "tab1", tabName: "Tab 1 is the title", title: "Active Tab 1", active: true },
    { key: "tab2", tabName: "Tab 2", title: "Active Tab 2", active: false, iconSrc: "https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png" },
    { key: "tab3", tabName: "Tab 3", title: "Active Tab 3", active: false },
    { key: "tab4", tabName: "Tab 4", title: "Active Tab 4", active: false }
  ],
  open() {
    console.log("open");
  },
  close() {
    console.log("close");
  },
})

defineOptions({
  name: 'ButtonsPage'
})

definePage({
  meta: {
    title: 'Buttons'
  }
})

useHead({
  title: 'Buttons'
})
</script>