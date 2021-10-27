import { shallowMount } from '@vue/test-utils'
import Component from "./SortableTable.vue";

describe("SortableTable.vue", () => {
  it("matches snapshot with no props assigned", () => {
    const props = {};
    const wrapper = shallowMount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot with entries and action col props assigned", () => {
    const props = {
      entries: [
        {
          id: 1,
          name: "A title",
          createdDate: "2000-01-01",
          lastUpdatedDate: "2014-11-12",
        },
        {
          id: 2,
          name: "B title",
          createdDate: "2013-02-01",
          lastUpdatedDate: "2013-10-10",
        },
      ],
      sortKey: "lastUpdatedDate",
      sortKeys: [
        { id: "name", title: "Title", type: "text", class: null },
        { id: "createdDate", title: "Created", type: "date", class: null },
        {
          id: "lastUpdatedDate",
          title: "Last modified",
          type: "date",
          class: null,
        },
      ],
    };
    const slots = {
      default: `
        <template v-slot="{entry, activeSortKey}">
          <td :class="{active: activeSortKey === 'name'}">
            {{ entry.name }}
          </td>
          <td :class="{active: activeSortKey === 'createdDate'}">
            {{ entry.createdDate }}
          </td>
          <td :class="{active: activeSortKey === 'lastUpdatedDate'}">
            {{ entry.lastUpdatedDate }}
          </td>
        </template>
      `,
    };
    const wrapper = shallowMount(Component, { props, slots });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot with entries but no action col props assigned", () => {
    const props = {
      entries: [
        {
          id: 1,
          name: "A title",
          createdDate: "2000-01-01",
          lastUpdatedDate: "2014-11-12",
        },
        {
          id: 2,
          name: "B title",
          createdDate: "2013-02-01",
          lastUpdatedDate: "2013-10-10",
        },
      ],
      sortKey: "lastUpdatedDate",
      sortKeys: [
        { id: "name", title: "Title", type: "text", class: null },
        { id: "createdDate", title: "Created", type: "date", class: null },
        {
          id: "lastUpdatedDate",
          title: "Last modified",
          type: "date",
          class: null,
        },
      ],
      showActionColumn: true,
    };
    const slots = {
      default: `
        <template v-slot="{entry, activeSortKey}">
          <td :class="{active: activeSortKey === 'name'}">
            {{ entry.name }}
          </td>
          <td :class="{active: activeSortKey === 'createdDate'}">
            {{ entry.createdDate }}
          </td>
          <td :class="{active: activeSortKey === 'lastUpdatedDate'}">
            {{ entry.lastUpdatedDate }}
          </td>
          <!-- This is the unsortable action column -->
          <td class="action-col text-right">
            <button
              class="btn btn-link text-red-300 btn-sm"
              @click="remove(entry)"
            >
              <i class="fas fa-trash"></i>
              Remove entry
            </button>
          </td>
        </template>
      `,
    };
    const wrapper = shallowMount(Component, { props, slots });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
