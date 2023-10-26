<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar
      </h2>
      <div class="grid gap-4">
        <div>
          <SdsAvatar
            shape="circle"
            variant="gray"
            size="lg"
            name="John Smith"
          />
        </div>
        <div>
          <SdsAvatar
            shape="portrait"
            variant="gray"
            size="md"
            src="https://images.unsplash.com/photo-1548142542-c53707f8b05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80"
          />
        </div>
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
          variant="purple"
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
          size="lg"
          variant="black"
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
        >
          <template #cell(fruit_employee)="{ item }">
            <p class="font-bold">
              {{ item.fruit }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-500">
              Stocked by <span class="font-bold">{{ item.employee }}</span>
            </p>
          </template>
          <template #cell(actions)="{ item }">
            <button @click="edit(item.id)">
              Edit
            </button>
          </template>
          <template #drawer="{item}">
            <ul class="py-2 px-8 bg-gray-50 dark:bg-gray-850 rounded-md">
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Store:</span>
                  <span>{{ item.additionalData.store }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Aisle:</span>
                  <span>{{ item.additionalData.aisle }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Price:</span>
                  <span>{{ item.additionalData.price }}</span>
                </p>
              </li>
            </ul>
          </template>
        </SdsTable>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Top Five Chart
      </h2>
      <div>
        <SdsTopFiveChart
          :title="title"
          :entries="entries"
          :show-percent="false"
          :small-heading="false"
          variant="blue"
          :view-all-url="viewAllUrl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const datapointModelValue = ref(1451)

const fields = ref([
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

const items = ref([
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

const edit = (id: any) => {
  console.log(id)
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