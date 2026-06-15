import SdsBrochureSiteHeader from './BrochureSiteHeader.vue';

export default {
  title: 'Templates/Layouts/Brochure Site/Brochure Site Header',
  parameters: {
    docs: {
      description: {
        component: 'The header for the BrochureSite layout. Includes Carnegie Mellon University wordmark, SEI branding, and navigation with MegaMenu.',
      },
    },
  },
  component: SdsBrochureSiteHeader,
  argTypes: {
    organization: {
      control: 'text',
      description: 'Organization name to display below the SEI title',
    },
    mobileBreakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Breakpoint at which the mobile hamburger menu appears',
    },
    nav: {
      control: 'object',
      description: 'Array of MegaMenuItem objects for navigation',
    }
  }
};

const Template = (args) => ({
  components: { SdsBrochureSiteHeader },
  setup() {
    return { args }
  },
  template: `
    <sds-brochure-site-header v-bind="args"></sds-brochure-site-header>
  `
});

export const Default = Template.bind({});
Default.args = {
  organization: 'CERT Division',
  mobileBreakpoint: 'xl',
  nav: [
    {
      key: 'home',
      title: 'Home',
      alignment: 'left',
      href: 'https://sei.cmu.edu'
    },
    {
      key: 'work',
      title: 'Work',
      content: {
        col_1: [
          { key: 'work-1', label: 'Research', href: 'https://sei.cmu.edu/our-work/research' },
          { key: 'work-2', label: 'Projects', href: 'https://sei.cmu.edu/our-work/projects' },
          { key: 'work-3', label: 'Products & Services', href: 'https://sei.cmu.edu/our-work/products-services' },
        ],
        col_2: [
          { key: 'work-4', label: 'Publications', href: 'https://sei.cmu.edu/publications' },
          { key: 'work-5', label: 'Podcasts', href: 'https://sei.cmu.edu/publications/podcasts' },
          { key: 'work-6', label: 'Videos', href: 'https://sei.cmu.edu/publications/videos' },
        ],
        col_3: [
          { key: 'work-7', label: 'Case Studies', href: 'https://sei.cmu.edu/publications/case-studies' },
          { key: 'work-8', label: 'Technical Reports', href: 'https://sei.cmu.edu/publications/technical-reports' },
        ]
      }
    },
    {
      key: 'topics',
      title: 'Topics',
      content: {
        col_1: [
          { key: 'topics-1', label: 'Artificial Intelligence', href: 'https://sei.cmu.edu/topic/artificial-intelligence' },
          { key: 'topics-2', label: 'Cybersecurity', href: 'https://sei.cmu.edu/topic/cybersecurity' },
          { key: 'topics-3', label: 'Software Engineering', href: 'https://sei.cmu.edu/topic/software-engineering' },
        ],
        col_2: [
          { key: 'topics-4', label: 'Acquisition', href: 'https://sei.cmu.edu/topic/acquisition' },
          { key: 'topics-5', label: 'DevSecOps', href: 'https://sei.cmu.edu/topic/devsecops' },
          { key: 'topics-6', label: 'Insider Threat', href: 'https://sei.cmu.edu/topic/insider-threat' },
        ]
      }
    },
    {
      key: 'engage',
      title: 'Engage',
      content: {
        col_1: [
          { key: 'engage-1', label: 'Training', href: 'https://sei.cmu.edu/education-outreach/training' },
          { key: 'engage-2', label: 'Events', href: 'https://sei.cmu.edu/news-events/events' },
          { key: 'engage-3', label: 'Webinars', href: 'https://sei.cmu.edu/news-events/webinars' },
        ],
        col_2: [
          { key: 'engage-4', label: 'Courses', href: 'https://sei.cmu.edu/education-outreach/courses' },
          { key: 'engage-5', label: 'Certificates', href: 'https://sei.cmu.edu/education-outreach/certificates' },
        ]
      }
    },
    {
      key: 'about',
      title: 'About',
      content: {
        col_1: [
          { key: 'about-1', label: 'Our Organization', href: 'https://sei.cmu.edu/about' },
          { key: 'about-2', label: 'Our Work', href: 'https://sei.cmu.edu/about/our-work' },
          { key: 'about-3', label: 'Careers', href: 'https://sei.cmu.edu/careers' },
        ],
        col_2: [
          { key: 'about-4', label: 'News', href: 'https://sei.cmu.edu/news-events/news' },
          { key: 'about-5', label: 'Contact', href: 'https://sei.cmu.edu/contact-us' },
        ]
      }
    }
  ]
};

export const WithoutOrganization = Template.bind({});
WithoutOrganization.args = {
  mobileBreakpoint: 'xl',
  nav: Default.args.nav
};

export const WithExternalLinks = Template.bind({});
WithExternalLinks.args = {
  organization: 'CERT Division',
  mobileBreakpoint: 'xl',
  nav: [
    {
      key: 'work',
      title: 'Work',
      content: {
        col_1: [
          { key: 'work-1', label: 'Research', href: 'https://sei.cmu.edu/our-work/research' },
          { key: 'work-2', label: 'Projects', href: 'https://sei.cmu.edu/our-work/projects' },
        ]
      }
    },
    {
      key: 'external',
      tag: 'a',
      title: 'External Link',
      href: 'https://www.cmu.edu',
      external: true
    }
  ]
};

export const MobileBreakpointMedium = Template.bind({});
MobileBreakpointMedium.args = {
  organization: 'CERT Division',
  mobileBreakpoint: 'md',
  nav: Default.args.nav
};

export const MinimalNav = Template.bind({});
MinimalNav.args = {
  organization: 'CERT Division',
  mobileBreakpoint: 'xl',
  nav: [
    {
      key: 'about',
      title: 'About',
      content: {
        col_1: [
          { key: 'about-1', label: 'Our Organization', href: 'https://sei.cmu.edu/about' },
          { key: 'about-2', label: 'Contact', href: 'https://sei.cmu.edu/contact-us' },
        ]
      }
    }
  ]
};
