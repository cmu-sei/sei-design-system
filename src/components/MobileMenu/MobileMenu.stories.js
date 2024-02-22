import SdsMobileMenu from './MobileMenu.vue';
import SdsComboBox from '../ComboBox/ComboBox.vue';
import SdsNavigationItem from '../NavigationItem/NavigationItem.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Mobile Menu',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 675
      },
      description: {
        component: 'A Mobile Menu is a compact container for global navigation links on mobile or tablet sized screens and devices.'
      }
    }
  },
  component: SdsMobileMenu,
  argTypes: {
    modelValue: {
      options: [true, false],
      control: { type: 'radio' }
    },
    size: {
      options: ['xl', 'lg', 'md', 'sm'],
      control: { type: 'select' }
    },
    side: {
      options: ['left', 'right'],
      control: { type: 'select' }
    },
    zIndex: {
      options: ['0', '10', '20', '30', '40', '50', 'auto'],
      control: { type: 'select' }
    }
  }
};

const Template = (args) => ({
  components: {
    SdsMobileMenu,
    SdsComboBox,
    SdsNavigationItem
  },
  setup() {
    return { args }
  },
  template: `
    <sds-mobile-menu
      v-model="localValue"
      v-bind="args"
      @change="onChange"
      @update:model-value="onUpdateModelValue"
    >
      <template #title>
        <p>
          <span class="font-bold text-red-600 dark:text-red-500">Suite</span><span class="font-semibold text-gray-600 dark:text-gray-400">Name</span>
        </p>
      </template>
      <template #default="{ navigate }">
        <sds-combo-box class="mb-4" />
        <sds-navigation-item
          v-for="menuItem in args.mobileMenus"
          :key="menuItem.key"
          :label="menuItem.title"
          :type="menuItem.type"
          :selected="menuItem.selected ?? false"
          @click="navigate(menuItem.key)"
        >
          <template
            v-if="menuItem.icon"
            #left
          >
            <svg
              v-if="menuItem.icon === 'plant'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M205.41 151.07a60.9 60.9 0 0 1-31.83 8.86a71.71 71.71 0 0 1-27.36-5.66A55.55 55.55 0 0 0 136 186.51V216a8 8 0 0 1-8.53 8a8.18 8.18 0 0 1-7.47-8.25v-12.44l-38.62-38.62A52.5 52.5 0 0 1 63.44 168a45.82 45.82 0 0 1-23.92-6.67C17.73 148.09 6 117.62 8.27 79.79a8 8 0 0 1 7.52-7.52c37.83-2.23 68.3 9.46 81.5 31.25a46 46 0 0 1 6.45 28.48a4 4 0 0 1-6.89 2.43l-19.2-20.1a8 8 0 0 0-11.31 11.31l53.88 55.25c.06-.78.13-1.56.21-2.33a68.56 68.56 0 0 1 18.64-39.46l50.59-53.46a8 8 0 0 0-11.31-11.32l-49 51.82a4 4 0 0 1-6.78-1.74c-4.74-17.48-2.65-34.88 6.4-49.82c17.86-29.48 59.42-45.26 111.18-42.22a8 8 0 0 1 7.52 7.52c3 51.77-12.78 93.33-42.26 111.19Z"
              />
            </svg>
            <svg
              v-if="menuItem.icon === 'tree'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10 21v-3H3l5-5H5l5-5H7l5-5l5 5h-3l5 5h-3l5 5h-7v3h-4Z"
              />
            </svg>
            <svg
              v-if="menuItem.icon === 'bug'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 8h-1.81a5.985 5.985 0 0 0-1.82-1.96l.93-.93a.996.996 0 1 0-1.41-1.41l-1.47 1.47C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L9.11 3.7A.996.996 0 1 0 7.7 5.11l.92.93C7.88 6.55 7.26 7.22 6.81 8H5c-.55 0-1 .45-1 1s.45 1 1 1h1.09c-.05.33-.09.66-.09 1v1H5c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .34.04.67.09 1H5c-.55 0-1 .45-1 1s.45 1 1 1h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19c.55 0 1-.45 1-1s-.45-1-1-1h-1.09c.05-.33.09-.66.09-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1c0-.34-.04-.67-.09-1H19c.55 0 1-.45 1-1s-.45-1-1-1zm-6 8h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1zm0-4h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1z"
              />
            </svg>
          </template>
          <template #children>
            <sds-navigation-item
              v-for="child in menuItem.content?.children"
              :key="child.key"
              :label="child.title"
              :href="child.href"
              :type="child.type"
              :disabled="menuItem.selected ? false : true"
            />
          </template>
        </sds-navigation-item>
        <hr class="mt-2 mb-2 border-gray-200 dark:border-gray-700">
        <sds-navigation-item
          label="News & Media"
          href="/components/navigation"
        />
        <sds-navigation-item
          label="Resources"
          href="/components/navigation"
        />
        <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
      </template>
      <template #panel(plants)="{ navigate }">
        <sds-navigation-item
          type="back"
          @click="navigate()"
        />
        <sds-navigation-item
          v-for="menuItem in args.mobileMenus[0].content.children"
          :key="menuItem.key"
          :label="menuItem.title"
          :href="menuItem.href"
          :type="menuItem.type"
        />
        <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
      </template>
      <template #panel(trees)="{ navigate }">
        <sds-navigation-item
          type="back"
          @click="navigate()"
        />
        <sds-navigation-item
          type="title"
          label="Trees"
        />
        <p class="text-lg pt-4 mb-2 dark:text-gray-200">
          <b>Tree Categories</b>
        </p>
        <sds-navigation-item
          v-for="menuItem in args.mobileMenus[1].content.children_1"
          :key="menuItem.key"
          :label="menuItem.title"
          :href="menuItem.href"
        />
        <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
        <sds-navigation-item
          v-for="menuItem in args.mobileMenus[1].content.children_2"
          :key="menuItem.key"
          :label="menuItem.title"
          :href="menuItem.href"
        />
        <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
      </template>
      <template #footer>
        <div class="flex flex-row text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="20"
            viewBox="0 0 512 512"
            class="border-r-gray-400 border-r pr-4 hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l217.6-163.2c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2a63.9 63.9 0 0 1-76.8 0L0 176z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="20"
            viewBox="0 0 448 512"
            class="pl-4 hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M0 64c0-17.7 14.3-32 32-32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zm0 352a64 64 0 1 1 128 0a64 64 0 1 1-128 0zm32-256c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="20"
            viewBox="0 0 448 512"
            class="hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48c27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="20"
            viewBox="0 0 256 256"
            class="hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M154.2 138.33a32 32 0 1 0-52.4 0a24.27 24.27 0 0 0-8.76 7a23.68 23.68 0 0 0-4.3 20.49l12.18 48A24.18 24.18 0 0 0 124.44 232h7.12a24.18 24.18 0 0 0 23.52-18.15l12.18-48a23.68 23.68 0 0 0-4.3-20.49a24.27 24.27 0 0 0-8.76-7.03ZM128 104a16 16 0 1 1-16 16a16 16 0 0 1 16-16Zm23.75 57.91l-12.18 48a8.18 8.18 0 0 1-8 6.09h-7.12a8.18 8.18 0 0 1-8-6.09l-12.18-48a7.71 7.71 0 0 1 1.42-6.73a8.26 8.26 0 0 1 6.58-3.18h31.5a8.26 8.26 0 0 1 6.58 3.18a7.71 7.71 0 0 1 1.4 6.73ZM72 128a56.27 56.27 0 0 0 1.76 14a8 8 0 1 1-15.49 4a72 72 0 1 1 139.46 0a8 8 0 0 1-7.74 6a8.12 8.12 0 0 1-2-.25a8 8 0 0 1-5.75-9.74A56 56 0 1 0 72 128Zm160 0a103.86 103.86 0 0 1-46.49 86.66a8 8 0 0 1-8.86-13.32a88 88 0 1 0-97.31 0A8 8 0 0 1 74.91 216a7.92 7.92 0 0 1-4.42-1.34A104 104 0 1 1 232 128Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="20"
            viewBox="0 0 448 512"
            class="hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9V416z"
            />
          </svg>
        </div>
      </template>
    </sds-mobile-menu>
  `,
  data() {
    return {
      localValue: this.$props.modelValue
    }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
  methods: {
    onChange: action('onChange'),
    onUpdateModelValue: action('onUpdateModelValue')
  }
});

export const Default = Template.bind({});
Default.args = {
  mobileMenus: [
    {
      key: "plants",
      title: "Plants",
      type: "slide",
      icon: "plant",
      selected: false,
      content: {
        children: [
          {
            key: "plants_title",
            title: "Plants",
            type: "title",
          },
          {
            key: "ferns",
            title: "Ferns",
            href: "/components/navigation"
          },
          {
            key: "cacti",
            title: "Cacti",
            href: "/components/navigation"
          }
        ]
      }
    },
    {
      key: "trees",
      title: "Trees",
      type: "slide",
      icon: "tree",
      selected: false,
      content: {
        children_1: [
          {
            key: "deciduous",
            title: "Deciduous",
            href: "/components/navigation"
          },
          {
            key: "leafy",
            title: "Leafy",
            href: "/components/navigation"
          }
        ],
        children_2: [
          {
            key: "tree_anatomy",
            title: "Tree Anatomy",
            href: "/components/navigation"
          },
          {
            key: "available_saplings",
            title: "Available Saplings",
            href: "/components/navigation"
          }
        ]
      }
    },
    {
      key: "bugs",
      title: "Bugs",
      type: "expand",
      icon: "bug",
      selected: false,
      content: {
        children: [
          {
            key: "anthropods",
            title: "Anthropods",
            href: "/components/navigation"
          },
          {
            key: "arachnids",
            title: "Arachnids",
            href: "/components/navigation"
          }
        ]
      }
    },
  ],
  modelValue: true,
  size: 'md',
  side: 'right',
  zIndex: '50'
};
