<template>
  <div
    data-id="sds-application"
    class="flex flex-col h-screen dark:text-gray-50"
  >
    <!-- Mobile header -->
    <header class="md:hidden my-auto p-3 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-2">
        <h1
          v-if="appSuite && !collapsed"
          class="hidden md:block grow"
        >
          <a
            v-if="appSuiteUrl"
            :href="appSuiteUrl"
            class="flex hover:underline"
            @click="navigate(null, { title: appSuite, href: appSuiteUrl }, $event)"
          >
            <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </a>
          <p
            v-else
            class="flex"
          >
            <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
            <span>{{ appSuite }}</span>
          </p>
        </h1>
      </div>
      <button
        v-if="appSuite || appName"
        ref="mobileMenuOpenBtn"
        aria-label="Open mobile menu"
        class="flex items-center md:hidden gap-1 focus:outline-hidden"
        @click="showMobileMenu = !showMobileMenu"
      >
        <IconFa7SolidBars
          class="text-black dark:text-white h-6 w-6"
        />
        <span class="flex items-center">
          <span
            v-if="appSuitePrefix"
            class="text-red-600 dark:text-red-400 font-bold"
          >{{ appSuitePrefix }}</span>
          <span
            v-if="appSuite"
          >{{ appSuite }}</span>
        </span>
      </button>
    </header>

    <div class="flex grow shrink-0">
      <!-- Mobile sidebar close section -->
      <transition
        enter-active-class="transition-opacity ease-linear duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="showMobileMenu"
          class="bg-black/40 fixed inset h-screen w-screen z-50 md:hidden"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span class="sr-only">Toggle mobile menu</span>
        </button>
      </transition>

      <!-- Mobile sidebar -->
      <transition
        enter-active-class="transition-transform ease-linear duration-150"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform ease-linear duration-150"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="showMobileMenu"
          ref="mobileSidebarContainer"
          aria-label="mobile sidebar"
          class="md:hidden fixed w-2/3 z-50 bg-white dark:bg-gray-950 shrink-0 border-r border-gray-200 dark:border-gray-800"
          @keydown="trapFocus"
        >
          <button
            ref="mobileMenuCloseBtn"
            class="sr-only"
            @click="showMobileMenu = !showMobileMenu"
          >
            <span class="sr-only">Toggle mobile menu</span>
          </button>
          <div class="h-screen flex flex-col sticky top-0">
            <div class="overflow-y-auto grow overscroll-contain">
              <div 
                v-if="appName"
                class="px-3"
              >
                <div class="border-b border-gray-100 dark:border-gray-800 mb-3">
                  <p
                    class="flex gap-2 py-3"
                  >
                    <!-- @slot App icon content. @binding classList -->
                    <slot
                      name="app-icon"
                      class-list="flex items-center w-4 h-4 my-auto shrink-0"
                    >
                      <span
                        v-if="!hideAppIcon"
                        class="flex items-center w-4 h-4 my-auto shrink-0"
                      >
                        <template v-if="appUrl">
                          <a
                            :href="appUrl"
                            @click="navigate(null, { title: appName, href: appUrl }, $event)"
                          >
                            <img
                              v-if="appIconUrl"
                              :src="appIconUrl"
                              :alt="appName"
                              class="w-4 h-4"
                            >
                            <IconFa7SolidCubes
                              v-else
                              class="w-4 h-4 text-blue-400"
                            />
                            <span class="sr-only">{{ appName }}</span>
                          </a>
                        </template>
                        <template v-else>
                          <img
                            v-if="appIconUrl"
                            :src="appIconUrl"
                            :alt="appName"
                            class="w-4 h-4"
                          >
                          <IconFa7SolidCubes
                            v-else
                            class="w-4 h-4 text-blue-400"
                          />
                          <span class="sr-only">{{ appName }}</span>
                        </template>
                      </span>
                    </slot>
                    <a
                      v-if="appUrl && appName"
                      :href="appUrl"
                      class="my-auto hover:underline"
                      @click="navigate(null, { title: appName, href: appUrl }, $event)"
                    >
                      {{ appName }}
                    </a>
                    <span
                      v-else-if="appName"
                      class="my-auto"
                    >
                      {{ appName }}
                    </span>
                  </p>
                </div>
              </div>
              <nav
                v-if="sidebarNavigationItems.length > 0"
                class="grid grid-cols-1 pb-24"
                aria-label="Mobile sidebar"
              >
                <!-- @slot Mobile sidebar navigation content wrapper. @binding items, collapsed -->
                <slot
                  name="mobile-sidebar-navigation"
                  :items="sidebarNavigationItems"
                  :collapsed="collapsed"
                >
                  <template
                    v-for="item in sidebarNavigationItems"
                    :key="item.id"
                  >
                    <template v-if="item.items">
                      <button
                        :href="item.href"
                        class="flex items-center relative w-full gap-2 pl-2 px-3 py-2 border-l-4"
                        :class="{
                          'border-transparent text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800': !itemsGroupIsActive(item) || showItemsGroup(item),
                          'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': itemsGroupIsActive(item) && !showItemsGroup(item)
                        }"
                        @click="toggleItemsGroup(item)"
                      >
                        <!-- @slot Mobile sidebar navigation item icon content. @binding item, classList -->
                        <slot
                          name="mobile-sidebar-navigation-item-icon"
                          :item="item"
                          class-list="flex items-center w-4 h-4 my-auto shrink-0"
                        >
                          <span
                            v-if="!hideSidebarIcons"
                            class="flex items-center w-4 h-4 my-auto shrink-0"
                          >
                            <img
                              v-if="item.iconUrl"
                              :src="item.iconUrl"
                              :alt="item.title"
                              class="w-4 h-4"
                            >
                            <IconFa7SolidCube
                              v-else
                              class="w-4 h-4"
                            />
                            <span class="sr-only">{{ item.title }}</span>
                          </span>
                        </slot>
                        <span class="inline-block my-auto text-left">{{ item.title }}</span>
                        <span
                          v-if="itemsGroupBadgeCount(item) && !showItemsGroup(item)"
                          class="inline-block my-auto"
                        >
                          <span
                            class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                          >{{ itemsGroupBadgeCount(item) }}</span>
                        </span>
                        <IconFa7SolidChevronDown
                          v-if="showItemsGroup(item)"
                          class="shrink-0 w-4 h-4 ml-auto my-auto"
                        />
                        <IconFa7SolidChevronRight
                          v-else
                          class="shrink-0 w-4 h-4 ml-auto my-auto"
                        />
                      </button>
                      <template v-if="showItemsGroup(item)">
                        <a
                          v-for="subitem in item.items"
                          :key="subitem.id"
                          :href="subitem.href"
                          class="flex relative gap-2 px-3 py-2 border-l-4 group"
                          :class="{
                            'border-transparent text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800': !subitem.active,
                            'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': subitem.active,
                            'pl-8': !hideSidebarIcons,
                            'pl-4': hideSidebarIcons
                          }"
                          @click="navigate(item, subitem, $event)"
                        >
                          <span
                            class="inline-block my-auto text-left"
                          >{{ subitem.title }}</span>
                          <span
                            v-if="subitem.badgeCount"
                            class="inline-block my-auto"
                          >
                            <span
                              class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                            >{{ subitem.badgeCount }}</span>
                          </span>
                          <span 
                            v-if="!collapsed && subitem.keyboardShortcut && subitem.keyboardShortcut?.length"
                            class="inline-flex gap-1 my-auto ml-auto"
                          >
                            <kbd 
                              v-for="(kbdSc, index) in subitem.keyboardShortcut"
                              :key="index"
                              class="inline-block bg-white border border-gray-100 group-hover:border-gray-200 rounded-sm p-1.5 text-xs text-gray-700 group-hover:text-gray-900 font-semibold leading-none"
                              v-html="kbdSc"
                            />
                          </span>
                        </a>
                      </template>
                    </template>
                    <a
                      v-else
                      :href="item.href"
                      class="flex relative gap-2 pl-2 px-3 py-2 border-l-4 group"
                      :class="{
                        'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800': !item.active,
                        'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': item.active
                      }"
                      @click="navigate(null, item, $event)"
                    >
                      <!-- @slot Mobile sidebar navigation item icon content. @binding item, classList -->
                      <slot
                        name="mobile-sidebar-navigation-item-icon"
                        :item="item"
                        class-list="flex items-center w-4 h-4 my-auto shrink-0"
                      >
                        <span
                          v-if="!hideSidebarIcons"
                          class="flex items-center w-4 h-4 my-auto shrink-0"
                        >
                          <img
                            v-if="item.iconUrl"
                            :src="item.iconUrl"
                            :alt="item.title"
                            class="w-4 h-4"
                          >
                          <IconFa7SolidCube
                            v-else
                            class="w-4 h-4"
                          />
                          <span class="sr-only">{{ item.title }}</span>
                        </span>
                      </slot>
                      <span class="inline-block my-auto text-left">{{ item.title }}</span>
                      <span
                        v-if="item.badgeCount"
                        class="inline-block my-auto"
                      >
                        <span
                          class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                        >{{ item.badgeCount }}</span>
                      </span>
                      <span 
                        v-if="!collapsed && item.keyboardShortcut && item.keyboardShortcut?.length"
                        class="inline-flex gap-1 my-auto ml-auto"
                      >
                        <kbd 
                          v-for="(kbdSc, index) in item.keyboardShortcut"
                          :key="index"
                          class="inline-block bg-white border border-gray-100 group-hover:border-gray-200 rounded-sm p-1.5 text-xs text-gray-700 group-hover:text-gray-900 font-semibold leading-none"
                          v-html="kbdSc"
                        />
                      </span>
                    </a>
                  </template>
                </slot>
                <div
                  v-if="hasSlot('user-section')"
                  class="p-3"
                >
                  <div class="pt-3 border-t border-gray-100 dark:border-gray-800 items-center flex gap-2 shrink-0">
                    <!-- @slot User section content. @binding collapsed -->
                    <slot
                      name="user-section"
                      :collapsed="collapsed"
                    />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </aside>
      </transition>

      <!-- Desktop sidebar -->
      <aside
        aria-label="desktop sidebar"
        class="hidden md:block bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shrink-0 z-50"
        :class="[computedSidebarWidth]"
      >
        <div class="h-screen flex flex-col sticky top-0">
          <header class="my-auto px-3">
            <div class="border-b border-gray-100 dark:border-gray-800">
              <div class="flex items-center gap-2 pt-3">
                <h1
                  v-if="appSuite && !collapsed"
                  class="hidden md:block grow"
                >
                  <a
                    v-if="appSuiteUrl"
                    :href="appSuiteUrl"
                    class="flex hover:underline"
                    @click="navigate(null, { title: appSuite, href: appSuiteUrl }, $event)"
                  >
                    <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
                    <span>{{ appSuite }}</span>
                  </a>
                  <p
                    v-else
                    class="flex"
                  >
                    <span class="text-red-600 dark:text-red-400 font-bold">{{ appSuitePrefix }}</span>
                    <span>{{ appSuite }}</span>
                  </p>
                </h1>
                <div
                  v-if="enableCollapsibleSidebar"
                  class="mx-auto"
                >
                  <button
                    id="btn-collapse-toggle"
                    :title="
                      collapsed ? 'Expand sidebar ( [ )' : 'Collapse sidebar ( [ )'
                    "
                    class="btn btn-ghost btn-sm px-1 py-1 text-gray-700 dark:text-gray-300"
                    :class="{ 'w-full': collapsed, 'w-auto': !collapsed }"
                    @click="toggleCollapse"
                  >
                    <IconFa7SolidAnglesRight
                      v-if="collapsed"
                      class="w-4 h-4 mx-auto"
                    />
                    <IconFa7SolidAnglesLeft
                      v-else
                      class="w-4 h-4 mx-auto"
                    />
                  </button>
                </div>
              </div>
              <button
                v-if="appSuite || appName"
                ref="mobileMenuOpenBtn"
                aria-label="Open mobile menu"
                class="flex md:hidden gap-1 focus:outline-hidden"
                @click="showMobileMenu = !showMobileMenu"
              >
                <IconFa7SolidBars
                  class="text-white h-6 w-6"
                />
                <span class="text-xl leading-6 flex">
                  <span
                    v-if="appSuitePrefix"
                    class="text-red-600 dark:text-red-400 font-bold"
                  >{{ appSuitePrefix }}</span>
                  <span
                    v-if="appSuite"
                  >{{ appSuite }}</span>
                  <span
                    v-if="appName && !hideAppNameInMobileHeader"
                    class="text-sm text-left font-bold text-gray-200 text-ellipsis overflow-hidden whitespace-nowrap w-40 mt-auto mr-auto"
                    :class="[appSuite ? 'ml-1' : '']"
                  >{{ appName }}</span>
                </span>
              </button>
              <div
                v-if="appName"
                class="sticky top-0 z-10"
              >
                <p
                  v-if="appName"
                  class="flex gap-2 py-3"
                >
                  <!-- @slot App icon content. @binding classList -->
                  <slot
                    name="app-icon"
                    class-list="flex items-center w-4 h-4 my-auto shrink-0"
                  >
                    <span
                      v-if="!hideAppIcon"
                      class="flex items-center w-4 h-4 my-auto shrink-0"
                      :class="{ 'mx-auto': collapsed }"
                    >
                      <template v-if="appUrl">
                        <a
                          :href="appUrl"
                          @click="navigate(null, { title: appName, href: appUrl }, $event)"
                        >
                          <img
                            v-if="appIconUrl"
                            :src="appIconUrl"
                            :alt="appName"
                            class="w-4 h-4"
                          >
                          <IconFa7SolidCubes
                            v-else
                            class="w-4 h-4 text-blue-400"
                          />
                          <span class="sr-only">{{ appName }}</span>
                        </a>
                      </template>
                      <template v-else>
                        <img
                          v-if="appIconUrl"
                          :src="appIconUrl"
                          :alt="appName"
                          class="w-4 h-4"
                        >
                        <IconFa7SolidCubes
                          v-else
                          class="w-4 h-4 text-blue-400"
                        />
                        <span class="sr-only">{{ appName }}</span>
                      </template>
                    </span>
                  </slot>
                  <a
                    v-if="appUrl && appName"
                    :href="appUrl"
                    class="my-auto hover:underline"
                    :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
                    @click="navigate(null, { title: appName, href: appUrl }, $event)"
                  >
                    {{ appName }}
                  </a>
                  <span
                    v-else-if="appName"
                    class="my-auto"
                    :class="{ 'sr-only': enableCollapsibleSidebar && collapsed }"
                  >
                    {{ appName }}
                  </span>
                </p>
              </div>
            </div>
          </header>
          <div class="overflow-y-auto grow overscroll-contain pt-3">
            <nav
              v-if="sidebarNavigationItems.length > 0"
              class="grid grid-cols-1 pb-24"
              aria-label="Sidebar"
            >
              <!-- @slot Nav content. @binding items, collapsed -->
              <slot
                name="sidebar-navigation"
                :items="sidebarNavigationItems"
                :collapsed="collapsed"
              >
                <template
                  v-for="item in sidebarNavigationItems"
                  :key="item.id"
                >
                  <template v-if="item.items">
                    <sds-tooltip
                      placement="right"
                      :disabled="!collapsed"
                    >
                      <template #trigger>
                        <button
                          :href="item.href"
                          class="flex item-center relative w-full gap-2 pl-2 px-3 py-2 border-l-4"
                          :class="{
                            'border-transparent text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800': !itemsGroupIsActive(item) || showItemsGroup(item),
                            'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': itemsGroupIsActive(item) && (!showItemsGroup(item) || collapsed)
                          }"
                          @click="toggleItemsGroup(item)"
                        >
                          <!-- @slot Sidebar navigation item icon content. @binding item, classList -->
                          <slot
                            name="sidebar-navigation-item-icon"
                            :item="item"
                            class-list="flex items-center w-4 h-4 my-auto shrink-0"
                          >
                            <span
                              v-if="!hideSidebarIcons"
                              class="flex items-center w-4 h-4 my-auto shrink-0"
                              :class="{ 'mx-auto': collapsed }"
                            >
                              <img
                                v-if="item.iconUrl"
                                :src="item.iconUrl"
                                :alt="item.title"
                                class="w-4 h-4"
                              >
                              <IconFa7SolidCube
                                v-else
                                class="w-4 h-4"
                              />
                              <span class="sr-only">{{ item.title }}</span>
                            </span>
                          </slot>
                          <span
                            v-if="!collapsed"
                            class="inline-block my-auto text-left"
                          >{{ item.title }}</span>
                          <span
                            v-if="itemsGroupBadgeCount(item) && !showItemsGroup(item)"
                            class="inline-block my-auto"
                            :class="{
                              'absolute bottom-1 right-3': collapsed
                            }"
                          >
                            <span
                              v-if="!collapsed"
                              class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                            >{{ itemsGroupBadgeCount(item) }}</span>
                            <span
                              v-else
                              class="flex justify-center p-1 rounded-full bg-red-600"
                            ><span class="sr-only">{{ itemsGroupBadgeCount(item) }}</span></span>
                          </span>
                          <IconFa7SolidChevronDown
                            v-if="!collapsed && showItemsGroup(item)"
                            class="shrink-0 w-4 h-4 ml-auto my-auto"
                          />
                          <IconFa7SolidChevronRight
                            v-else-if="!collapsed"
                            class="shrink-0 w-4 h-4 ml-auto my-auto"
                          />
                        </button>
                      </template>
                      <p>{{ item.title }}</p>
                    </sds-tooltip>
                    <template v-if="!collapsed && showItemsGroup(item)">
                      <a
                        v-for="subitem in item.items"
                        :key="subitem.id"
                        :href="subitem.href"
                        class="flex relative gap-2 px-3 py-2 border-l-4 group"
                        :class="{
                          'border-transparent text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800': !subitem.active,
                          'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': subitem.active,
                          'pl-8': !hideSidebarIcons,
                          'pl-4': hideSidebarIcons
                        }"
                        @click="navigate(item, subitem, $event)"
                      >
                        <span
                          class="inline-block my-auto text-left"
                        >{{ subitem.title }}</span>
                        <span
                          v-if="subitem.badgeCount"
                          class="inline-block my-auto"
                        >
                          <span
                            class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                          >{{ subitem.badgeCount }}</span>
                        </span>
                        <span 
                          v-if="!collapsed && subitem.keyboardShortcut && subitem.keyboardShortcut?.length"
                          class="inline-flex gap-1 my-auto ml-auto"
                        >
                          <kbd 
                            v-for="(kbdSc, index) in subitem.keyboardShortcut"
                            :key="index"
                            class="inline-block bg-white border border-gray-100 group-hover:border-gray-200 rounded-sm p-1.5 text-xs text-gray-700 group-hover:text-gray-900 font-semibold leading-none"
                            v-html="kbdSc"
                          />
                        </span>
                      </a>
                    </template>
                  </template>
                  <sds-tooltip
                    v-else
                    placement="right"
                    :disabled="!collapsed"
                  >
                    <template #trigger>
                      <a
                        :href="item.href"
                        class="flex relative gap-2 pl-2 px-3 py-2 border-l-4 group"
                        :class="{
                          'border-transparent text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800': !item.active,
                          'border-red-600 bg-gray-25 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800': item.active
                        }"
                        @click="navigate(null, item, $event)"
                      >
                        <!-- @slot Sidebar navigation item icon content. @binding item, classList -->
                        <slot
                          name="sidebar-navigation-item-icon"
                          :item="item"
                          class-list="flex items-center w-4 h-4 my-auto shrink-0"
                        >
                          <span
                            v-if="!hideSidebarIcons"
                            class="flex items-center w-4 h-4 my-auto shrink-0"
                            :class="{ 'mx-auto': collapsed }"
                          >
                            <img
                              v-if="item.iconUrl"
                              :src="item.iconUrl"
                              :alt="item.title"
                              class="w-4 h-4"
                            >
                            <IconFa7SolidCube
                              v-else
                              class="w-4 h-4"
                            />
                            <span class="sr-only">{{ item.title }}</span>
                          </span>
                        </slot>
                        <span
                          v-if="!collapsed"
                          class="inline-block my-auto text-left"
                        >{{ item.title }}</span>
                        <span
                          v-if="item.badgeCount"
                          class="inline-block my-auto"
                          :class="{
                            'absolute bottom-1 right-3': collapsed
                          }"
                        >
                          <span
                            v-if="!collapsed"
                            class="flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full text-white bg-red-600 dark:bg-red-700"
                          >{{ item.badgeCount }}</span>
                          <span
                            v-else
                            class="flex justify-center p-1 rounded-full bg-red-600 dark:bg-red-700"
                          ><span class="sr-only">{{ item.badgeCount }}</span></span>
                        </span>
                        <span 
                          v-if="!collapsed && item.keyboardShortcut && item.keyboardShortcut?.length"
                          class="inline-flex gap-1 my-auto ml-auto"
                        >
                          <kbd 
                            v-for="(kbdSc, index) in item.keyboardShortcut"
                            :key="index"
                            class="inline-block bg-white border border-gray-100 group-hover:border-gray-200 rounded-sm p-1.5 font-sans text-xs text-gray-700 group-hover:text-gray-900 font-semibold leading-none"
                            v-html="kbdSc"
                          />
                        </span>
                      </a>
                    </template>
                    <p>{{ item.title }}</p>
                  </sds-tooltip>
                </template>
              </slot>
            </nav>
          </div>
          <div
            v-if="hasSlot('user-section')"
            class="items-center flex gap-2 shrink-0 p-3"
          >
            <!-- @slot User section content. @binding collapsed -->
            <slot
              name="user-section"
              :collapsed="collapsed"
            />
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <div class="bg-gray-25 dark:bg-black flex flex-col items-stretch grow min-w-0">
        <main class="grow pb-4">
          <div
            v-if="!hidePageHeader"
            class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-3 py-3 sticky top-0 z-40 flex flex-col gap-4 md:flex-row"
          >
            <div class="grow my-auto flex flex-row gap-2">
              <!-- @slot Page title content. -->
              <slot
                name="page-title"
                class-list="text-xl font-light text-gray-900 dark:text-gray-100"
              >
                <p class="text-xl font-light text-gray-900 dark:text-gray-100">
                  {{ pageTitle }}
                </p>
              </slot>
            </div>
            <div
              v-if="hasSlot('page-header')"
              class="shrink-0 my-auto flex flex-col md:flex-row gap-2"
            >
              <!-- @slot Page header content. -->
              <slot
                name="page-header"
              />
            </div>
          </div>
          <div class="p-4">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </main>

        <!-- Footer -->
        <footer>
          <div
            v-if="hasSlot('footer-top')"
            class="p-4"
          >
            <!-- @slot Footer top content. Great for application-specific footer content. -->
            <slot name="footer-top" />
          </div>

          <hr class="mx-4 border-t border-gray-200 dark:border-gray-800">

          <div class="text-xs p-4 flex flex-col lg:flex-row gap-4 pt-4">
            <div class="shrink-0 flex order-2 lg:order-1">
              <sds-link
                href="https://sei.cmu.edu"
                title="Software Engineering Institute"
                class="my-auto"
                external
              >
                <SdsSeiWordmark class="h-10 text-black dark:text-white" />
                <span class="sr-only">Software Engineering Institute</span>
              </sds-link>
            </div>
            <div
              v-if="hasSlot('footer-middle')"
              class="shrink flex lg:mx-auto order-1 lg:order-2"
            >
              <div class="my-auto">
                <!-- @slot Footer middle (top in mobile) content. -->
                <slot name="footer-middle" />
              </div>
            </div>
            <div class="shrink-0 flex lg:ml-auto order-3">
              <div class="my-auto">
                <!-- @slot Footer right (bottom in mobile) content. @binding year -->
                <slot
                  name="footer-right"
                  :year="year"
                >
                  <div class="flex flex-col">
                    <p class="ml-auto">
                      &copy; {{ year }} Carnegie Mellon University
                    </p>
                    <p class="ml-auto">
                      Proprietary. SEI Internal Use Only
                    </p>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </footer>

        <!-- Action bar-->
        <transition
          enter-active-class="transition-transform ease-in-out delay-250 duration-250"
          enter-from-class="translate-y-full"
          enter-to-class="translate-y-0"
          appear
        >
          <aside
            v-if="!hideActionBar && hasSlot('action-bar')"
            class="bg-blue-500 text-white dark:bg-blue-700 p-4 sticky bottom-0 z-40"
          >
            <div class="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
              <!-- @slot Action content. Great for application-specific actionable content. -->
              <slot name="action-bar" />
            </div>
          </aside>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SdsLink from '../Link/Link.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsSeiWordmark from '../SeiWordmark/SeiWordmark.vue'
