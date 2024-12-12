<template>
  <SdsLayoutSeiExternal
    :page="page"
    :show-footer="true"
    :remove-content-padding="true"
  >
    <template #default>
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
      <div class="flex flex-col">
        <div class="flex flex-col-reverse lg:flex-row gap-8 container mx-auto max-w-screen-xl p-4 md:p-8">
          <div class="flex flex-col gap-4 w-full lg:w-1/3">
            <SdsLayoutSeiExternalNav :page="page" />
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
        </div>
      </div>
    </template>
    <template #footer>
      <div class="py-8 text-white bg-gray-400">
        <div class="container px-4 mx-auto max-w-screen-xl space-y-6 lg:px-8">
          <ul class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <li>
              <a
                href="https://vulcoord.cert.org/VulReport/"
                class="hover:underline focus:underline focus:outline-none"
              >Report a Vulnerability to CERT/CC</a>
            </li>
            <li>
              <a
                href="https://sei.cmu.edu/subscribe-to-sei-bulletin/"
                class="hover:underline focus:underline focus:outline-none"
              >Subscribe to SEI Bulletin</a>
            </li>
            <li>
              <a
                href="https://sei.cmu.edu/legal/request-permission-to-use-sei-material"
                class="hover:underline focus:underline focus:outline-none"
              >Request Permission to Use SEI Materials</a>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </SdsLayoutSeiExternal>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutExternalPage'
})

definePage({
  meta: { title: 'Layout External' }
})

const page = {
  organization: 'Page Organization',
  nav: [
    {
      title: 'Section 1',
      items: [
        { title: 'Link title 1', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 2', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 3', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 4', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 5', url: 'https://designsystem.sei.cmu.edu' },
      ],
      seeAll: {
        title: 'See All title',
        url: 'https://designsystem.sei.cmu.edu'
      }
    },
    {
      title: 'Section 2',
      items: [
        { title: 'Link title 1', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 2', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 3', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 4', url: 'https://designsystem.sei.cmu.edu' },
        { title: 'Link title 5', url: 'https://designsystem.sei.cmu.edu' },
      ],
      seeAll: {
        title: 'See All title',
        url: 'https://designsystem.sei.cmu.edu'
      }
    }
  ]
}

useHead({
  title: 'Layout External'
})
</script>
