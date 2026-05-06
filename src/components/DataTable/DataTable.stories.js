import SdsDataTable from './DataTable.vue';
import SdsActionDropdown from '../ActionDropdown/ActionDropdown.vue';
import SdsDropdownItem from '../DropdownItem/DropdownItem.vue';
import SdsLink from '../Link/Link.vue';
import SdsAvatar from '../Avatar/Avatar.vue';
import SdsBadge from '../Badge/Badge.vue';

import { action } from 'storybook/actions';

export default {
  title: 'Patterns/Data Table',
  parameters: {
    docs: {
      description: {
        component: 'A full-featured data table with built-in support for filtering, searching, sorting, pagination, and batch selection actions.',
      },
    },
  },
  component: SdsDataTable,
  argTypes: {}
};

/**
 * Sample data used across stories
 */
const tableItems = [
  { id: 1, task: 'SDS-101', description: 'Implement responsive navigation', assignee: 'Jamie Carter', status: 'Draft', workflow: 'Open', priority: 2 },
  { id: 2, task: 'SDS-102', description: 'Refactor authentication module', assignee: 'Morgan Lee', status: 'Submitted', workflow: 'Testing', priority: 1 },
  { id: 3, task: 'SDS-103', description: 'Optimize image loading', assignee: 'Riley Thompson', status: 'Approved', workflow: 'Recently Updated', priority: 3 },
  { id: 4, task: 'SDS-104', description: 'Add accessibility features', assignee: 'Taylor Nguyen', status: 'Draft', workflow: 'Open', priority: 1 },
  { id: 5, task: 'SDS-105', description: 'Integrate third-party API', assignee: 'Casey Martinez', status: 'Submitted', workflow: 'Testing', priority: 2 },
  { id: 6, task: 'SDS-106', description: 'Update user profile page', assignee: 'Jordan Kim', status: 'Approved', workflow: 'Recently Updated', priority: 3 },
  { id: 7, task: 'SDS-107', description: 'Fix mobile layout issues', assignee: 'Alex Patel', status: 'Draft', workflow: 'Open', priority: 1 },
  { id: 8, task: 'SDS-108', description: 'Implement dark mode', assignee: 'Samira Hassan', status: 'Submitted', workflow: 'Testing', priority: 2 },
  { id: 9, task: 'SDS-109', description: 'Set up CI/CD pipeline', assignee: 'Chris Walker', status: 'Approved', workflow: 'Recently Updated', priority: 1 },
  { id: 10, task: 'SDS-110', description: 'Improve form validation', assignee: 'Jamie Carter', status: 'Draft', workflow: 'Open', priority: 3 },
  { id: 11, task: 'SDS-111', description: 'Create dashboard analytics', assignee: 'Morgan Lee', status: 'Submitted', workflow: 'Testing', priority: 2 },
  { id: 12, task: 'SDS-112', description: 'Implement file uploader', assignee: 'Riley Thompson', status: 'Approved', workflow: 'Recently Updated', priority: 1 },
  { id: 13, task: 'SDS-113', description: 'Add multi-language support', assignee: 'Taylor Nguyen', status: 'Draft', workflow: 'Open', priority: 3 },
  { id: 14, task: 'SDS-114', description: 'Redesign landing page', assignee: 'Casey Martinez', status: 'Submitted', workflow: 'Testing', priority: 1 },
  { id: 15, task: 'SDS-115', description: 'Integrate payment gateway', assignee: 'Jordan Kim', status: 'Approved', workflow: 'Recently Updated', priority: 2 },
  { id: 16, task: 'SDS-116', description: 'Fix broken links', assignee: 'Alex Patel', status: 'Draft', workflow: 'Open', priority: 2 },
  { id: 17, task: 'SDS-117', description: 'Add user notifications', assignee: 'Samira Hassan', status: 'Submitted', workflow: 'Testing', priority: 3 },
  { id: 18, task: 'SDS-118', description: 'Implement search functionality', assignee: 'Chris Walker', status: 'Approved', workflow: 'Recently Updated', priority: 1 },
  { id: 19, task: 'SDS-119', description: 'Update documentation', assignee: 'Jamie Carter', status: 'Draft', workflow: 'Open', priority: 3 },
  { id: 20, task: 'SDS-120', description: 'Add role-based access control', assignee: 'Morgan Lee', status: 'Submitted', workflow: 'Testing', priority: 1 },
  { id: 21, task: 'SDS-121', description: 'Improve loading performance', assignee: 'Riley Thompson', status: 'Approved', workflow: 'Recently Updated', priority: 2 },
  { id: 22, task: 'SDS-122', description: 'Implement drag-and-drop', assignee: 'Taylor Nguyen', status: 'Draft', workflow: 'Open', priority: 1 },
  { id: 23, task: 'SDS-123', description: 'Add audit logging', assignee: 'Casey Martinez', status: 'Submitted', workflow: 'Testing', priority: 2 },
  { id: 24, task: 'SDS-124', description: 'Refactor state management', assignee: 'Jordan Kim', status: 'Approved', workflow: 'Recently Updated', priority: 3 },
  { id: 25, task: 'SDS-125', description: 'Integrate maps feature', assignee: 'Alex Patel', status: 'Draft', workflow: 'Open', priority: 2 },
];