import { useFocusTrap, useEventListener } from '@/composables'

export interface ApplicationSidebarNavItem {
  id: number | string
  href: string
  active: boolean
  title: string
  badgeCount?: number
  iconUrl?: string
  keyboardShortcut?: string | string[]
  items?: ApplicationSidebarNavItem[]
}

defineOptions({
  name: 'SdsApplication'
})

const slots = defineSlots<{
  default: () => unknown
  'app-icon': () => unknown
  'user-section': () => unknown
  'page-header': () => unknown
  'page-title': () => unknown
  'mobile-sidebar-navigation': () => unknown
  'mobile-sidebar-navigation-item-icon': () => unknown
  'sidebar-navigation': () => unknown
  'sidebar-navigation-item-icon': () => unknown
  'footer-top': () => unknown
  'footer-left': () => unknown
  'footer-middle': () => unknown
  'footer-right': () => unknown
  'action-bar': () => unknown
}>()

interface ApplicationProps {
  /**
   * The width class of the non-collapsed sidebar when not in a mobile responsive view.
   */
  sidebarWidth?: string;
  /**
   * Determines whether to enable collapsing functionality.
   *
   * Ensure to have an icon for every item in the **sidebarNavigationItems** array for this to look nice.
   *
   * Including an **appIconUrl** will also improve the user experience.
   */
  enableCollapsibleSidebar?: boolean;
  /**
   * The app suite name's prefix (styled in red) for the layout.
   */
  appSuitePrefix?: string;
  /**
   * The app suite name for the layout.
   */
  appSuite?: string | null;
  /**
   * The app suite url for the layout.
   */
  appSuiteUrl?: string | null;
  /**
   * The app name for the layout.
   */
  appName?: string | null;
  /**
   * The app url for the layout.
   */
  appUrl?: string | null;
  /**
   * Determines whether to hide the **appName** in the mobile header.
   *
   * This is useful when an application's name is very long.
   */
  hideAppNameInMobileHeader?: boolean;
  /**
   * The app icon url for the layout.
   */
  appIconUrl?: string | null;
  /**
   * The page title for the layout.
   */
  pageTitle?: string | null;
  /**
   * Determines whether to hide the page header.
   */
  hidePageHeader?: boolean;
  /**
   * The sidebar navigation array for the layout.
   *
   * Each item should have a unique **id**, **title**, **active**, and **href** key value pair. **badgeCount** and **iconUrl** are optional.
   *
   * Item object:
   *
   * { id: Number, title: String, active: Boolean, href: String, badgeCount: Number, iconUrl: String }
   */
  sidebarNavigationItems?: ApplicationSidebarNavItem[];
  /**
   * Determines whether to hide the app icon.
   */
  hideAppIcon?: boolean;
  /**
   * Determines whether to hide the icons in the sidebar.
   */
  hideSidebarIcons?: boolean;
  /**
   * Determines whether to hide the action bar slot.
   */
  hideActionBar?: boolean;
}

