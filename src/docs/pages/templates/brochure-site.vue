<template>
  <SdsBrochureSite
    organization="Example Organization"
    :nav="nav"
    :show-footer="true"
  >
    <template #default>
      <div class="flex flex-col gap-4 w-full 2xl:w-2/3 [&_p]:text-body">
        <section class="mb-4 xl:mb-6">
          <h1 class="text-h1">
            Example Title
          </h1>
          <span class="text-lead">
            This is an example of a page using the brochure site template. The brochure site template is used for pages that are not part of the brochure site, but still want to use the brochure site's header and footer.
          </span>
        </section>
        <section class="mb-4 xl:mb-6">
          <h2 class="text-h2">
            This is an H2
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu lacus in arcu facilisis congue. Ut dolor dolor, suscipit quis porta id, dignissim nec arcu. Sed eget ex mi. Sed convallis eleifend nibh, quis pharetra lorem ultricies vel.
          </p>
          <p>
            Fusce tempus massa eu tempus suscipit. Nulla accumsan tortor velit, sed ultricies dui elementum quis. Aliquam at enim augue. Pellentesque efficitur eleifend diam, at vestibulum odio dictum et. Maecenas condimentum nulla eu commodo dapibus.
          </p>
          <p>
            Nullam sit amet dolor accumsan, scelerisque libero eget, gravida felis. Ut non luctus orci. Integer bibendum faucibus finibus. Sed consectetur mi in nibh suscipit, porttitor cursus velit rhoncus. Donec quis mauris non ligula ultricies viverra.
          </p>
          <p>
            Integer posuere quam et ex blandit posuere. Nam placerat quis sem vitae interdum. Cras pretium, tortor in cursus ultrices, elit sem scelerisque sapien, at porta odio justo sit amet velit. Mauris volutpat a enim nec fringilla. Phasellus condimentum consequat efficitur. Nullam nunc tortor, elementum et ex in, fringilla viverra eros.
          </p>
        </section>
        <section class="mb-4 xl:mb-6">
          <h3 class="text-h3">
            This is an H3
          </h3>
          <p>
            This is an example of a page using the brochure site template. The brochure site template is used for pages that are not part of the brochure site, but still want to use the brochure site's header and footer.
          </p>
        </section>
      </div>
    </template>
  </SdsBrochureSite>
</template>

<script setup lang="ts">
import type { MegaMenuItem } from "@/components/MegaMenu/MegaMenu.vue"

defineOptions({
  name: "BrochureSitePage"
})

definePage({
  meta: { title: 'Brochure Site' }
})

const nav: MegaMenuItem[] = [
  {
    key: "home",
    title: "Home",
    tag: "a",
    href: "/templates/brochure-site",
    alignment: "left",
  },
  {
    key: "components",
    title: "Components",
    content: {
      col_1: [
        {
          key: "buttons",
          label: "Buttons",
          href: "/components/buttons",
        },
        {
          key: "containers",
          label: "Containers",
          href: "/components/containers",
        },
        {
          key: "data-visualization",
          label: "Data Visualization",
          href: "/components/data-visualization",
        },
        {
          key: "date-and-time",
          label: "Date & Time",
          href: "/components/date-and-time",
        },
        {
          key: "feedback",
          label: "Feedback",
          href: "/components/feedback",
        },
        {
          key: "inputs",
          label: "Inputs",
          href: "/components/inputs",
        },
        {
          key: "navigation",
          label: "Navigation",
          href: "/components/navigation",
        },
      ]
    }
  },
  {
    key: "patterns",
    title: "Patterns",
    content: {
      col_1: [
        {
          key: "data-table",
          label: "Data Table",
          href: "/patterns/data-table",
        },
        {
          key: "form-group",
          label: "Form Group",
          href: "/patterns/form-group",
        }
      ]
    }
  },
  {
    key: "templates",
    title: "Templates",
    content: {
      col_1: [
        {
          key: "brochure-site",
          label: "Brochure Site",
          href: "/templates/brochure-site",
        }
      ]
    }
  },
  {
    key: "dark-mode",
    tag: "a",
    href: "#",
    title: "Dark/Light",
    onClick: (link: MegaMenuItem, event: Event) => {
      event.preventDefault()
      document.body.classList.toggle('dark')
    }
  }
]

useHead({
  title: 'Brochure Site'
})
</script>
