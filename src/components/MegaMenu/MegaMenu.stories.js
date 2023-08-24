import SdsMegaMenu from './MegaMenu.vue';
import SdsMegaMenuItem from '../MegaMenuItem/MegaMenuItem.vue';

import { action } from '@storybook/addon-actions';

export default {
  title: 'Navigation/Mega Menu',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 675
      },
      description: {
        component: 'Beta: A Mega Menu is a large, expandable drop-down container for global navigation links on complex websites.',
      },
    },
  },
  component: SdsMegaMenu,
};

const Template = (args) => ({
  components: {
    SdsMegaMenu,
    SdsMegaMenuItem
  },
  setup() {
    return { args }
  },
  template: `
    <sds-mega-menu
      class="flex sticky z-50 gap-x-8 h-fit"
      v-model="localValue"
      v-bind="args"
      @change="onChange"
      @update:model-value="onUpdateModelValue"
    >
      <template #panel(topLink1)>
        <div class="mx-auto container">
          <div class="grid grid-cols-3 gap-4 py-8">
            <div class="col-span-2 px-4">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mb-4"
                cta
                href="/"
                label="Descriptive Link CTA"
                kind="descriptive"
              >
                <span class="text-sm text-gray-700">Descriptive link with longer link description text or subtitle. This one also uses the cta property.</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                class="mb-4"
                label="Descriptive Link"
                kind="descriptive"
                href="/"
              >
                <span class="text-sm text-gray-700">Descriptive link with longer link description text or subtitle.</span>
              </sds-mega-menu-item>
            </div>
            <div class="col-span-1 px-4 gap-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
          </div>
        </div>
      </template>
      <template #panel(topLink2)>
        <div class="mx-auto container">
          <div class="grid grid-cols-3 gap-4 py-8">
            <div class="col-span-1 px-4">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mb-4"
                cta
                href="/"
                label="Descriptive Link CTA"
                kind="descriptive"
              >
                <span class="text-sm text-gray-700">Descriptive link with longer link description text or subtitle. This one also uses the cta property.</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                class="mb-4"
                label="Descriptive Link"
                kind="descriptive"
                href="/"
              >
                <span class="text-sm text-gray-700">Descriptive link with longer link description text or subtitle.</span>
              </sds-mega-menu-item>
            </div>
            <div class="col-span-1 px-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-4"
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
            </div>
            <div class="col-span-1 px-4 gap-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
          </div>
        </div>
      </template>
      <template #panel(topLink3)>
        <div class="mx-auto container">
          <div class="grid grid-cols-3 gap-4 py-8">
            <div class="col-span-1 px-4">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-4"
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
            </div>
            <div class="col-span-2 px-4 gap-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
          </div>
        </div>
      </template>
      <template #panel(topLink4)>
        <div class="mx-auto container">
          <div class="grid grid-cols-3 gap-4 py-8">
            <div class="col-span-1 px-4">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
            <div class="col-span-1 px-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
            <div class="col-span-1 px-4 gap-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-1"
                label="Descriptive Link Top"
                kind="descriptive"
                href="/"
              >
                <template #top>
                  <div class="w-full h-40 bg-gray-400 mb-4"></div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
              <sds-mega-menu-item
                label="Descriptive Link Left"
                kind="descriptive"
                href="/"
              >
                <template #left>
                  <div class="ml-1 mt-1 block py-2 px-4 w-15 h-15 bg-gray-200">
                    <p class="text-lg font-bold text-center w-full text-gray-600">20</p>
                    <p class="text-sm uppercase font-bold text-center w-full text-gray-600">Mar</p>
                  </div>
                </template>
                <span class="text-sm text-gray-700">Longer link description</span>
              </sds-mega-menu-item>
            </div>
          </div>
        </div>
      </template>
      <template #panel(topLink5)>
        <div class="mx-auto container">
          <div class="grid grid-cols-3 gap-4 py-8">
            <div class="col-span-1 px-4">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-4"
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
            </div>
            <div class="col-span-1 px-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-4"
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
            </div>
            <div class="col-span-1 px-4 gap-4 border-l border-l-gray-200">
              <sds-mega-menu-item
                label="Landing Page Link"
                kind="landing-page"
                href="/"
              />
              <sds-mega-menu-item
                class="mt-4"
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
              <sds-mega-menu-item
                label="Simple Link"
                href="/"
              />
            </div>
          </div>
        </div>
      </template>
    </sds-mega-menu>
  `,
  data() {
    return { localValue: this.$props.modelValue }
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
  modelValue: [
    {
      key: "topLink1",
      title: "Top Link 1",
      selected: false
    },
    {
      key: "topLink2",
      title: "Top Link 2",
      selected: false
    },
    {
      key: "topLink3",
      title: "Top Link 3",
      selected: false
    },
    {
      key: "topLink4",
      title: "Top Link 4",
      selected: false
    },
    {
      key: "topLink5",
      title: "Top Link 5",
      selected: false
    },
  ]
};
