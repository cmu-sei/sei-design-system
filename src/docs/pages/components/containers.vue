<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Resizer
      </h2>
      <div class="space-y-4">
        <SdsResizer
          handle="bar"
          direction="x"
          class="w-full"
        >
          <SdsTable
            :fields="fields"
            :items="items"
            enable-drawer
            class="w-full"
          >
            <template #cell(fruit_employee)="{ item }">
              <p class="font-bold">
                {{ item.fruit }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Stocked by <span class="font-bold">{{ item.employee }}</span>
              </p>
            </template>
            <template #cell(actions)="{ item }">
              <button @click="edit(item)">
                Edit
              </button>
            </template>
            <template #drawer="{item}">
              <ul class="py-2 px-8 bg-gray-25 dark:bg-gray-850 rounded-md">
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
        </SdsResizer>
        <SdsResizer
          handle="bar"
        >
          <SdsTable
            :fields="fields"
            :items="items"
            enable-drawer
            class="min-w-full"
          >
            <template #cell(fruit_employee)="{ item }">
              <p class="font-bold">
                {{ item.fruit }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Stocked by <span class="font-bold">{{ item.employee }}</span>
              </p>
            </template>
            <template #cell(actions)="{ item }">
              <button @click="edit(item)">
                Edit
              </button>
            </template>
            <template #drawer="{item}">
              <ul class="py-2 px-8 bg-gray-25 dark:bg-gray-850 rounded-md">
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
        </SdsResizer>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Modal
      </h2>
      <div>
        <SdsButton
          kind="secondary"
          @click="showModal = !showModal"
        >
          Launch a modal
        </SdsButton>
        <SdsModal
          v-model="showModal"
          size="md"
          title="Prop title"
          hide-header
        >
          <template #title>
            Slotted title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsModal>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Panel
      </h2>
      <div>
        <SdsButton
          kind="secondary"
          @click="showPanel = !showPanel"
        >
          Launch a panel
        </SdsButton>
        <SdsPanel
          v-model="showPanel"
          side="right"
          size="md"
        >
          <template #title>
            Panel title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsPanel>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Section
      </h2>
      <div class="space-y-4">
        <SdsSection type="accented">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
        <SdsSection type="raised">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
        <SdsSection type="simple">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableField, TableItem } from '../../../components/Table/Table.vue';

const showModal = ref(false)
const showPanel = ref(false)
defineOptions({
  name: 'ContainersPage'
})

definePage({
  meta: {
    title: 'Containers'
  }
})

interface AdditionalData {
  store: string;
  aisle: string;
  price: string;
}

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

useHead({
  title: 'Containers'
})
</script>
