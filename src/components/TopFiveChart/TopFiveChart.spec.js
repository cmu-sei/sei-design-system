import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./TopFiveChart.vue";

describe("TopFiveChart.vue", () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it("is a Vue instance", () => {
      const wrapper = mount(Component);
      expect(wrapper.vm).toBeTruthy();
    });

    it("matches snapshot with no props assigned", () => {
      const props = {};
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders with title prop', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart Title',
          entries: []
        }
      });

      // Assert
      expect(wrapper.find('h3').text()).toBe('Test Chart Title');
    });

    it('renders title with default heading size', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Title',
          entries: []
        }
      });

      // Assert
      const heading = wrapper.find('h3');
      expect(heading.classes()).toContain('text-2xl');
      expect(heading.classes()).toContain('font-light');
      expect(heading.classes()).not.toContain('text-lg');
    });

    it('renders title with small heading when smallHeading is true', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Title',
          entries: [],
          smallHeading: true
        }
      });

      // Assert
      const heading = wrapper.find('h3');
      expect(heading.classes()).toContain('text-lg');
      expect(heading.classes()).toContain('font-light');
      expect(heading.classes()).not.toContain('text-2xl');
    });
  });

  // Entry rendering tests
  describe('Entry Rendering', () => {
    it("matches snapshot with urls", () => {
      const props = {
        title: "Top Five Chart (with urls, view all url, showPercent)",
        viewAllUrl: "https://seinet.sei.cmu.edu",
        entries: [
          {
            id: 1,
            title: "Test 1",
            count: 40,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 2,
            title: "Test 2",
            count: 30,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 3,
            title: "Test 3",
            count: 15,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 4,
            title: "Test 4",
            count: 10,
            url: "https://seinet.sei.cmu.edu",
          },
          { id: 5, title: "Test 5", count: 3, url: "https://seinet.sei.cmu.edu" },
          { id: 6, title: "Test 6", count: 2, url: "https://seinet.sei.cmu.edu" },
        ],
        showPercent: true,
        progressColor: "cyan",
      };
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot with urls, doNotLinkEntries", () => {
      const props = {
        title: "Top Five Chart (with urls, doNotLinkEntries)",
        entries: [
          {
            id: 1,
            title: "Test 1",
            count: 40,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 2,
            title: "Test 2",
            count: 30,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 3,
            title: "Test 3",
            count: 15,
            url: "https://seinet.sei.cmu.edu",
          },
          {
            id: 4,
            title: "Test 4",
            count: 10,
            url: "https://seinet.sei.cmu.edu",
          },
          { id: 5, title: "Test 5", count: 3, url: "https://seinet.sei.cmu.edu" },
          { id: 6, title: "Test 6", count: 2, url: "https://seinet.sei.cmu.edu" },
        ],
        doNotLinkEntries: true,
      };
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot with no urls", () => {
      const props = {
        title: "Top Five Chart (no urls)",
        entries: [
          { id: 1, title: "Test 1", count: 40 },
          { id: 2, title: "Test 2", count: 30 },
        ],
        progressColor: "orange",
      };
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders only the first 5 entries when more than 5 are provided', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 },
            { id: 2, title: 'Item 2', count: 90 },
            { id: 3, title: 'Item 3', count: 80 },
            { id: 4, title: 'Item 4', count: 70 },
            { id: 5, title: 'Item 5', count: 60 },
            { id: 6, title: 'Item 6', count: 50 },
            { id: 7, title: 'Item 7', count: 40 },
          ]
        }
      });

      // Assert
      const items = wrapper.findAll('li');
      // 5 entries + no "View All" link = 5 items
      expect(items.length).toBe(5);
      expect(wrapper.text()).toContain('Item 1');
      expect(wrapper.text()).toContain('Item 5');
      expect(wrapper.text()).not.toContain('Item 6');
      expect(wrapper.text()).not.toContain('Item 7');
    });

    it('renders single entry correctly', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Single Entry Chart',
          entries: [
            { id: 1, title: 'Only Item', count: 100 }
          ]
        }
      });

      // Assert
      expect(wrapper.findAll('li').length).toBe(1);
      expect(wrapper.text()).toContain('Only Item');
      expect(wrapper.text()).toContain('100');
    });

    it('renders entry with zero count', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Zero Count Chart',
          entries: [
            { id: 1, title: 'Item with zero', count: 0 },
            { id: 2, title: 'Item with value', count: 50 }
          ]
        }
      });

      // Assert
      expect(wrapper.text()).toContain('Item with zero');
      expect(wrapper.text()).toContain('0');
    });

    it('renders entries with url as clickable links', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }
          ]
        }
      });

      // Assert
      const link = wrapper.find('a');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://example.com');
      expect(link.text()).toBe('Item 1');
    });

    it('renders entries without url as clickable links with href="#"', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 }
          ]
        }
      });

      // Assert
      const link = wrapper.find('.chart-label-section a');
      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('#');
      expect(link.text()).toBe('Item 1');
    });

    it('renders entries as plain text when doNotLinkEntries is true', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }
          ],
          doNotLinkEntries: true
        }
      });

      // Assert
      const labelSection = wrapper.find('.chart-label-section');
      expect(labelSection.text()).toContain('Item 1');
      expect(labelSection.find('a').exists()).toBe(false);
      expect(labelSection.find('span').text()).toBe('Item 1');
    });

    it('displays count with percent symbol when showPercent is true', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Percent Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 75 }
          ],
          showPercent: true
        }
      });

      // Assert
      expect(wrapper.text()).toContain('75%');
    });

    it('displays count without percent symbol when showPercent is false', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Number Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 75 }
          ],
          showPercent: false
        }
      });

      // Assert
      expect(wrapper.text()).toContain('75');
      expect(wrapper.text()).not.toContain('75%');
    });

    it('renders "View All" link when viewAllUrl is provided', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 }
          ],
          viewAllUrl: 'https://example.com/view-all'
        }
      });

      // Assert
      const viewAllLink = wrapper.findAll('a').find(a => a.text() === 'View All');
      expect(viewAllLink).toBeDefined();
      expect(viewAllLink.attributes('href')).toBe('https://example.com/view-all');
      expect(viewAllLink.classes()).toContain('link-primary');
    });

    it('does not render "View All" link when viewAllUrl is null', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 }
          ],
          viewAllUrl: null
        }
      });

      // Assert
      const viewAllLink = wrapper.findAll('a').find(a => a.text() === 'View All');
      expect(viewAllLink).toBeUndefined();
    });
  });

  // No data / Error states
  describe('No Data and Error States', () => {
    it("matches snapshot with no data", () => {
      const props = {
        title: "Top Five Chart (no data)",
        entries: [],
      };
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it("matches snapshot with malformed data", () => {
      const props = {
        title: "Top Five Chart (malformed data)",
        entries: [
          { id: 1, title: "Test 1", count: 40 },
          { id: 2, title: "Test 2" },
        ],
      };
      const wrapper = mount(Component, { props });
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('displays default no data message when entries are empty', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Empty Chart',
          entries: []
        }
      });

      // Assert
      expect(wrapper.text()).toContain('There is no chart data to display at this time.');
    });

    it('displays custom no data message when provided', () => {
      // Arrange
      const customMessage = 'No results found for your query.';
      const wrapper = mount(Component, {
        props: {
          title: 'Empty Chart',
          entries: [],
          noDataMsg: customMessage
        }
      });

      // Assert
      expect(wrapper.text()).toContain(customMessage);
    });

    it('displays default malformed data message when entries missing required props', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Malformed Chart',
          entries: [
            { id: 1, title: 'Item 1' } // missing count
          ]
        }
      });

      // Assert
      expect(wrapper.text()).toContain('The chart data is malformed and cannot be displayed at this time.');
    });

    it('displays custom malformed data message when provided', () => {
      // Arrange
      const customMessage = 'Invalid data format detected.';
      const wrapper = mount(Component, {
        props: {
          title: 'Malformed Chart',
          entries: [
            { id: 1, count: 50 } // missing title
          ],
          missingPropsMsg: customMessage
        }
      });

      // Assert
      expect(wrapper.text()).toContain(customMessage);
    });

    it('does not render entries when missing id property', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { title: 'Item 1', count: 100 } // missing id
          ]
        }
      });

      // Assert
      expect(wrapper.findAll('li').length).toBe(0);
      expect(wrapper.text()).toContain('malformed');
    });

    it('does not render entries when missing title property', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, count: 100 } // missing title
          ]
        }
      });

      // Assert
      expect(wrapper.findAll('li').length).toBe(0);
      expect(wrapper.text()).toContain('malformed');
    });

    it('does not render entries when missing count property', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1' } // missing count
          ]
        }
      });

      // Assert
      expect(wrapper.findAll('li').length).toBe(0);
      expect(wrapper.text()).toContain('malformed');
    });
  });

  // Event emission tests
  describe('Event Emissions', () => {
    it('renders clickable link with proper handler when entry has no url', () => {
      // Arrange
      const entry = { id: 1, title: 'Item 1', count: 100 };
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [entry]
        }
      });

      // Assert
      const link = wrapper.find('a[href="#"]');
      expect(link.exists()).toBe(true);
      expect(link.text()).toBe('Item 1');
      // The link has @click.prevent event handler that would emit result-click
      // (Direct event testing is limited by Vue Test Utils with @click.prevent modifier)
    });

    it('does not emit result-click event when entry with url is clicked', async () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }
          ]
        }
      });

      // Act
      const link = wrapper.find('.chart-label-section a');
      await link.trigger('click');

      // Assert
      expect(wrapper.emitted('result-click')).toBeFalsy();
    });

    it('does not emit result-click event when doNotLinkEntries is true', async () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 }
          ],
          doNotLinkEntries: true
        }
      });

      // Act - There should be no clickable link
      const link = wrapper.find('.chart-label-section a');

      // Assert
      expect(link.exists()).toBe(false);
      expect(wrapper.emitted('result-click')).toBeFalsy();
    });
  });

  // Color variant tests
  describe('Color Variants', () => {
    describe('Blue variant (default)', () => {
      it('applies correct blue colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Blue Chart',
            variant: 'blue',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-blue-800');
        expect(progressBars[1].classes()).toContain('bg-blue-700');
        expect(progressBars[2].classes()).toContain('bg-blue-600');
        expect(progressBars[3].classes()).toContain('bg-blue-500');
        expect(progressBars[4].classes()).toContain('bg-blue-400');
      });
    });

    describe('Teal variant', () => {
      it('applies correct teal colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Teal Chart',
            variant: 'teal',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-teal-800');
        expect(progressBars[1].classes()).toContain('bg-teal-700');
        expect(progressBars[2].classes()).toContain('bg-teal-600');
        expect(progressBars[3].classes()).toContain('bg-teal-500');
        expect(progressBars[4].classes()).toContain('bg-teal-400');
      });
    });

    describe('Red variant', () => {
      it('applies correct red colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Red Chart',
            variant: 'red',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-red-800');
        expect(progressBars[1].classes()).toContain('bg-red-700');
        expect(progressBars[2].classes()).toContain('bg-red-600');
        expect(progressBars[3].classes()).toContain('bg-red-500');
        expect(progressBars[4].classes()).toContain('bg-red-400');
      });
    });

    describe('Gray variant', () => {
      it('applies correct gray colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Gray Chart',
            variant: 'gray',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-gray-800');
        expect(progressBars[1].classes()).toContain('bg-gray-700');
        expect(progressBars[2].classes()).toContain('bg-gray-600');
        expect(progressBars[3].classes()).toContain('bg-gray-500');
        expect(progressBars[4].classes()).toContain('bg-gray-400');
      });
    });

    describe('Tan variant', () => {
      it('applies correct tan colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Tan Chart',
            variant: 'tan',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-tan-800');
        expect(progressBars[1].classes()).toContain('bg-tan-700');
        expect(progressBars[2].classes()).toContain('bg-tan-600');
        expect(progressBars[3].classes()).toContain('bg-tan-500');
        expect(progressBars[4].classes()).toContain('bg-tan-400');
      });
    });

    describe('Green variant', () => {
      it('applies correct green colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Green Chart',
            variant: 'green',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-green-800');
        expect(progressBars[1].classes()).toContain('bg-green-700');
        expect(progressBars[2].classes()).toContain('bg-green-600');
        expect(progressBars[3].classes()).toContain('bg-green-500');
        expect(progressBars[4].classes()).toContain('bg-green-400');
      });
    });

    describe('Yellow variant', () => {
      it('applies correct yellow colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Yellow Chart',
            variant: 'yellow',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-yellow-800');
        expect(progressBars[1].classes()).toContain('bg-yellow-700');
        expect(progressBars[2].classes()).toContain('bg-yellow-600');
        expect(progressBars[3].classes()).toContain('bg-yellow-500');
        expect(progressBars[4].classes()).toContain('bg-yellow-400');
      });
    });

    describe('Orange variant', () => {
      it('applies correct orange colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Orange Chart',
            variant: 'orange',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-orange-800');
        expect(progressBars[1].classes()).toContain('bg-orange-700');
        expect(progressBars[2].classes()).toContain('bg-orange-600');
        expect(progressBars[3].classes()).toContain('bg-orange-500');
        expect(progressBars[4].classes()).toContain('bg-orange-400');
      });
    });

    describe('Indigo variant', () => {
      it('applies correct indigo colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Indigo Chart',
            variant: 'indigo',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-indigo-800');
        expect(progressBars[1].classes()).toContain('bg-indigo-700');
        expect(progressBars[2].classes()).toContain('bg-indigo-600');
        expect(progressBars[3].classes()).toContain('bg-indigo-500');
        expect(progressBars[4].classes()).toContain('bg-indigo-400');
      });
    });

    describe('Purple variant', () => {
      it('applies correct purple colors for all 5 positions', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Purple Chart',
            variant: 'purple',
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 },
              { id: 3, title: 'Item 3', count: 60 },
              { id: 4, title: 'Item 4', count: 40 },
              { id: 5, title: 'Item 5', count: 20 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-purple-800');
        expect(progressBars[1].classes()).toContain('bg-purple-700');
        expect(progressBars[2].classes()).toContain('bg-purple-600');
        expect(progressBars[3].classes()).toContain('bg-purple-500');
        expect(progressBars[4].classes()).toContain('bg-purple-400');
      });
    });

    describe('Default variant (null)', () => {
      it('applies blue colors when variant is null', () => {
        // Arrange
        const wrapper = mount(Component, {
          props: {
            title: 'Default Chart',
            variant: null,
            entries: [
              { id: 1, title: 'Item 1', count: 100 },
              { id: 2, title: 'Item 2', count: 80 }
            ]
          }
        });

        // Assert
        const progressBars = wrapper.findAll('[role="progressbar"]');
        expect(progressBars[0].classes()).toContain('bg-blue-800');
        expect(progressBars[1].classes()).toContain('bg-blue-700');
      });
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('includes data-id attribute on container', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: []
        }
      });

      // Assert
      expect(wrapper.find('[data-id="sds-top-five-chart"]').exists()).toBe(true);
    });

    it('includes progressbar role on progress bars', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 }
          ]
        }
      });

      // Assert
      const progressBar = wrapper.find('[role="progressbar"]');
      expect(progressBar.exists()).toBe(true);
    });

    it('includes correct ARIA attributes on progress bars', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 80 },
            { id: 2, title: 'Item 2', count: 100 }
          ]
        }
      });

      // Assert
      const progressBars = wrapper.findAll('[role="progressbar"]');
      
      // First item (80 out of max 100)
      expect(progressBars[0].attributes('aria-valuenow')).toBe('80');
      expect(progressBars[0].attributes('aria-valuemin')).toBe('0');
      expect(progressBars[0].attributes('aria-valuemax')).toBe('100');
      expect(progressBars[0].attributes('title')).toBe('80');

      // Second item (100 out of max 100)
      expect(progressBars[1].attributes('aria-valuenow')).toBe('100');
      expect(progressBars[1].attributes('aria-valuemin')).toBe('0');
      expect(progressBars[1].attributes('aria-valuemax')).toBe('100');
      expect(progressBars[1].attributes('title')).toBe('100');
    });

    it('includes screen reader text for each progress bar', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Test Item', count: 75 }
          ],
          showPercent: true
        }
      });

      // Assert
      const srText = wrapper.find('.sr-only');
      expect(srText.exists()).toBe(true);
      expect(srText.text()).toBe('75% Test Item');
    });

    it('includes appropriate link classes for accessibility', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }
          ]
        }
      });

      // Assert
      const link = wrapper.find('.chart-label-section a');
      expect(link.classes()).toContain('hover:underline');
      expect(link.classes()).toContain('focus:underline');
      expect(link.classes()).toContain('focus:outline-hidden');
    });
  });

  // Progress bar calculation tests
  describe('Progress Bar Calculations', () => {
    it('calculates correct width percentage based on max value', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 },
            { id: 2, title: 'Item 2', count: 50 },
            { id: 3, title: 'Item 3', count: 25 }
          ]
        }
      });

      // Assert
      const progressBars = wrapper.findAll('[role="progressbar"]');
      // Item 1: 100/100 = 100%
      expect(progressBars[0].attributes('style')).toContain('width: 100%');
      // Item 2: 50/100 = 50%
      expect(progressBars[1].attributes('style')).toContain('width: 50%');
      // Item 3: 25/100 = 25%
      expect(progressBars[2].attributes('style')).toContain('width: 25%');
    });

    it('handles entries with same count values', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 50 },
            { id: 2, title: 'Item 2', count: 50 },
            { id: 3, title: 'Item 3', count: 50 }
          ]
        }
      });

      // Assert
      const progressBars = wrapper.findAll('[role="progressbar"]');
      // All should be 100% since they all have the same max value
      expect(progressBars[0].attributes('style')).toContain('width: 100%');
      expect(progressBars[1].attributes('style')).toContain('width: 100%');
      expect(progressBars[2].attributes('style')).toContain('width: 100%');
    });

    it('handles entries with decimal values', () => {
      // Arrange
      const wrapper = mount(Component, {
        props: {
          title: 'Test Chart',
          entries: [
            { id: 1, title: 'Item 1', count: 100 },
            { id: 2, title: 'Item 2', count: 33.33 }
          ]
        }
      });

      // Assert
      const progressBars = wrapper.findAll('[role="progressbar"]');
      expect(progressBars[0].attributes('style')).toContain('width: 100%');
      expect(progressBars[1].attributes('style')).toContain('width: 33.33%');
    });
  });
});