const props = withDefaults(defineProps<ApplicationProps>(), {
  sidebarWidth: 'w-72',
  enableCollapsibleSidebar: false,
  appSuitePrefix: 'SEI',
  appSuite: null,
  appSuiteUrl: null,
  appName: null,
  appUrl: null,
  hideAppNameInMobileHeader: false,
  appIconUrl: null,
  pageTitle: null,
  hidePageHeader: false,
  sidebarNavigationItems: () => [],
  hideAppIcon: false,
  hideSidebarIcons: false,
  hideActionBar: false
})

/**
 * The v-model that determines collapsed state.
 */
const collapsed = defineModel<boolean>({ type: Boolean, default: false })

const emit = defineEmits(['navigate'])

const showMobileMenu = ref(false)
const mobileMenuCloseBtn = ref()
const mobileMenuOpenBtn = ref()
const mobileSidebarContainer = ref()
const openItemsGroups = ref<ApplicationSidebarNavItem[]>([])

const year = computed(() => {
  const d = new Date();
  return d.getFullYear();
})

const computedSidebarWidth = computed(() => {
  if (!props.enableCollapsibleSidebar) return props.sidebarWidth
  return collapsed.value ? 'w-auto' : props.sidebarWidth;
})

watch(showMobileMenu, async (value) => {
  if (typeof document !== 'undefined') {
    if (value) {
      // prevent scrolling
      document.documentElement.classList.add("application-internal-prevent-scroll")
      await nextTick()
      mobileMenuCloseBtn.value.focus()
    } else {
      // enable scrolling
      document.documentElement.classList.remove("application-internal-prevent-scroll")
      mobileMenuOpenBtn.value.focus()
    }
  }
})

