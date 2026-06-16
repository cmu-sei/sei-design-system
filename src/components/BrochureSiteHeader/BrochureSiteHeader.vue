<template>
  <header
    data-id="sds-brochure-site-header"
    class="border-b-2 border-gray-100 dark:border-gray-800"
  >
    <div class="bg-red-600">
      <div class="container pt-4 pb-2 mx-auto">
        <a
          href="https://www.cmu.edu/"
          target="_self"
          class="block w-80"
        >
          <brochure-site-wordmark class="text-white fill-current h-5.5" />
          <span class="sr-only">Carnegie Mellon University</span>
        </a>
      </div>
    </div>
    <div class="text-gray-700 bg-white dark:bg-gray-900 dark:text-white flex flex-row container mx-auto">
      <div :class="logoClass">
        <span class="sr-only">Home</span>
        <a
          href="https://sei.cmu.edu"
          class="text-nowrap hover:[&_span]:text-red-500 text-xl sm:text-2xl 2xl:text-3xl font-extralight"
        >
          Software Engineering Institute
        </a>
        <span
          v-if="organization"
          :class="orgClass"
        >
          {{ organization }}
        </span>
      </div>
      <SdsMegaMenu
        v-if="megamenu"
        v-model="megamenu"
        :class="megamenuClass"
      >
        <template #link(home)>
          <div class="flex flex-col justify-center py-4">
            <span class="sr-only">Home</span>
            <a
              href="https://sei.cmu.edu"
              class="text-nowrap hover:[&_span]:text-red-500 text-xl sm:text-2xl 2xl:text-3xl font-extralight"
            >
              Software Engineering Institute
            </a>
            <span
              v-if="organization"
              :class="orgClass"
            >
              {{ organization }}
            </span>
          </div>
        </template>
        <template
          v-for="panel in megamenu"
          :key="panel.key"
          #[`panel(${panel.key})`]="slotProps"
        >
          <div class="flex flex-col lg:flex-row relative">
            <div
              v-for="colKey in ['col_1', 'col_2', 'col_3']"
              :key="colKey"
              class="flex flex-col lg:col-span-1 lg:w-full lg:**:[[id='sds-navigationitem']]:w-full"
            >
              <template
                v-for="item in getLinkColumn(slotProps?.content ?? panel.content, colKey)"
                :key="item.key"
              >
                <SdsMegaMenuItem
                  :label="item.label"
                  :href="item.href"
                  :type="getMegaMenuItemType(item.type)"
                />
              </template>
            </div>
          </div>
        </template>
      </SdsMegaMenu>
      <button
        :class="hamburgerClass"
        aria-label="Open mobile menu"
        @click="showMobileMenu = true"
      >
        <IconFa7SolidBars class="h-6 w-6 scale-x-150 text-gray-700 dark:text-white" />
      </button>
    </div>
    <SdsMobileMenu
      v-model="showMobileMenu"
      :mobile-menus="mobileMenus"
      side="right"
      size="md"
      aria-label="Mobile navigation"
    >
      <template #title>
        <div class="flex flex-col">
          <a
            href="https://sei.cmu.edu"
            class="text-nowrap hover:[&_span]:text-red-500 text-xl font-extralight"
          >
            Software Engineering Institute
          </a>
          <span
            v-if="organization"
            :class="orgClass"
          >
            {{ organization }}
          </span>
        </div>
      </template>
      <template #default="{ navigate }">
        <SdsNavigationItem
          v-for="item in nav"
          :key="item.key"
          :label="item.title"
          :href="item.href ?? null"
          :external="item.external"
          :type="getNavigationItemType(item.type)"
          :on-click="(e: Event) => {
            if (item.onClick) {
              item.onClick(item, e)
            } else if (item.content) {
              navigate(item.key)
            }
          }"
        />
      </template>
      <template
        v-for="item, i in nav"
        :key="i"
        #[`panel(${item.key})`]="{ navigate }"
      >
        <SdsNavigationItem
          type="back"
          @click="navigate()"
        />
        <div
          v-if="item.content"
          class="flex flex-col"
        >
          <template
            v-for="colKey in ['col_1', 'col_2', 'col_3']"
            :key="colKey"
          >
            <div
              v-for="link in getLinkColumn(item.content as Record<string, unknown>, colKey)"
              :key="link.key"
              :class="{
                'font-semibold': link.type === 'landing-page'
              }"
            >
              <SdsNavigationItem
                :label="link.label"
                :href="link.href"
              />
            </div>
          </template>
        </div>
      </template>
    </SdsMobileMenu>
  </header>
