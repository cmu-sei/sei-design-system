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

const Template = (args, { argTypes }) => ({
  components: { SdsSortableTable },
  props: Object.keys(argTypes),
  setup() {
    return { ...args }
  },
  template: `
    <sds-sortable-table v-bind="$props">
      <template #default="{ entry, activeSortKey }">
        <td>{{ entry.id }}</td>
        <td>{{ entry.title }}</td>
        <td>{{ entry.lastModified }}</td>
        <td>Buttons would go here for item {{ entry.id }}</td>
      </template>
    </sds-sortable-table>
  `
});

export const Default = Template.bind({});
Default.args = {
  entries: [
    { id: 1, title: "Item 1", lastModified: "01/01/2019" },
    { id: 2, title: "Item 2", lastModified: "01/01/2020" },
    { id: 3, title: "Alpha Item", lastModified: "10/12/2020" },
    { id: 4, title: "Zeta Item", lastModified: "01/01/2020" },
  ],
  sortKey: 'title',
  sortKeys: [
    { id: "id", title: "ID", type: "number" },
    { id: "title", title: "Title", type: "string" },
    { id: "lastModified", title: "Last Modified", type: "date" },
  ],
  showActionCol: true
};

