import SdsSortableTable from './SortableTable.vue';

export default {
  title: 'Data Visualization/SortableTable',
  parameters: {
    docs: {
      description: {
        component: 'A table that allows for column sorting.',
      },
    },
  },
  component: SdsSortableTable,
  argTypes: {}
};

const Template = (args) => ({
  components: { SdsSortableTable },
  setup() {
    return { args }
  },
  template: `
    <sds-sortable-table v-bind="args">
      <template #default="{ entry, activeSortKey }">
        <td>{{ entry.id }}</td>
        <td>{{ entry.title }}</td>
        <td>{{ entry.lastDelivered }}</td>
        <td>Include action buttons like Delete or Edit for Apple in this column.</td>
      </template>
    </sds-sortable-table>
  `
});

export const Default = Template.bind({});
Default.args = {
  entries: [
    { id: 1, title: "Apple", lastDelivered: "01/01/2019" },
    { id: 2, title: "Banana", lastDelivered: "10/01/2020" },
    { id: 3, title: "Cantaloupe", lastDelivered: "12/01/2020" },
    { id: 4, title: "Durian", lastDelivered: "02/01/2021" },
    { id: 5, title: "Elderberry", lastDelivered: "01/01/2019" },
  ],
  sortKey: 'title',
  sortKeys: [
    { id: "id", title: "ID", type: "number" },
    { id: "title", title: "Title", type: "string" },
    { id: "lastDelivered", title: "Last Delivered", type: "date" },
  ],
  showActionColumn: true
};

