<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar
      </h2>
      <div>
        <SdsAvatar
          shape="circle"
          variant="gray"
          size="lg"
          name="John Smith"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Badge
      </h2>
      <div>
        <SdsBadge
          type="medium"
          variant="purple"
        >
          Badge
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