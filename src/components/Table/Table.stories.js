import SdsTable from './Table.vue';

export default {
  title: 'Data Visualization/Table',
  parameters: {
    docs: {
      description: {
        component: 'A table shows information in columns and rows and can be sorted by the column.',
      },
    },
  },
  component: SdsTable,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsTable },
  setup() {
    return { args }
  },
  template: `
    <sds-table v-bind="args">
      <template #cell(title)="{ item, value, format }">
        <p>{{ value }}</p>
        <p class="text-sm text-gray-500">
          ID: {{ item.id }} was created on {{ format('createdDate') }}
        </p>
      </template>
      <template #cell(actions)="{ item }">
        <button @click="edit(item.id)">Edit</button>
      </template>
      <template #drawer="{item}">
        <ul class="h-24">
          <li><p><span class="font-bold">Store: </span>{{item.additionalData.store}}</p></li>
          <li><p><span class="font-bold">Aisle: </span>{{item.additionalData.aisle}}</p></li>
          <li><p><span class="font-bold">Price: </span>{{item.additionalData.price}}</p></li>
        </ul>
      </template>
    </sds-table>
  `,
  methods: {
    edit (id) {
      console.log(id)
    }
  }
});

export const Default = Template.bind({});
Default.args = {
  fields: [
    { key: "id", label: 'ID' },
    { key: "title", label: 'Title', sortable: true },
    { key: "lastDelivered", label: 'Last Delivered', sortable: true, format: (date) => date.toLocaleDateString() },
    { key: "createdDate", label: 'Created Date', hidden: true, format: (date) => date.toLocaleDateString() },
    { key: 'actions', label: 'Actions' }
  ],
  items: [
    { id: 1, title: "Apple", lastDelivered: new Date("01/01/2019"), createdDate: new Date("02/23/2009"), additionalData: {store: 'Giant Eagle', aisle: '13', price: '1.00' } },
    { id: 2, title: "Banana", lastDelivered: new Date("10/01/2020"), createdDate: new Date("05/13/2010"), additionalData: {store: 'Aldi', aisle: '10', price: '1.04' } },
    { id: 3, title: "Cantaloupe", lastDelivered: new Date("12/01/2020"), createdDate: new Date("01/13/2012"), additionalData: {store: 'Wal-Mart', aisle: '1', price: '0.99' } },
    { id: 4, title: "Durian", lastDelivered: new Date("02/01/2021"), createdDate: new Date("12/09/2013"), additionalData: {store: 'Sams Club', aisle: '3', price: '1.23' } },
    { id: 5, title: "Elderberry", lastDelivered: new Date("01/01/2019"), createdDate: new Date("04/10/2017"), additionalData: {store: 'Foodland', aisle: '5', price: '2.00' } },
  ],
  enableDrawer: true,
  sortBy: 'lastDelivered',
  sortDesc: true
};