</template>

<script setup lang="ts">
import type { MegaMenuItem } from '../MegaMenu/MegaMenu.vue'
import type { MobileMenuItem } from '../MobileMenu/MobileMenu.vue'
import type { NavigationItemType } from '../NavigationItem/NavigationItem.vue'
import type { MegaMenuItemType } from '../MegaMenuItem/MegaMenuItem.vue'
import SdsMobileMenu from '../MobileMenu/MobileMenu.vue'
import SdsNavigationItem from '../NavigationItem/NavigationItem.vue'
import BrochureSiteWordmark from '../BrochureSiteWordmark/BrochureSiteWordmark.vue'

// * Navigation Item type for combined use in both MegaMenu and MobileMenu
type LinkItem = {
  key: string
  label: string
  href: string
  type?: MegaMenuItemType | NavigationItemType
}

interface BrochureSiteHeaderProps {
  /**
   * String matching the name of the organization to display in the header.
   */
  organization?: string;
  /**
   * An array of MegaMenuItem objects to display in the header navigation.
   */
  nav?: MegaMenuItem<Record<string, unknown>>[];
  /**
   * The breakpoint at which the full MegaMenu is replaced by a hamburger menu and mobile panel.
   */
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

defineOptions({
  name: 'SdsBrochureSiteHeader'
})

const props = withDefaults(defineProps<BrochureSiteHeaderProps>(), {
  organization: '',
  nav: () => [],
  mobileBreakpoint: 'xl'
})

const showMobileMenu = ref(false)

const megamenu = ref(props.nav ?? [])

const breakpointClasses = {
  sm: {
    logo: 'sm:hidden',
    megamenu: 'sm:flex',
    hamburger: 'sm:hidden'
  },
  md: {
    logo: 'md:hidden',
    megamenu: 'md:flex',
    hamburger: 'md:hidden'
  },
  lg: {
    logo: 'lg:hidden',
    megamenu: 'lg:flex',
    hamburger: 'lg:hidden'
  },
  xl: {
    logo: 'xl:hidden',
    megamenu: 'xl:flex',
    hamburger: 'xl:hidden'
  },
  '2xl': {
    logo: '2xl:hidden',
    megamenu: '2xl:flex',
    hamburger: '2xl:hidden'
  }
} as const

const activeBreakpointClasses = computed(() => breakpointClasses[props.mobileBreakpoint])

const getLinkColumn = (content: Record<string, unknown> | undefined, key: string): LinkItem[] => {
  return (content?.[key] as LinkItem[] | undefined) ?? []
}

const getMegaMenuItemType = (type: unknown): MegaMenuItemType | undefined => {
  return type as MegaMenuItemType | undefined
}

const getNavigationItemType = (type: unknown): NavigationItemType | undefined => {
  return type as NavigationItemType | undefined
}

const isValidMobileMenuType = (type: unknown): type is Exclude<NavigationItemType, 'simple'> => {
  return type === 'back' || type === 'expand' || type === 'slide' || type === 'title'
}

const logoClass = computed(() =>
  megamenu.value.length
    ? ['flex', activeBreakpointClasses.value.logo, 'flex-col', 'justify-center', 'py-4']
    : ['flex', 'flex-col', 'justify-center', 'py-4']
)

const megamenuClass = computed(() =>
  megamenu.value.length ?
    [
      'hidden',
      activeBreakpointClasses.value.megamenu,
      '-mb-0.5',
      '[&>div:first-child]:h-full',
      '[&>div:first-child]:p-0',
      '[&>div:first-child>div[role=menu]]:h-full',
      '[&>div>div>[role=menuitem]]:my-0',
      '[&>div>div>[role=menuitem]:first-child]:border-0',
      '[&>div>div>[role=menuitem]:not(:first-child)]:relative',
      '[&>div>div>[role=menuitem]:not(:first-child)]:-bottom-0.5',
    ] :
    ['hidden']
)

const hamburgerClass = computed(() =>
  megamenu.value.length
    ? ['flex', activeBreakpointClasses.value.hamburger, 'ml-auto', 'items-center', 'cursor-pointer', 'p-2']
    : ['hidden']
)

const orgClass = 'text-sm lg:text-base text-left font-semibold text-gray-500 wrap-break-words'

const mobileMenus = computed<MobileMenuItem[]>(() =>
  props.nav.map(item => {
    const navType = getNavigationItemType(item.type)
    return {
      ...item,
      // Only include 'type' if it's a valid MobileMenuItem type
      type: isValidMobileMenuType(navType) ? navType : undefined,
    }
  })
)
</script>
