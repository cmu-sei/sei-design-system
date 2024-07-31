<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Resizer
      </h2>
      <div class="space-y-4 max-w-full">
        <div class="flex flex-row gap-y-4 flex-wrap justify-start max-w-full">
          <SdsResizer
            class="bg-teal-25 dark:bg-teal-900 mr-4"
            direction="right"
            :initial="300"
            :max="400"
          >
            <div class="justify-start max-h-40">
              <div class="pt-4 px-4 overflow-x-auto">
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                  <span class="inline-block h-4 w-full" />
                </p>
              </div>
            </div>
          </SdsResizer>
          <SdsResizer
            class="bg-teal-25 dark:bg-teal-900 mr-4"
            direction="right"
            :initial="300"
          >
            <div class="justify-start h-fit">
              <div class="line-clamp-6 p-4 overflow-y-scroll h-fit">
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                  <span class="inline-block h-4 w-full" />
                </p>
              </div>
            </div>
          </SdsResizer>
        </div>
        <div class="flex flex-col">
          <SdsResizer
            :initial="100"
            :clamp="false"
            class="mb-1 bg-indigo-25 dark:bg-indigo-900 mb-4"
          >
            <div class="justify-start p-4 h-fit overflow-y-hidden">
              <div class="h-fit">
                <h1 class="text-xl font-bold">
                  Top resizable container with fixed initial height
                </h1>
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                </p>
              </div>
            </div>
          </SdsResizer>
          <SdsResizer
            :clamp="false"
            class="bg-indigo-25 dark:bg-indigo-900 mb-4"
          >
            <div class="justify-start p-4 h-fit overflow-y-hidden">
              <div class="h-fit">
                <h1 class="text-xl font-bold">
                  Bottom resizable container that fits all the content
                </h1>
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                </p>
              </div>
            </div>
          </SdsResizer>
        </div>
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