const tableFields = [
  { key: 'task', label: 'Task', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'assignee', label: 'Assignee', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
];

const sortByOptions = [
  { id: 'task', value: 'task', label: 'Task', type: 'alpha' },
  { id: 'assignee', value: 'assignee', label: 'Assignee', type: 'alpha' },
  { id: 'status', value: 'status', label: 'Status', type: 'alpha' },
  { id: 'priority', value: 'priority', label: 'Priority', type: 'numerical' },
];

const filterConfigs = [
  {
    key: 'workflow',
    label: 'Workflow',
    type: 'segment',
    segments: [
      { label: 'Open', selected: false },
      { label: 'Testing', selected: false },
      { label: 'Recently Updated', selected: false },
    ]
  },
  {
    key: 'assignee',
    label: 'Assignee',
    type: 'dropdown',
    options: [
      { id: 1, text: 'Jamie Carter', selected: false },
      { id: 2, text: 'Morgan Lee', selected: false },
      { id: 3, text: 'Riley Thompson', selected: false },
      { id: 4, text: 'Taylor Nguyen', selected: false },
      { id: 5, text: 'Casey Martinez', selected: false },
      { id: 6, text: 'Jordan Kim', selected: false },
      { id: 7, text: 'Alex Patel', selected: false },
      { id: 8, text: 'Samira Hassan', selected: false },
      { id: 9, text: 'Chris Walker', selected: false },
    ]
  },
  {
    key: 'status',
    label: 'Status',
    type: 'dropdown',
    options: [
      { id: 1, text: 'Submitted', selected: false },
      { id: 2, text: 'Approved', selected: false },
      { id: 3, text: 'Draft', selected: false },
    ]
  }
];

function chunkArray(arr, size) {
  return arr.reduce((acc, val, i) => {
    const index = Math.floor(i / size);
    if (!acc[index]) acc[index] = [];
    acc[index].push(val);
    return acc;
  }, []);
}

/**
 * Shared cell template markup used across stories for consistent styling
 */
const cellTemplates = `
      <template #cell(task)="{ item }">
        <sds-link
          href="#"
          kind="primary"
          type="standalone"
          variant="blue"
          size="md"
        >
          {{ item.task }}
        </sds-link>
      </template>
      <template #cell(assignee)="{ item }">
        <div class="flex flex-row gap-2 items-center">
          <sds-avatar
            :name="item.assignee"
            shape="circle"
            size="sm"
            variant="gray"
          />
          <span>{{ item.assignee }}</span>
        </div>
      </template>
      <template #cell(status)="{ item }">
        <sds-badge v-bind="getBadgeVariant(item.status)">
          {{ item.status }}
        </sds-badge>
      </template>
`;

/**
 * Shared getBadgeVariant helper
 */
function getBadgeVariant(status) {
  switch (status?.toLowerCase()) {
    case 'submitted': return { type: 'light-border', variant: 'blue' };
    case 'approved': return { type: 'light-border', variant: 'green' };
    case 'draft':
    default: return { type: 'light-border', variant: 'yellow' };
  }
}

/**
 * Default story — full-featured DataTable with pagination, filters, search, and sort
 */
const DefaultTemplate = (args) => ({
  components: { SdsDataTable, SdsDropdownItem, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      :filters="localFilters"
      :search="true"
      :sort-by="sortByConfig"
      :enable-batch-selection="true"
      :batch-selection-actions="batchActions"
      @update:filters="onUpdateFilters"
      @update:search-query="onUpdateSearchQuery"
      @update:sort-by="onUpdateSortBy"
      @update:pagination="onUpdatePagination"
      @update:selected-items="onUpdateSelectedItems"
    >
      ${cellTemplates}
      <template #ellipsis-menu-items>
        <sds-dropdown-item tag="button" @click="onExport">Export</sds-dropdown-item>
        <sds-dropdown-item tag="button" @click="onPrint">Print</sds-dropdown-item>
      </template>
    </sds-data-table>
  `,
  data() {
    return {
      localFilters: JSON.parse(JSON.stringify(args.filters || [])),
      currentPage: 1,
      pageSize: 10,
      originalItems: [...args.items || []],
      filteredItems: [...args.items || []],
      searchTerm: '',
      sortByValue: null,
      sortBy: 'task',
      sortDesc: false,
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.filteredItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        onSort: this.onSort,
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length || 1,
        totalResultsPerPage: this.pageSize,
        totalResults: this.filteredItems.length,
      };
    },
    sortByConfig() {
      return {
        options: args.sortByOptions || [],
        value: this.sortByValue,
        title: 'Sort by',
      };
    },
    batchActions() {
      return [
        { label: 'Duplicate', action: (ids) => alert('Duplicate: ' + ids.join(', ')), kind: 'ghost', variant: 'gray', size: 'xs' },
        { label: 'Delete', action: (ids) => alert('Delete: ' + ids.join(', ')), kind: 'ghost', variant: 'red', size: 'xs' },
      ];
    },
  },
  methods: {
    applyFiltersAndSearch() {
      let items = [...this.originalItems];

      // Apply search
      if (this.searchTerm && this.searchTerm.length > 0) {
        const query = this.searchTerm.toLowerCase();
        items = items.filter((item) =>
          ['task', 'description', 'assignee'].some((field) =>
            String(item[field]).toLowerCase().includes(query)
          )
        );
      }

      // Apply filters
      this.localFilters.forEach((filter) => {
        if (filter.type === 'segment' && filter.segments) {
          const selectedSegment = filter.segments.find((s) => s.selected);
          if (selectedSegment && selectedSegment.label !== 'All') {
            items = items.filter((item) => item[filter.key] === selectedSegment.label);
          }
        } else if (filter.type === 'dropdown' && filter.options) {
          const selectedOptions = filter.options.filter((o) => o.selected).map((o) => o.text);
          if (selectedOptions.length > 0) {
            items = items.filter((item) => selectedOptions.includes(item[filter.key]));
          }
        }
      });

      this.filteredItems = items;
      this.currentPage = 1;
    },
    onUpdateFilters(updatedFilters) {
      this.localFilters = JSON.parse(JSON.stringify(updatedFilters));
      this.applyFiltersAndSearch();
      action('update:filters')(updatedFilters);
    },
    onUpdateSearchQuery(query) {
      this.searchTerm = query || '';
      this.applyFiltersAndSearch();
      action('update:search-query')(query);
    },
    onUpdateSortBy(model) {
      this.sortByValue = model;
      if (model && model.sortBy && model.orderBy) {
        const field = model.sortBy;
        const isDescending = model.orderBy.endsWith(':descending');
        this.filteredItems.sort((a, b) => {
          const aVal = String(a[field] || '');
          const bVal = String(b[field] || '');
          return isDescending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        });
      }
      action('update:sort-by')(model);
    },
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
    onUpdateSelectedItems: action('update:selected-items'),
    onExport() { alert('Export') },
    onPrint() { alert('Print') },
    onSort({ sortBy, sortDesc }) {
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
      this.filteredItems.sort((a, b) => {
        const aVal = String(a[sortBy] || '');
        const bVal = String(b[sortBy] || '');
        return sortDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      });
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  items: tableItems,
  fields: tableFields,
  filters: filterConfigs,
  sortByOptions: sortByOptions,
};

/**
 * Minimal — DataTable with only table data and pagination (no filters, search, or sort)
 */
const MinimalTemplate = (args) => ({
  components: { SdsDataTable, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      @update:pagination="onUpdatePagination"
    >
      ${cellTemplates}
    </sds-data-table>
  `,
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      allItems: [...args.items || []],
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.allItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length,
        totalResultsPerPage: this.pageSize,
        totalResults: this.allItems.length,
      };
    },
  },
  methods: {
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
  },
});