watch(collapsed, (value) => {
  if (value) {
    openItemsGroups.value = []
  }
})

const handleDocumentKeyUp = ($event: KeyboardEvent) => {
  if (!$event.target) return
  const tagName = ($event.target as HTMLElement).tagName.toLowerCase();
  if (tagName === "textarea") return;
  if (tagName === "input") return;
  // toggle collapse on "[" key
  if ($event.key === "[") toggleCollapse();
}

// Setup collapse functionality with automatic cleanup
useEventListener(document, "keyup", handleDocumentKeyUp)

const itemsGroupBadgeCount = (item: ApplicationSidebarNavItem) => {
  if (!item.items) { return null }
  let count = 0
  item.items.forEach(i => {
    if (i.badgeCount) {
      count = count + i.badgeCount
    }
  })
  return count
}

const itemsGroupIsActive = (item: ApplicationSidebarNavItem) => {
  return item.items && item.items.filter(i => i.active).length
}

const showItemsGroup = (item: ApplicationSidebarNavItem) => {
  return openItemsGroups.value.filter(i => i.id === item.id).length
}

const toggleItemsGroup = (item: ApplicationSidebarNavItem) => {
  collapsed.value = false
  if (showItemsGroup(item)) {
    openItemsGroups.value = openItemsGroups.value.filter(
      i => i.id !== item.id
    )
  } else {
    openItemsGroups.value.push(item)
  }
}

