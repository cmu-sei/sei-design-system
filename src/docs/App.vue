<template>
  <sds-application
    v-model="collapsed"
    :app-name="appName"
    :app-suite="appSuite"
    app-url="#"
    app-suite-url="#"
    :enable-collapsible-sidebar="enableCollapsibleSidebar"
    :page-title="pageTitle"
    :sidebar-navigation-items="(sidebarNavigationItems as ApplicationSidebarNavItem[])"
    @navigate="navigate"
  >
    <template #user-section>
      <sds-dropdown
        title="Ghost"
        kind="ghost"
        block
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
        <sds-dropdown-item
          href="#"
          active
        >
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
    </template>
    <template #page-header>
      <SdsActionButton
        kind="ghost"
        size="sm"
        @click="togglePlaidTheme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="32"
          viewBox="0 0 384 512"
          class="h-4 w-auto"
        >
          <path
            fill="currentColor"
            d="M162.4 6c-1.5-3.6-5-6-8.9-6h-19c-3.9 0-7.5 2.4-8.9 6l-20.7 51.7c-3.2 8-14.6 8-17.8 0L66.4 6c-1.5-3.6-5-6-8.9-6H48C21.5 0 0 21.5 0 48v208h384V48c0-26.5-21.5-48-48-48H230.5c-3.9 0-7.5 2.4-8.9 6l-20.7 51.7c-3.2 8-14.6 8-17.8 0zM0 288v32c0 35.3 28.7 64 64 64h64v64c0 35.3 28.7 64 64 64s64-28.7 64-64v-64h64c35.3 0 64-28.7 64-64v-32zm192 144a16 16 0 1 1 0 32a16 16 0 1 1 0-32"
          />
        </svg>
        <span>{{ isPlaidTheme ? 'Plaid' : 'Forge' }} theme</span>
      </SdsActionButton>
      <SdsActionButton
        kind="ghost"
        size="sm"
        @click="toggleDarkMode"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="h-4 w-auto"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775c28.27-34.831-2.558-85.722-46.249-77.401c-82.348 15.683-158.272-47.268-158.272-130.792c0-48.424 26.06-92.292 67.434-115.836c38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256c0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478c-54.76 31.163-91.693 90.042-91.693 157.554c0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"
          />
        </svg>
        <span class="sr-only">Toggle dark mode</span>
      </SdsActionButton>
    </template>
    <template #default>
      <RouterView />
    </template>
    <template #action-bar>
      <p class="grow pb-2 md:pb-0 text-center md:text-left">
        Hello world
      </p>
      <button class="btn btn-ghost btn-white order-3 md:order-2 block">
        Ghost button
      </button>
      <button class="btn btn-primary btn-white order-2 md:order-3 block">
        Primary button
      </button>
    </template>
    <template #footer-top>
      Footer top
    </template>
    <template #footer-middle>
      Footer middle
    </template>
    <template #footer-right>
      Footer right
    </template>
  </sds-application>
</template>

<script setup lang="ts">
import { ApplicationSidebarNavItem } from '../components/Application/Application.vue';

defineOptions({
  name: 'AppPage'
})

useHead({
  titleTemplate: '%s | SDS Playground',
})

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const appSuite = ref('SDS')
const appName = ref('Playground')
const pageTitle = computed(() => route.meta.title as string)
const enableCollapsibleSidebar = ref(true)
const sidebarNavigationItems = computed(() => [
  {id: 1, title: 'Home', active: route.fullPath === '/', href: '/'},
  {
    id: 2,
    title: 'Components',
    items: [
      {id: 1, title: 'Buttons', active: route.fullPath === '/components/buttons', href: '/components/buttons', badgeCount: 10},
      {id: 2, title: 'Containers', active: route.fullPath === '/components/containers', href: '/components/containers', badgeCount: 2},
      {id: 3, title: 'Data Visualization', active: route.fullPath === '/components/data-visualization', href: '/components/data-visualization'},
      {id: 4, title: 'Date & Time', active: route.fullPath === '/components/date-and-time', href: '/components/date-and-time'},
      {id: 4, title: 'Feedback', active: route.fullPath === '/components/feedback', href: '/components/feedback'},
      {id: 4, title: 'Inputs', active: route.fullPath === '/components/inputs', href: '/components/inputs'},
      {id: 4, title: 'Navigation', active: route.fullPath === '/components/navigation', href: '/components/navigation'},
      {id: 4, title: 'Utility', active: route.fullPath === '/components/utility', href: '/components/utility'},
    ]
  },
  {
    id: 3,
    title: 'Patterns',
    items: [
      {id: 1, title: 'Data Table', active: route.fullPath === '/patterns/data-table', href: '/patterns/data-table'},
      {id: 2, title: 'Form Group', active: route.fullPath === '/patterns/form-group', href: '/patterns/form-group'},
      {id: 3, title: 'Layout External', active: route.fullPath === '/patterns/layout-external', href: '/patterns/layout-external'},
    ]
  },
  {
    id: 4,
    title: 'CSS',
    items: [
      { id: 1, title: 'CSS Components', active: route.fullPath === '/css/css-components', href: '/css/css-components'},
      { id: 2, title: 'Tailwind Typography', active: route.fullPath === '/css/typography', href: '/css/typography'},
      { id: 3, title: 'Table Prose', active: route.fullPath === '/css/table-prose', href: '/css/table-prose'},
    ]
  }
])

const toggleDarkMode = () => {
  document.body.classList.toggle('dark')
}

const isPlaidTheme = ref(false)

const togglePlaidTheme = () => {
  isPlaidTheme.value = !isPlaidTheme.value
  if (isPlaidTheme.value) {
    document.body.classList.add('sds-theme-plaid')
    document.body.classList.remove('sds-theme-forge')
  } else {
    document.body.classList.add('sds-theme-forge')
    document.body.classList.remove('sds-theme-plaid')
  }
}

onMounted(() => {
  if (isPlaidTheme.value) {
    document.body.classList.add('sds-theme-plaid')
    document.body.classList.remove('sds-theme-forge')
  } else {
    document.body.classList.add('sds-theme-forge')
    document.body.classList.remove('sds-theme-plaid')
  }
})

const navigate = ({item, event}: { item: ApplicationSidebarNavItem, event: Event }) => {
  event.preventDefault()
  router.push({ path: item.href })
}
</script>