export const Minimal = MinimalTemplate.bind({});
Minimal.args = {
  items: tableItems,
  fields: tableFields,
};
Minimal.parameters = {
  docs: {
    description: {
      story: 'A minimal DataTable with only table data and pagination — no filters, search, or sort controls.',
    },
  },
};

/**
 * WithSearch — DataTable with search enabled
 */
const WithSearchTemplate = (args) => ({
  components: { SdsDataTable, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      :search="true"
      @update:search-query="onUpdateSearchQuery"
      @update:pagination="onUpdatePagination"
    >
      ${cellTemplates}
    </sds-data-table>
  `,
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      allItems: [...args.items || []],
      filteredItems: [...args.items || []],
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.filteredItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length || 1,
        totalResultsPerPage: this.pageSize,
        totalResults: this.filteredItems.length,
      };
    },
  },
  methods: {
    onUpdateSearchQuery(query) {
      if (query && query.length > 0) {
        this.filteredItems = this.allItems.filter((item) =>
          ['task', 'description', 'assignee'].some((field) =>
            String(item[field]).toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        this.filteredItems = [...this.allItems];
      }
      this.currentPage = 1;
      action('update:search-query')(query);
    },
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
  },
});

export const WithSearch = WithSearchTemplate.bind({});
WithSearch.args = {
  items: tableItems,
  fields: tableFields,
};
WithSearch.parameters = {
  docs: {
    description: {
      story: 'DataTable with search functionality enabled. Type in the search box to filter results across task, description, and assignee fields.',
    },
  },
};

/**
 * WithFilters — DataTable with segment and dropdown filters
 */
const WithFiltersTemplate = (args) => ({
  components: { SdsDataTable, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      :filters="localFilters"
      @update:filters="onUpdateFilters"
      @update:pagination="onUpdatePagination"
    >
      ${cellTemplates}
    </sds-data-table>
  `,
  data() {
    return {
      localFilters: JSON.parse(JSON.stringify(args.filters || [])),
      currentPage: 1,
      pageSize: 10,
      originalItems: [...args.items || []],
      filteredItems: [...args.items || []],
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.filteredItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length || 1,
        totalResultsPerPage: this.pageSize,
        totalResults: this.filteredItems.length,
      };
    },
  },
  methods: {
    applyFilters() {
      let items = [...this.originalItems];
      this.localFilters.forEach((filter) => {
        if (filter.type === 'segment' && filter.segments) {
          const selectedSegment = filter.segments.find((s) => s.selected);
          if (selectedSegment && selectedSegment.label !== 'All') {
            items = items.filter((item) => item[filter.key] === selectedSegment.label);
          }
        } else if (filter.type === 'dropdown' && filter.options) {
          const selectedOptions = filter.options.filter((o) => o.selected).map((o) => o.text);
          if (selectedOptions.length > 0) {
            items = items.filter((item) => selectedOptions.includes(item[filter.key]));
          }
        }
      });
      this.filteredItems = items;
      this.currentPage = 1;
    },
    onUpdateFilters(updatedFilters) {
      this.localFilters = JSON.parse(JSON.stringify(updatedFilters));
      this.applyFilters();
      action('update:filters')(updatedFilters);
    },
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
  },
});