const hasSlot = (title: 'default' | 'app-icon' | 'user-section' | 'page-header' | 'page-title' | 'mobile-sidebar-navigation' | 'mobile-sidebar-navigation-item-icon' | 'sidebar-navigation' | 'sidebar-navigation-item-icon' | 'footer-top' | 'footer-left' | 'footer-middle' | 'footer-right' | 'action-bar') => {
  return !!slots[title]
}

const navigate = (group: ApplicationSidebarNavItem | null, item: Pick<ApplicationSidebarNavItem, 'title' | 'href'>, event: Event) => {
  // Close the mobile menu
  showMobileMenu.value = false
  /**
   * Emmited when a navigation menu item has been clicked.
   *
   * Sends a payload of the clicked item and the click event: { group, item, event }
   */
  emit('navigate', { group, item, event })
}

const toggleCollapse = () => {
  if (!props.enableCollapsibleSidebar) {
    collapsed.value = false
  } else {
    collapsed.value = !collapsed.value;
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const { trapFocus } = useFocusTrap(mobileSidebarContainer, {
  enabled: showMobileMenu,
  handleEscape: true,
  onEscape: closeMobileMenu
})
</script>

<style lang="postcss">
@reference "../../../tailwindcss/tailwind.css";

.application-internal-prevent-scroll {
  @apply overflow-hidden md:overflow-visible;
}
</style>
