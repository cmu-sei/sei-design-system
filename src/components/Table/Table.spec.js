import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./Table.vue";

const items = [
  {
    id: 1,
    name: "A title",
    createdDate: new Date("2000-01-01"),
    lastUpdatedDate: new Date("2014-11-12"),
  },
  {
    id: 2,
    name: "B title",
    createdDate: new Date("2013-02-01"),
    lastUpdatedDate: new Date("2013-10-10"),
  },
]

const fields = [
  { key: "name", label: "Title", sortable: true },
  { key: "createdDate", label: "Created", sortable: true, format: (date) => date.toLocaleDateString() },
  {
    key: "lastUpdatedDate",
    label: "Last modified",
    sortable: true, format: (date) => date.toLocaleDateString()
  }
]

describe("Table.vue", () => {
  it("matches snapshot with no props assigned", () => {
    const props = {};
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot with items and action col props assigned", () => {
    const props = {
      items: [...items],
      fields: [...fields],
      sortBy: "lastUpdatedDate"
    };
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches snapshot with entries but no action col props assigned", () => {
    const props = {
      enableDrawer: false,
      items: [...items],
      fields: [...fields, { key: "actions", label: "Actions" }]
    };
    const slots = {
      'cell(actions)': `
        <template #cell(actions)="{item}">
          <button
            class="btn btn-link text-red-300 btn-sm"
            @click="remove(entry)"
          >
            <i class="fas fa-trash"></i>
            Remove entry
          </button>
        </template>
      `,
    };
    const wrapper = mount(Component, { props, slots });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot with caption', () => {
    const props = {
      items: [...items],
      fields: [...fields],
      caption: 'Caption'
    };
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('matches snapshot with assigned `enableDrawer` prop', () => {
    const props = {
      enableDrawer: true,
      items: [...items.map((i) => ({ ...i, additionalData: { description: 'Lorem ipsum dolor sit amet' } }))],
      fields: [...fields]
    };
    const slots = {
      'cell(drawer)': `
        <template #drawer="{ item }">
          <p>{{ item.additionalData.description }}</p>
        </template>
      `
    };
    const wrapper = mount(Component, { props, slots });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('emits when toggling a table drawer', async () => {
    const props = {
      enableDrawer: true,
      items: [...items.map((i) => ({ ...i, additionalData: { description: 'Lorem ipsum dolor sit amet' } }))],
      fields: [...fields]
    };
    const slots = {
      'cell(drawer)': `
        <template #drawer="{ item }">
          <p>{{ item.additionalData.description }}</p>
        </template>
      `
    };
    const wrapper = mount(Component, { props, slots });
    const button = wrapper.find('table tbody tr:nth-child(1) td:nth-child(1) button')
    await button.trigger('click')
    expect(wrapper.emitted()['open-drawer'][0][0]).toStrictEqual(props.items[0])
  })
});
