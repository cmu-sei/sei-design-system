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
              target: '_blank'
            },
            {
              name: 'Maury Ballstein',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/3/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/4/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/5/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/6/200/400',
              target: '_blank'
            },
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
            }
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
      <div class="flex flex-row gap-4 flex-wrap">
        <div
          v-for="variant in badgeVariants"
          :key="variant"
          class="flex flex-col gap-4"
        >
          <div
            v-for="type in badgeTypes"
            :key="type"
            class="flex flex-row gap-4"
          >
            <SdsBadge
              :type="type"
              :variant="variant"
            >
              Badge
            </SdsBadge>
          </div>
        </div>
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
      <div>
        <SdsTable
          :fields="fields_simple"
          :items="items_simple"
        >
          <template #cell(fruit)="{ value }">
            <p class="font-bold">
              {{ value }}
            </p>
          </template>
          <template #cell(actions)>
            <button>
              Edit
            </button>
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
              :counter="4000"
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
              :counter="400"
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
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
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
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
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
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
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
              disabled
            >
              <template #leftSlot>
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
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
const badgeVariants = ref<('gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green' | undefined)[]>(
  ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green']
)
const badgeTypes = ref<('light-border' | 'light' | 'medium' | 'dark' | undefined)[]>(['light-border', 'light', 'medium', 'dark'])

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

const fields_simple = ref<TableField[]>([
  {
    key: "id",
    label: "ID",
    sortable: true
  },
  {
    key: "fruit",
    label: "Fruit",
    sortable: true
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    align: "right"
  },
  {
    key: "pricePerPound",
    label: "Price Per Pound",
    sortable: true,
    align: "right"
  },
  {
    key: "lastDelivered",
    label: "Last delivered",
    sortable: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "createdDate",
    label: "Created date",
    hidden: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "actions",
    label: "Actions"
  }
])

const items_simple = ref([
  {
    id: 1,
    fruit: "Apple",
    employee: "Jacobim Mugatu",
    amount: "32",
    pricePerPound: "$1.42",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("02/23/2009"),
  },
  {
    id: 2,
    fruit: "Banana",
    pricePerPound: "$0.99",
    amount: "4",
    employee: "Maury Ballstein",
    lastDelivered: new Date("10/01/2020"),
    createdDate: new Date("05/13/2010"),
  },
  {
    id: 3,
    fruit: "Cantaloupe",
    pricePerPound: "$42.68",
    amount: "18",
    employee: "Derek Zoolander",
    lastDelivered: new Date("12/01/2020"),
    createdDate: new Date("01/13/2012"),
  },
  {
    id: 4,
    fruit: "Durian",
    pricePerPound: "$32.98",
    amount: "100",
    employee: "Hansel MacDonald",
    lastDelivered: new Date("02/01/2021"),
    createdDate: new Date("12/09/2013"),
  },
  {
    id: 5,
    fruit: "Elderberry",
    pricePerPound: "$2.93",
    amount: "37",
    employee: "Matilda Jeffries",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("04/10/2017"),
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
