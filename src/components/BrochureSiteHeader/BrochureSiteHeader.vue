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
          class="text-sm lg:text-base font-semibold text-gray-500 wrap-break-words"
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
              class="text-sm lg:text-base font-semibold text-gray-500 wrap-break-words"
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
          <div
            v-for="colKey in ['col_1', 'col_2', 'col_3']"
            :key="colKey"
            class="flex flex-col"
          >
            <template
              v-for="item in getLinkColumn(slotProps?.content ?? panel.content, colKey)"
              :key="item.key"
            >
              <SdsNavigationItem
                :label="item.label"
                :href="item.href"
              />
            </template>
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
            class="text-sm font-semibold text-gray-500 wrap-break-words"
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
          :type="item.content ? 'slide' : 'simple'"
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
            <SdsNavigationItem
              v-for="link in getLinkColumn(item.content as Record<string, unknown>, colKey)"
              :key="link.key"
              :label="link.label"
              :href="link.href"
            />
          </template>
        </div>
      </template>
    </SdsMobileMenu>
  </header>
</template>

<script setup lang="ts">
import type { MegaMenuItem } from '../MegaMenu/MegaMenu.vue'
import type { MobileMenuItem } from '../MobileMenu/MobileMenu.vue'
import SdsMobileMenu from '../MobileMenu/MobileMenu.vue'
import SdsNavigationItem from '../NavigationItem/NavigationItem.vue'
import BrochureSiteWordmark from "../BrochureSiteWordmark/BrochureSiteWordmark.vue";

interface BrochureSiteHeaderProps {
  organization?: string;
  nav?: MegaMenuItem<Record<string, unknown>>[];
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

defineOptions({
  name: 'SdsBrochureSiteHeader'
})

const props = withDefaults(defineProps<BrochureSiteHeaderProps>(), {
  organization: '',
  nav: () => [],
  mobileBreakpoint: '2xl'
})

const showMobileMenu = ref(false)

const megamenu = ref(props.nav ?? [])

type LinkItem = { key: string; label: string; href: string; type?: string }

const getLinkColumn = (content: Record<string, unknown> | undefined, key: string): LinkItem[] => {
  return (content?.[key] as LinkItem[] | undefined) ?? []
}

const logoClass = computed(() =>
  megamenu.value.length ? `flex ${props.mobileBreakpoint}:hidden flex-col justify-center py-4` : 'flex flex-col justify-center py-4'
)

const megamenuClass = computed(() =>
  megamenu.value.length ? `hidden ${props.mobileBreakpoint}:flex -mb-0.5` : 'hidden'
)

const hamburgerClass = computed(() =>
  megamenu.value.length ? `flex ${props.mobileBreakpoint}:hidden ml-auto items-center cursor-pointer p-2` : 'hidden'
)

const mobileMenus = computed<MobileMenuItem[]>(() =>
  props.nav.map(item => ({
    ...item,
    type: item.href ? undefined : 'slide' as const,
  }))
)
</script>

<style>
nav[data-id="sds-megamenu"] {
  & > div:first-child {
    height: 100%;
    padding: 0;

    div[role="menu"] {
      height: 100%;
    }
  }
  [id^="sds-megamenu__top-link"] {
    &:first-child {
      border: none;
    }
    margin-top: 0;
    margin-bottom: 0;
    &:not(:first-child) {
      position: relative;
      bottom: -2px;
    }
  }
}
</style>
