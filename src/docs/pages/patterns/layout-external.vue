<template>
  <SdsLayoutSeiExternal
    :page="{ organization: 'Page Organization' }"
    :show-masthead="true"
    :remove-content-padding="true"
  >
    <template #default>
      <div class="container mx-auto py-8 px-4 md:px-8">
        <p class="text-gray-900">
          Page description
        </p>
      </div>
    </template>
    <template #masthead>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hidden"
      >
        <symbol
          id="fa6-solid-caret-right"
          viewBox="0 0 256 512"
        >
          <title>caret-right</title>
          <path
            fill="currentColor"
            d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9S63.9 115 63.9 128v256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
          />
        </symbol>
      </svg>
      <section class="flex flex-col-reverse lg:flex-row gap-8 container mx-auto p-4 md:p-8">
        <div class="flex flex-col gap-4 w-full lg:w-1/3">
          <div class="bg-gray-50 p-4 flex flex-col gap-2">
            <h3 class="text-xl text-gray-400">
              Section 1
            </h3>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 1</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 2</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 3</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 4</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 5</a>
            <hr>
            <a
              href="#"
              class="text-gray-600 uppercase font-bold inline-flex"
            >
              <span>See all titles </span>
              <svg
                width="15"
                height="24"
                class="flex flex-col justify-center py-1 ml-1"
              ><use href="#fa6-solid-caret-right" /></svg>
            </a>
          </div>
          <div class="bg-gray-50 p-4 flex flex-col gap-2">
            <h3 class="text-xl text-gray-400">
              Section 2
            </h3>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 1</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 2</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 3</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 4</a>
            <a
              href="#"
              class="text-red-600 w-full"
            >Link title 5</a>
            <hr>
            <a
              href="#"
              class="text-gray-600 uppercase font-bold inline-flex"
            >
              <span>See all titles </span>
              <svg
                width="15"
                height="24"
                class="flex flex-col justify-center py-1 ml-1"
              ><use href="#fa6-solid-caret-right" /></svg>
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-full lg:w-2/3">
          <h1 class="text-3xl text-gray-400">
            Page Title
          </h1>
          <h2 class="text-xl text-gray-400">
            Page Subtitle
          </h2>
          <p class="text-gray-900">
            Page description
          </p>
        </div>
      </section>
    </template>
  </SdsLayoutSeiExternal>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

/* Automatic meta tag setup per-page */
router.beforeResolve((to, _from) => {
  document.title = to.meta.title || "Default Title | SDS Boilerplate"
  to.meta.metaTags?.forEach(tag => {
    let tags = document.getElementsByTagName('meta') ?? [];
    for (let oldTag of tags) {
      if (oldTag.name === tag.name) oldTag.remove()
    }
    let meta = document.createElement('meta')
    if ('name' in tag) {
      meta.name = tag.name
      meta.content = tag.content
    }
    if ('property' in tag) {
      meta.property = tag.name
      meta.content = tag.content
    }
    document.head.appendChild(meta)
  })
})

defineOptions({
  name: 'LayoutExternalPage'
})

definePage({
  meta: {
    title: 'Layout External'
  }
})

useHead({
  title: 'Layout External'
})
</script>
