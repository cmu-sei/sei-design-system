<template>
  <sds-layout-app
    v-model="collapsed"
    :app-name="appName"
    :app-suite="appSuite"
    :enable-collapsible-sidebar="enableCollapsibleSidebar"
    :page-title="pageTitle"
    :sidebar-navigation-items="sidebarNavigationItems"
    @navigate="navigate"
  >
    <template #suite-header>
      <sds-dropdown
        title="Dropdown"
        type="dark"
        :offset="8"
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
      <sds-button
        variant="default"
        @click="toggleDarkMode"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="h-5 w-4"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775c28.27-34.831-2.558-85.722-46.249-77.401c-82.348 15.683-158.272-47.268-158.272-130.792c0-48.424 26.06-92.292 67.434-115.836c38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256c0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478c-54.76 31.163-91.693 90.042-91.693 157.554c0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"
          />
        </svg>
        <span class="sr-only">Toggle dark mode</span>
      </sds-button>
    </template>
    <template #default>
      <RouterView />
    </template>
  </sds-layout-app>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppPage'
})

useHead({
  titleTemplate: '%s %separator %siteName',
  templateParams: { separator: '|', siteName: 'SDS Playground' }
})

const router = useRouter()
const route = useRoute()

const collapsed = ref(true)
const appSuite = ref('SDS')
const appName = ref('Playground')
const pageTitle = computed(() => route.meta.title)
const enableCollapsibleSidebar = ref(true)
const sidebarNavigationItems = computed(() => [
  {id: 1, title: 'Home', active: route.fullPath === '/', href: '/'},
  {
    id: 2,
    title: 'Components',
    items: [
      {id: 1, title: 'Buttons', active: route.fullPath === '/components/buttons', href: '/components/buttons'},
      {id: 2, title: 'Containers', active: route.fullPath === '/components/containers', href: '/components/containers'},
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
      {id: 1, title: 'Form Group', active: route.fullPath === '/patterns/form-group', href: '/patterns/form-group'},
    ]
  },
  {
    id: 4,
    title: 'CSS',
    items: [
      { id: 1, title: 'CSS Components', active: route.fullPath === '/css/css-components', href: '/css/css-components'}
    ]
  }
])

const toggleDarkMode = () => {
  document.body.classList.toggle('dark')
}

const navigate = ({group, item, event}: any) => {
  event.preventDefault()
  router.push({ path: item.href })
}
</script>
