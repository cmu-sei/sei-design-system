<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar
      </h2>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div
            v-for="shape in avatarShapes"
            :key="shape"
            class="flex flex-col justify-center gap-4 h-auto"
          >
            <div>
              <SdsAvatar
                :size="size"
                :shape="shape"
                variant="gray"
                :src="`https://picsum.photos/seed/${size}-${shape}/200/200`"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="circle"
            >
              <SdsAvatar
                :size="size"
                shape="circle"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="square"
            >
              <SdsAvatar
                :size="size"
                shape="square"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4 h-60">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="portrait"
            >
              <SdsAvatar
                :size="size"
                shape="portrait"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar Group
      </h2>
      <h3 class="text-lg">
        Condensed
      </h3>
      <h4>Circle</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              variant: 'green',
            },
            {
              name: 'Jacobim Mugatu',
              variant: 'purple',
            },
            {
              name: 'Maury Ballstein',
              variant: 'yellow'
            },
            {
              name: 'Morgan Markowski',
              variant: 'red',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein',
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein',
            },
            {
              name: 'Morgan Markowski',
              variant: 'blue',
            },
            {
              name: 'Jacobim Mugatu',
              variant: 'green',
            },
            {
              name: 'Maury Ballstein',
              variant: 'blue',
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              src: 'https://picsum.photos/seed/1/200/200',
              href: 'https://google.com',
              variant: 'red',
              target: '_blank'
            },
            {
              name: 'Jacobim Mugatu',
              src: 'https://picsum.photos/seed/2/200/200',
              href: 'https://google.com',
            },
            {
              name: 'Maury Ballstein',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/3/200/200'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/4/200/200'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/5/200/200'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/6/200/400'
            },
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h4>Square</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h3 class="text-lg">
        Default
      </h3>
      <h4>Circle</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h4>Square</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Badge
      </h2>
      <div class="flex gap-4">
        <SdsBadge
          type="medium"
          variant="red"
        >
          Badge
        </SdsBadge>
        <SdsBadge
          type="medium"
          variant="blue"
          class="w-48"
        >
          Badge
        </SdsBadge>
        <SdsBadge
          type="light-border"
          class="w-48"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          <span>Tree</span>
        </SdsBadge>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Datapoint
      </h2>
      <div>
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="gray"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="gray"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="tan"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="md"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="lg"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="md"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="lg"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="red"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="purple"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="indigo"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="blue"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="teal"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="green"
          label="Report Downloads"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Table
      </h2>
      <div>
        <SdsTable
          :fields="fields"
          :items="items"
          enable-drawer
          row-highlight
        >
          <template #cell(fruit_employee)="{ item }: { item: TableItem }">
            <p class="font-bold">
              {{ item.fruit }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Stocked by <span class="font-bold">{{ item.employee }}</span>
            </p>
          </template>
          <template #cell(actions)="{ item }: { item: TableItem }">
            <button @click="edit(item)">
              Edit
            </button>
          </template>
          <template #drawer="{ item }: { item: TableItem }">
            <ul class="py-2 pl-10 pr-8 rounded-md">
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Store:</span>
                  <span>{{ (item.additionalData as AdditionalData).store }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Aisle:</span>
                  <span>{{ (item.additionalData as AdditionalData).aisle }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Price:</span>
                  <span>{{ (item.additionalData as AdditionalData).price }}</span>
                </p>
              </li>
            </ul>
          </template>
        </SdsTable>
      </div>
    </div>
    <div class="grid gap-4 h-full">
      <h2 class="text-xl">
        Top Five Chart
      </h2>
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="gray"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="tan"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="yellow"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="orange"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="green"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="blue"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="purple"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="indigo"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="red"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="teal"
        :view-all-url="viewAllUrl"
      />
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Tag
      </h2>
      <div class="grid gap-4">
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag>
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              href="https://designsystem.sei.cmu.edu/"
              :external="true"
            >
              <template #label>
                Link
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :readonly="true"
            >
              <template #label>
                Read-only
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="increment"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="decrement"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="remove"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag size="md">
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              href="https://designsystem.sei.cmu.edu/"
              size="md"
              :external="true"
            >
              <template #label>
                Link
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              size="md"
              :readonly="true"
            >
              <template #label>
                Read-only
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="increment"
              size="md"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="decrement"
              size="md"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="remove"
              size="md"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
            >
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="decrement"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="remove"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
              size="md"
            >
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
              size="md"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="decrement"
              size="md"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="remove"
              size="md"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
              size="sm"
            >
              <template #leftSlot>
                <svg class="svg-inline--fa fa-icons fa-fw h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path class="" fill="currentColor" d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"></path>
                </svg>
              </template>
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
              size="sm"
            >
              <template #leftSlot>
                <svg class="svg-inline--fa fa-icons fa-fw h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path class="" fill="currentColor" d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"></path>
                </svg>
              </template>
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              size="md"
            >
              <template #leftSlot>
                <svg class="svg-inline--fa fa-icons fa-fw h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path class="" fill="currentColor" d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"></path>
                </svg>
              </template>
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
              size="md"
            >
              <template #leftSlot>
                <svg class="svg-inline--fa fa-icons fa-fw h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path class="" fill="currentColor" d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"></path>
                </svg>
              </template>
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableField, TableItem } from '../../../components/Table/Table.vue';

const datapointModelValue = ref(1451)

const avatarSizes = ref<('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[]>(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])
const avatarShapes = ref<('circle' | 'square' | 'portrait')[]>(['circle', 'square', 'portrait'])

const fields = ref<TableField[]>([
  {
    key: "id",
    label: "ID",
    sortable: true
  },
  {
    key: "fruit_employee",
    fields: [
      {
        key: "fruit",
        label: "Fruit",
        sortable: true
      },
      {
        key: "employee",
        label: "Employee",
        sortable: true
      }
    ]
  },
  {
    key: "lastDelivered",
    label: "Last Delivered",
    sortable: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "createdDate",
    label: "Created Date",
    hidden: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "actions",
    label: "Actions"
  }
])

interface AdditionalData {
  store: string;
  aisle: string;
  price: string;
}

const items = ref<TableItem[]>([
  {
    id: 1,
    fruit: "Apple",
    employee: "Jacobim Mugatu",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("02/23/2009"),
    additionalData: {
      store: "Giant Eagle",
      aisle: "13",
      price: "$1.00"
    }
  },
  {
    id: 2,
    fruit: "Banana",
    employee: "Maury Ballstein",
    lastDelivered: new Date("10/01/2020"),
    createdDate: new Date("05/13/2010"),
    additionalData: {
      store: "Aldi",
      aisle: "10",
      price: "$1.04"
    }
  },
  {
    id: 3,
    fruit: "Cantaloupe",
    employee: "Derek Zoolander",
    lastDelivered: new Date("12/01/2020"),
    createdDate: new Date("01/13/2012"),
    additionalData: {
      store: "WalMart",
      aisle: "1",
      price: "$0.99"
    }
  },
  {
    id: 4,
    fruit: "Durian",
    employee: "Hansel MacDonald",
    lastDelivered: new Date("02/01/2021"),
    createdDate: new Date("12/09/2013"),
    additionalData: {
      store: "Sam's Club",
      aisle: "3",
      price: "$1.23"
    }
  },
  {
    id: 5,
    fruit: "Elderberry",
    employee: "Matilda Jeffries",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("04/10/2017"),
    additionalData: {
      store: "Foodland",
      aisle: "5",
      price: "$2.00"
    }
  }
])

const edit = (item: TableItem) => {
  console.log(item)
}

const title = ref('Chart title')

const entries = ref([
  { id: 1, title: "Item 1", url: "https://designsystem.sei.cmu.edu", count: 100 },
  { id: 2, title: "Item 2", url: "https://designsystem.sei.cmu.edu", count: 80 },
  { id: 3, title: "Item 3", url: "https://designsystem.sei.cmu.edu", count: 40 },
  { id: 4, title: "Item 4", url: "https://designsystem.sei.cmu.edu", count: 32 },
  { id: 5, title: "Item 5", url: "https://designsystem.sei.cmu.edu", count: 20 },
])

const viewAllUrl = ref('https://designsystem.sei.cmu.edu')

defineOptions({
  name: 'DataVisualizationPage'
})

definePage({
  meta: {
    title: 'Data Visualization'
  }
})

useHead({
  title: 'Data Visualization'
})
</script>
