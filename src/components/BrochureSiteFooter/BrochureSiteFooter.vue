<template>
  <section data-id="sds-brochure-site-footer">
    <div
      data-id="pre-footer"
      class="py-8 bg-gray-25 dark:bg-gray-950 h-fit"
    >
      <ul
        class="container flex! flex-col 2xl:flex-row justify-between my-0 gap-y-4 gap-x-8 list-none print:hidden"
      >
        <li
          v-for="(link, index) in footer.top"
          :key="index"
          class="w-fit"
        >
          <SdsLink
            :href="link.href"
            kind="primary"
            variant="red"
            type="cta"
            class="no-underline! select-none 2xl:text-lg 2xl:after:w-5 2xl:after:h-3.75"
          >
            {{ link.text }}
          </SdsLink>
        </li>
      </ul>
    </div>
    <div class="py-16 bg-black">
      <div class="container w-full flex flex-col lg:flex-row justify-between my-0 gap-x-16 gap-y-8 list-none print:hidden">
        <div class="w-full lg:w-1/2 2xl:w-1/3 flex flex-col gap-y-8">
          <slot
            v-if="$slots['footer-logo']"
            name="footer-logo"
          />
          <a
            v-else
            :href="footer.logo.href"
            class="block h-fit max-w-96 mr-8"
          >
            <img
              itemscope
              itemprop="logo"
              itemtype="http://schema.org/ImageObject"
              :src="footer.logo.src"
              alt="SEI Logo"
            >
          </a>
          <slot
            v-if="$slots['footer-tagline']"
            name="footer-tagline"
          />
          <div
            v-else
            class="text-gray-300 [&_p]:text-gray-300 [&_b]:text-gray-50 [&_b]:mb-2 [&_b]:font-semibold"
          >
            <b>Advancing Software for National Security</b><br>
            Sponsored by the Department of War, the SEI is a federally funded research and development center managed by Carnegie Mellon University.
          </div>
          <slot
            v-if="$slots['footer-contact']"
            name="footer-contact"
          />
          <address
            v-else
            itemscope
            itemprop="address"
            itemtype="http://schema.org/PostalAddress"
            class="not-italic"
          >
            <span class="text-gray-50 mb-2">
              <b class="font-semibold">Main Office</b>
            </span><br>
            <span
              class="text-gray-300"
              itemprop="streetAddress"
            >
              4500 Fifth Avenue
            </span><br>
            <span
              class="text-gray-300 mr-1"
              itemprop="addressLocality"
            >Pittsburgh, PA</span>
            <span
              class="text-gray-300"
              itemprop="postalCode"
            >15213-2612</span><br>
            <a
              href="tel:+14122685800"
              itemprop="telephone"
              class="text-gray-300 hover:text-white! focus:text-white!"
            >412-268-5800</a>
          </address>
        </div>
        <div class="w-full lg:w-1/2 2xl:w-2/3 flex flex-col 2xl:flex-row gap-x-16 2xl:justify-end">
          <div
            v-for="(dropdown, index) in footer.dropdowns"
            :key="index"
            class="flex flex-col group 2xl:min-w-56 last:border-none border-b border-b-gray-700 2xl:border-none"
          >
            <input
              :id="`footer-dropdown-${index}`"
              type="checkbox"
              class="peer hidden"
            >
            <label
              class="
                text-gray-50 font-semibold cursor-pointer 2xl:cursor-default select-none
                flex flex-row justify-between
                peer-checked:[&_svg[data-id='open']]:hidden
                peer-checked:[&_svg[data-id='close']]:flex
                2xl:[&_i]:[--fa-display:none]
                2xl:group-hover:text-gray-50
                2xl:group-focus:text-gray-50
                group-hover:text-white
                group-focus:text-white
                2xl:py-0
              "
              :class="{
                'py-2': index > 0,
                'pb-2': index === 0
              }"
              :for="`footer-dropdown-${ index }`"
            >
              {{ dropdown.label }}
              <IconFa7SolidChevronDown
                data-id="open"
                class="h-full w-4 flex 2xl:hidden! flex-col justify-center relative text-gray-300 group-hover:text-white group-focus:text-white"
              />
              <IconFa7SolidChevronUp
                data-id="close"
                class="h-full w-4 hidden 2xl:hidden! flex-col justify-center relative text-gray-300 group-hover:text-white group-focus:text-white"
              />
            </label>
            <div class="hidden peer-checked:flex peer-checked:pb-2 2xl:flex flex-col">
              <a
                v-for="(link, linkIndex) in dropdown.links"
                :key="linkIndex"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer nofollow' : undefined"
                class="text-gray-300 block w-full hover:text-white! focus:text-white py-1.5"
              >{{ link.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-t border-t-gray-700 bg-black py-8">
      <div class="container flex flex-row gap-y-4 justify-between">
        <p class="hidden 2xl:block text-nowrap">
          <span
            data-id="copyright"
            class="text-gray-300 mr-1 before:h-8 before:w-8 before:pr-1 before:content-['©']"
          >{{ new Date().getFullYear() }}</span>
          <span
            itemscope
            itemtype="http://schema.org/Organization"
            itemprop="parentOrganization"
          >
            <span
              itemprop="legalName"
              class="text-gray-300"
            ><a href="https://www.cmu.edu/">Carnegie Mellon University</a> </span>
          </span>
        </p>
        <ul class="flex! flex-col 2xl:flex-row w-full justify-end list-none gap-x-8 gap-y-4">
          <li
            v-for="(link, index) in footer.bottom"
            :key="index"
            class="flex flex-row justify-between"
            :itemprop="link.href.includes('ethics') ? 'ethicsPolicy' : undefined"
          >
            <a
              itemprop="url"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer nofollow' : undefined"
              class="text-gray-300 block w-full hover:text-white! focus:text-white!"
            >{{ link.text }}</a>
          </li>
          <li class="2xl:hidden text-nowrap list-none">
            <p class="text-sm">
              <span
                data-id="copyright"
                class="text-gray-300 mr-1 before:h-8 before:w-8 before:pr-1 before:content-['©']"
              >{{ new Date().getFullYear() }}</span>
              <span
                itemscope
                itemtype="http://schema.org/Organization"
                itemprop="parentOrganization"
              >
                <span
                  itemprop="legalName"
                  class="text-gray-300"
                ><a href="https://www.cmu.edu/">Carnegie Mellon University</a> </span>
              </span>
            </p>
          </li>
        </ul>
        <button
          class="flex flex-col justify-end 2xl:justify-center order-last cursor-pointer"
          title="Scroll to top"
          @click.prevent="scrollToTop"
        >
          <IconFa7SolidArrowUp class="h-6 w-6 [--fa-display:flex] relative -top-px ml-6 text-gray-300 hover:text-white! focus:text-white! select-none" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsBrochureSiteFooter'
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const footer = {
  logo: {
    src: 'https://www.sei.cmu.edu/media/images/sei.max-730x4000.svg',
    href: 'https://sei.cmu.edu/'
  },
  dropdowns: [
    {
      label: 'SEI',
      links: [
        {
          text: 'About',
          href: 'https://sei.cmu.edu/about/',
          external: false
        },
        {
          text: 'Research and Development',
          href: 'https://sei.cmu.edu/research-development/',
          external: false
        },
        {
          text: 'Publications and Media',
          href: 'https://sei.cmu.edu/publications-media/',
          external: false
        },
        {
          text: 'Education',
          href: 'https://sei.cmu.edu/education/',
          external: false
        },
        {
          text: 'Careers',
          href: 'https://sei.cmu.edu/careers/',
          external: false
        }
      ]
    },
    {
      label: 'Helpful links',
      links: [
        {
          text: 'Digital Library',
          href: 'https://sei.cmu.edu/library/',
          external: false
        },
        {
          text: 'Blog',
          href: 'https://sei.cmu.edu/blog/',
          external: false
        },
        {
          text: 'Podcasts',
          href: 'https://sei.cmu.edu/podcasts/',
          external: false
        }
      ]
    },
    {
      label: 'Connect',
      links: [
        {
          text: 'Facebook',
          href: 'https://www.facebook.com/SEICMU/',
          external: true
        },
        {
          text: 'LinkedIn',
          href: 'https://www.linkedin.com/company/software-engineering-institute',
          external: true
        },
        {
          text: 'X',
          href: 'https://x.com/SEI_CMU',
          external: true
        },
        {
          text: 'YouTube',
          href: 'https://www.youtube.com/user/TheSEICMU',
          external: true
        }
      ]
    }
  ],
  top: [
    {
      href: 'https://vulcoord.cert.org/VulReport/',
      text: 'Report a Vulnerability'
    },
    {
      href: 'https://sei.cmu.edu/subscribe-to-sei-bulletin/',
      text: 'Subscribe to SEI Bulletin'
    },
    {
      href: 'https://sei.cmu.edu/legal/request-permission-to-use-sei-material',
      text: 'Request Permission to Use SEI Material'
    }
  ],
  bottom: [
    {
      href: 'https://sei.cmu.edu/contact-us/',
      text: 'Contact Us',
      external: true
    },
    {
      href: 'https://sei.cmu.edu/locations/',
      text: 'Office Locations',
      external: true
    },
    {
      href: 'https://sei.cmu.edu/legal/privacy-notice/',
      text: 'Privacy Notice',
      external: true
    },
    {
      href: 'https://sei.cmu.edu/legal/',
      text: 'Legal',
      external: true
    },
    {
      href: 'https://www.cmu.edu/',
      text: 'www.cmu.edu',
      external: true
    },
  ]
}
</script>