export const WithFilters = WithFiltersTemplate.bind({});
WithFilters.args = {
  items: tableItems,
  fields: tableFields,
  filters: filterConfigs,
};
WithFilters.parameters = {
  docs: {
    description: {
      story: 'DataTable with segment filters (Workflow) and dropdown filters (Assignee, Status). Selecting "All" in the segment resets that filter.',
    },
  },
};

/**
 * WithBatchSelection — DataTable with batch selection and actions
 */
const WithBatchSelectionTemplate = (args) => ({
  components: { SdsDataTable, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      :search="true"
      :enable-batch-selection="true"
      :batch-selection-actions="batchActions"
      @update:search-query="onUpdateSearchQuery"
      @update:pagination="onUpdatePagination"
      @update:selected-items="onUpdateSelectedItems"
    >
      ${cellTemplates}
    </sds-data-table>
  `,
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      originalItems: [...args.items || []],
      allItems: [...args.items || []],
      selectedItems: [],
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.allItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length || 1,
        totalResultsPerPage: this.pageSize,
        totalResults: this.allItems.length,
      };
    },
    batchActions() {
      return [
        { label: 'Duplicate', action: this.duplicateItems, kind: 'ghost', variant: 'gray', size: 'xs' },
        { label: 'Edit', action: this.editItems, kind: 'ghost', variant: 'gray', size: 'xs' },
        { label: 'Delete', action: this.deleteItems, kind: 'ghost', variant: 'red', size: 'xs' },
      ];
    },
  },
  methods: {
    duplicateItems(ids) {
      const itemsToDuplicate = this.originalItems.filter((item) => ids.includes(item.id));
      const maxId = Math.max(...this.originalItems.map((item) => item.id));
      const duplicates = itemsToDuplicate.map((item, index) => ({
        ...item,
        id: maxId + index + 1,
        task: item.task + ' (copy)',
      }));
      this.originalItems = [...this.originalItems, ...duplicates];
      this.allItems = [...this.originalItems];
      action('batch:duplicate')(ids);
    },
    editItems(ids) {
      alert('Editing items: ' + ids.join(', '));
      action('batch:edit')(ids);
    },
    deleteItems(ids) {
      this.originalItems = this.originalItems.filter((item) => !ids.includes(item.id));
      this.allItems = [...this.originalItems];
      this.currentPage = 1;
      action('batch:delete')(ids);
    },
    onUpdateSearchQuery(query) {
      if (query && query.length > 0) {
        this.allItems = this.originalItems.filter((item) =>
          ['task', 'description', 'assignee'].some((field) =>
            String(item[field]).toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        this.allItems = [...this.originalItems];
      }
      this.currentPage = 1;
      action('update:search-query')(query);
    },
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
    onUpdateSelectedItems(items) {
      this.selectedItems = items.filter((item) => item.selected);
      action('update:selected-items')(items);
    },
  },
});

export const WithBatchSelection = WithBatchSelectionTemplate.bind({});
WithBatchSelection.args = {
  items: tableItems,
  fields: tableFields,
};
WithBatchSelection.parameters = {
  docs: {
    description: {
      story: 'DataTable with batch selection enabled. Select one or more rows to reveal batch action buttons. Duplicate adds copies, Delete removes items from the table.',
    },
  },
};

/**
 * WithSortByDropdown — DataTable with sort-by dropdown control
 */
const WithSortByDropdownTemplate = (args) => ({
  components: { SdsDataTable, SdsLink, SdsAvatar, SdsBadge },
  setup() {
    return { args, getBadgeVariant }
  },
  template: `
    <sds-data-table
      :table-data="tableData"
      :pagination="pagination"
      :sort-by="sortByConfig"
      @update:sort-by="onUpdateSortBy"
      @update:pagination="onUpdatePagination"
    >
      ${cellTemplates}
    </sds-data-table>
  `,
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      allItems: [...args.items || []],
      sortByValue: null,
    }
  },
  computed: {
    chunks() {
      return chunkArray(this.allItems, this.pageSize);
    },
    tableData() {
      return {
        fields: args.fields || [],
        items: this.chunks[this.currentPage - 1] || [],
      };
    },
    pagination() {
      return {
        currentPage: this.currentPage,
        totalPages: this.chunks.length || 1,
        totalResultsPerPage: this.pageSize,
        totalResults: this.allItems.length,
      };
    },
    sortByConfig() {
      return {
        options: args.sortByOptions || [],
        value: this.sortByValue,
        title: 'Sort by',
      };
    },
  },
  methods: {
    onUpdateSortBy(model) {
      this.sortByValue = model;
      if (model && model.sortBy && model.orderBy) {
        const field = model.sortBy;
        const isDescending = model.orderBy.endsWith(':descending');
        this.allItems.sort((a, b) => {
          if (field === 'priority') {
            return isDescending ? a[field] - b[field] : b[field] - a[field];
          }
          const aVal = String(a[field] || '');
          const bVal = String(b[field] || '');
          return isDescending ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        });
      }
      action('update:sort-by')(model);
    },
    onUpdatePagination(newPagination) {
      this.currentPage = newPagination.currentPage;
      this.pageSize = newPagination.totalResultsPerPage;
      action('update:pagination')(newPagination);
    },
  },
});

export const WithSortByDropdown = WithSortByDropdownTemplate.bind({});
WithSortByDropdown.args = {
  items: tableItems,
  fields: tableFields,
  sortByOptions: sortByOptions,
};
WithSortByDropdown.parameters = {
  docs: {
    description: {
      story: 'DataTable with a sort-by dropdown. Use the dropdown icon to select a field and direction to sort the table data.',
    },
  },
};
