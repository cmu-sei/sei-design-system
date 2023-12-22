<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Link
      </h2>
      <div class="flex gap-2">
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
          variant="red"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          variant="red"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
          variant="red"
        >
          SEI Homepage
        </SdsLink>
      </div>
      <div class="flex gap-2">
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
          variant="red"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          variant="red"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
          variant="red"
          type="inline"
        >
          SEI Homepage
        </SdsLink>
      </div>
      <div class="flex gap-2">
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="primary"
          variant="red"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          variant="red"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
        <SdsLink
          href="https://sei.cmu.edu"
          kind="tertiary"
          variant="red"
          type="cta"
        >
          SEI Homepage
        </SdsLink>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Mega Menu
      </h2>
      <div>
        <div class="grid gap-4">
          <div>
            <SdsMegaMenu v-model="megaMenu">
              <template #default="{ topLink, content }">
                {{ topLink }}
                {{ content }}
              </template>
              <template #link(home)>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"
                  />
                </svg>
                <span class="sr-only">Home</span>
              </template>
              <template #panel(about)="{ content }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-2">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="col-span-2">
                        <SdsMegaMenuItem
                          :label="content.aboutLink.label"
                          :type="content.aboutLink.type"
                          :href="content.aboutLink.href"
                        />
                      </div>
                      <div
                        v-for="row, index in content.aboutRows"
                        :key="index"
                      >
                        <div
                          v-for="link in row"
                          :key="link.key"
                        >
                          <div class="col-span-1">
                            <SdsMegaMenuItem
                              :label="link.label"
                              :type="link.type"
                              :href="link.href"
                            >
                              <p class="text-sm">
                                {{ link.description }}
                              </p>
                            </SdsMegaMenuItem>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <SdsMegaMenuItem
                      :label="content.divisionLink.label"
                      :type="content.divisionLink.type"
                      :href="content.divisionLink.href"
                    />
                    <div
                      v-for="division in content.divisionRows"
                      :key="division.key"
                    >
                      <SdsMegaMenuItem
                        :label="division.label"
                        :href="division.href"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template #panel(research-and-development)="{ content }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-2">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="col-span-2">
                        <SdsMegaMenuItem
                          :label="content.topicsLink.label"
                          :type="content.topicsLink.type"
                          :href="content.topicsLink.href"
                        />
                      </div>
                      <template
                        v-for="column, index in content.topicsColumns"
                        :key="index"
                      >
                        <div
                          v-for="topic in column"
                          :key="topic.key"
                          class="col-span-1"
                        >
                          <SdsMegaMenuItem
                            :label="topic.title"
                            :href="topic.href"
                          />
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <div
                      v-for="item in content.extra"
                      :key="item.key"
                    >
                      <SdsMegaMenuItem
                        :cta="item.cta ?? false"
                        :label="item.label"
                        :type="item.type"
                        :href="item.href"
                      >
                        <p class="text-sm">
                          {{ item.description }}
                        </p>
                      </SdsMegaMenuItem>
                    </div>
                  </div>
                </div>
              </template>
              <template #panel(publications-and-media)="{ content }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <div
                      v-for="item in content.links"
                      :key="item.key"
                    >
                      <SdsMegaMenuItem
                        :label="item.label"
                        :href="item.href"
                        :type="item.type ? item.type : 'simple'"
                      />
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <SdsMegaMenuItem
                      label="Blog"
                      type="landing-page"
                      href="https://sei.cmu.edu/our-work/projects/index.cfm"
                    />
                    <div
                      v-for="blogPost in content.blogPosts"
                      :key="blogPost.key"
                      class="mb-2"
                    >
                      <SdsMegaMenuItem
                        :label="blogPost.title"
                        type="descriptive"
                        href="https://sei.cmu.edu/publications/software-tools/index.cfm"
                      >
                        <p class="uppercase text-xs">
                          <span>{{ blogPost.published }}</span>
                          <span> • </span>
                          <span>{{ blogPost.author }}</span>
                        </p>
                      </SdsMegaMenuItem>
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <SdsMegaMenuItem
                      label="News"
                      type="landing-page"
                      href="https://sei.cmu.edu/our-work/projects/index.cfm"
                    />
                    <SdsMegaMenuItem
                      label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
                      type="descriptive"
                      href="https://sei.cmu.edu/news/index.cfm"
                    >
                      <template #default>
                        <p class="uppercase">
                          <span class="text-sm text-gray-900 dark:text-gray-200">May 2, 2023</span><br>
                          <span class="text-xs">event</span>
                        </p>
                      </template>
                    </SdsMegaMenuItem>
                  </div>
                </div>
              </template>
              <template #link(education)>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  class="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M256 89.61L22.486 177.18L256 293.937l111.22-55.61l-104.337-31.9A16 16 0 0 1 256 208a16 16 0 0 1-16-16a16 16 0 0 1 16-16l-2.646 8.602l18.537 5.703a16 16 0 0 1 .008.056l27.354 8.365L455 246.645v12.146a16 16 0 0 0-7 13.21a16 16 0 0 0 7.293 13.406C448.01 312.932 448 375.383 448 400c16 10.395 16 10.775 32 0c0-24.614-.008-87.053-7.29-114.584A16 16 0 0 0 480 272a16 16 0 0 0-7-13.227v-25.42L413.676 215.1l75.838-37.92L256 89.61zM119.623 249L106.5 327.74c26.175 3.423 57.486 18.637 86.27 36.627c16.37 10.232 31.703 21.463 44.156 32.36c7.612 6.66 13.977 13.05 19.074 19.337c5.097-6.288 11.462-12.677 19.074-19.337c12.453-10.897 27.785-22.128 44.156-32.36c28.784-17.99 60.095-33.204 86.27-36.627L392.375 249h-6.25L256 314.063L125.873 249h-6.25z"
                  />
                </svg>
                <span class="sr-only">Education</span>
              </template>
              <template #panel(education)="{ content, close }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <div
                      v-for="educationLink in content.educationLinks"
                      :key="educationLink.key"
                    >
                      <SdsMegaMenuItem
                        :href="educationLink.href"
                        :label="educationLink.label"
                        :type="educationLink.type"
                      >
                        <p
                          v-if="educationLink.description"
                          class="text-sm"
                        >
                          {{ educationLink.description }}
                        </p>
                      </SdsMegaMenuItem>
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <div
                      v-for="training in content.trainings"
                      :key="training.key"
                    >
                      <SdsMegaMenuItem
                        :href="training.href"
                        :label="training.label"
                        :type="training.type"
                      />
                    </div>
                  </div>
                  <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
                    <SdsMegaMenuItem
                      :label="content.eventLink.label"
                      :type="content.eventLink.type"
                      :href="content.eventLink.href"
                    />
                    <div
                      v-for="event in content.events"
                      :key="event.key"
                    >
                      <SdsMegaMenuItem
                        class="group"
                        :href="event.href"
                        :label="event.label"
                        :type="event.type"
                      >
                        <template #left>
                          <div class="leading-5 transition-all bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-850 dark:group-hover:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 text-center rounded-sm">
                            <div class="font-bold uppercase">
                              {{ event.month }}
                            </div>
                            <div class="font-semibold text-sm">
                              {{ event.startDay }}
                            </div>
                          </div>
                        </template>
                        <template #default>
                          <p class="uppercase font-semibold text-xs">
                            {{ event.dateRange }}
                          </p>
                          <p class="text-sm text-gray-700 dark:text-gray-500 max-h-9 overflow-y-hidden overflow-ellipsis">
                            {{ event.description }}
                          </p>
                        </template>
                      </SdsMegaMenuItem>
                    </div>
                  </div>
                  <SdsButton
                    kind="primary"
                    variant="red"
                    class="absolute right-8 flex flex-row justify-center w-16"
                    @click="close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L4.94 6L3.22 7.72a.75.75 0 0 0 1.06 1.06L6 7.06l1.72 1.72a.75.75 0 0 0 1.06-1.06L7.06 6l1.72-1.72a.75.75 0 0 0-1.06-1.06L6 4.94L4.28 3.22Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </SdsButton>
                </div>
              </template>
              <template #panel(careers)="{ content }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <SdsMegaMenuItem
                      :href="content.careersLink.href"
                      :label="content.careersLink.label"
                      :type="content.careersLink.type"
                    />
                    <div
                      v-for="careerLink in content.careersLinks"
                      :key="careerLink.key"
                    >
                      <SdsMegaMenuItem
                        :href="careerLink.href"
                        :label="careerLink.label"
                        :type="careerLink.type"
                      >
                        <p
                          v-if="careerLink.description"
                          class="text-xs"
                        >
                          {{ careerLink.description }}
                        </p>
                      </SdsMegaMenuItem>
                    </div>
                  </div>
                  <div class="col-span-2 border-l dark:border-l-gray-800 pl-2">
                    <SdsMegaMenuItem
                      :href="content.jobsLink.href"
                      :label="content.jobsLink.label"
                      :type="content.jobsLink.type"
                    />
                    <div
                      v-for="row, index in content.jobs"
                      :key="index"
                      class="grid grid-cols-2 gap-4"
                    >
                      <div
                        v-for="job in row"
                        :key="job.key"
                        class="col-span-1"
                      >
                        <SdsMegaMenuItem
                          :href="job.href"
                          :label="job.label"
                          :type="job.type"
                        >
                          <p class="text-xs">
                            <span>Posted {{ job.posted }}</span>
                            <span> • </span>
                            <span>{{ job.locations }}</span>
                          </p>
                        </SdsMegaMenuItem>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #link(darkMode)>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  class="h-5 w-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775c28.27-34.831-2.558-85.722-46.249-77.401c-82.348 15.683-158.272-47.268-158.272-130.792c0-48.424 26.06-92.292 67.434-115.836c38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256c0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478c-54.76 31.163-91.693 90.042-91.693 157.554c0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"
                  />
                </svg>
                <span class="sr-only">Toggle dark mode</span>
              </template>
            </SdsMegaMenu>
          </div>
          <div>
            <SdsMegaMenu
              v-model="megaMenu2"
              type="block"
              width="auto"
            >
              <template #panel(about-1)="{ content }">
                <SdsMegaMenuItem
                  :label="content.divisionLink.label"
                  :type="content.divisionLink.type"
                  :href="content.divisionLink.href"
                  class="select-none"
                />
                <div
                  v-for="division in content.divisionRows"
                  :key="division.key"
                >
                  <SdsMegaMenuItem
                    :label="division.label"
                    :href="division.href"
                  />
                </div>
              </template>
              <template #panel(research-and-development-1)="{ content }">
                <div
                  v-for="item in content.extra"
                  :key="item.key"
                  class="max-w-sm"
                >
                  <SdsMegaMenuItem
                    :cta="item.cta ?? false"
                    :label="item.label"
                    :type="item.type"
                    :href="item.href"
                  >
                    <p class="text-sm">
                      {{ item.description }}
                    </p>
                  </SdsMegaMenuItem>
                </div>
              </template>
              <template #panel(publications-and-media-1)>
                <div class="max-w-sm">
                  <SdsMegaMenuItem
                    label="News"
                    type="landing-page"
                    href="https://sei.cmu.edu/our-work/projects/index.cfm"
                  />
                  <SdsMegaMenuItem
                    label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
                    type="descriptive"
                    href="https://sei.cmu.edu/news/index.cfm"
                  >
                    <template #default>
                      <p class="uppercase">
                        <span class="text-sm text-gray-900 dark:text-gray-200">May 2, 2023</span><br>
                        <span class="text-xs">event</span>
                      </p>
                    </template>
                  </SdsMegaMenuItem>
                </div>
              </template>
              <template #link(education-1)>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  class="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M256 89.61L22.486 177.18L256 293.937l111.22-55.61l-104.337-31.9A16 16 0 0 1 256 208a16 16 0 0 1-16-16a16 16 0 0 1 16-16l-2.646 8.602l18.537 5.703a16 16 0 0 1 .008.056l27.354 8.365L455 246.645v12.146a16 16 0 0 0-7 13.21a16 16 0 0 0 7.293 13.406C448.01 312.932 448 375.383 448 400c16 10.395 16 10.775 32 0c0-24.614-.008-87.053-7.29-114.584A16 16 0 0 0 480 272a16 16 0 0 0-7-13.227v-25.42L413.676 215.1l75.838-37.92L256 89.61zM119.623 249L106.5 327.74c26.175 3.423 57.486 18.637 86.27 36.627c16.37 10.232 31.703 21.463 44.156 32.36c7.612 6.66 13.977 13.05 19.074 19.337c5.097-6.288 11.462-12.677 19.074-19.337c12.453-10.897 27.785-22.128 44.156-32.36c28.784-17.99 60.095-33.204 86.27-36.627L392.375 249h-6.25L256 314.063L125.873 249h-6.25z"
                  />
                </svg>
                <span class="sr-only">Education</span>
              </template>
              <template #panel(education-1)="{ content, close }">
                <div class="max-w-lg">
                  <SdsMegaMenuItem
                    :label="content.eventLink.label"
                    :type="content.eventLink.type"
                    :href="content.eventLink.href"
                  />
                  <div
                    v-for="event in content.events"
                    :key="event.key"
                  >
                    <SdsMegaMenuItem
                      :href="event.href"
                      :label="event.label"
                      :type="event.type"
                    >
                      <template #left>
                        <div class="leading-5 transition-all bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-850 dark:group-hover:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 text-center rounded-sm">
                          <div class="font-bold uppercase">
                            {{ event.month }}
                          </div>
                          <div class="font-semibold text-sm">
                            {{ event.startDay }}
                          </div>
                        </div>
                      </template>
                      <template #default>
                        <p class="uppercase font-semibold text-xs">
                          {{ event.dateRange }}
                        </p>
                        <p class="text-sm text-gray-700 dark:text-gray-500 max-h-10 overflow-y-hidden overflow-ellipsis">
                          {{ event.description }}
                        </p>
                      </template>
                    </SdsMegaMenuItem>
                  </div>
                  <SdsButton
                    kind="primary"
                    variant="red"
                    class="absolute right-4 top-4 w-fit h-8 p-0 flex flex-col justify-center text-center mx-auto"
                    @click="close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L4.94 6L3.22 7.72a.75.75 0 0 0 1.06 1.06L6 7.06l1.72 1.72a.75.75 0 0 0 1.06-1.06L7.06 6l1.72-1.72a.75.75 0 0 0-1.06-1.06L6 4.94L4.28 3.22Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </SdsButton>
                </div>
              </template>
              <template #panel(careers-1)="{ content }">
                <SdsMegaMenuItem
                  :href="content.jobsLink.href"
                  :label="content.jobsLink.label"
                  :type="content.jobsLink.type"
                />
                <div
                  v-for="row, index in content.jobs"
                  :key="index"
                  class="grid grid-cols-2 gap-4"
                >
                  <div
                    v-for="job in row"
                    :key="job.key"
                    class="col-span-1"
                  >
                    <SdsMegaMenuItem
                      :href="job.href"
                      :label="job.label"
                      :type="job.type"
                    >
                      <p class="text-xs">
                        <span>Posted {{ job.posted }}</span>
                        <span> • </span>
                        <span>{{ job.locations }}</span>
                      </p>
                    </SdsMegaMenuItem>
                  </div>
                </div>
              </template>
              <template #link(darkMode-1)>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  class="h-5 w-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775c28.27-34.831-2.558-85.722-46.249-77.401c-82.348 15.683-158.272-47.268-158.272-130.792c0-48.424 26.06-92.292 67.434-115.836c38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256c0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478c-54.76 31.163-91.693 90.042-91.693 157.554c0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"
                  />
                </svg>
                <span class="sr-only">Toggle dark mode</span>
              </template>
            </SdsMegaMenu>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Paginator
      </h2>
      <div>
        <SdsPaginator
          :current-page="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </div>
    <div class="grid gap-8">
      <h2 class="text-xl">
        Tabs
      </h2>
      <div>
        <div class="grid gap-4">
          <div>
            <sds-tabs
              v-model="tabs"
              @change="changeTab"
            >
              <template #tab(groups)>
                <i>Directorates</i>
              </template>
              <template #panel(groups)>
                <div class="p-4">
                  This is the content for groups.
                </div>
              </template>
              <template #panel(workplace-services)>
                <div class="p-4">
                  This is the content for workplace services.
                </div>
              </template>
            </sds-tabs>
          </div>
          <div>
            <sds-tabs
              v-model="tabs"
              type="underline"
              class="bg-white dark:bg-gray-900 border rounded-b p-4"
              @change="changeTab"
            >
              <template #tab(groups)>
                <i>Directorates</i>
              </template>
              <template #panel(groups)>
                <div class="p-4">
                  This is the content for groups.
                </div>
              </template>
              <template #panel(workplace-services)>
                <div class="p-4">
                  This is the content for workplace services.
                </div>
              </template>
            </sds-tabs>
          </div>
          <div>
            <sds-tabs
              v-model="tabs"
              type="block"
              class="bg-white dark:bg-gray-900 border rounded-b p-4"
              @change="changeTab"
            >
              <template #tab(groups)>
                <i>Groups (custom style)</i>
              </template>
              <template #panel(groups)>
                <div class="p-4">
                  This is the content for groups.
                </div>
              </template>
              <template #panel(workplace-services)>
                <div class="p-4">
                  This is the content for workplace services.
                </div>
              </template>
            </sds-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(3)
const totalPages = ref(10)

const tabs = ref([
  { key: "home", title: "Home", disabled: true },
  { key: "about", title: "About Us", active: true },
  { key: "workplace-services", title: "Workplace Services" },
  { key: "link-to-google", title: "Link to Google", tag: "a", href: "https://google.com", external: true, disabled: true },
  { key: "link-trigger", title: "Link Trigger", href: "https://google.com" },
  { key: "groups", align: "right" }
])

const changeTab = (tab: any) => {
  console.log(tab);
}

const megaMenu = ref([
  {
    key: "home",
    title: "Home",
    tag: 'a',
    href: '/',
    alignment: 'left',
  },
  {
    key: "about",
    title: "About",
    active: true,
    content: {
      aboutLink: {
        href: "https://sei.cmu.edu/about/index.cfm",
        key: "about",
        label: "About",
        type: "landing-page",
      },
      aboutRows: [
        [
          {
            description: "This page describes the leadership structure of the SEI and provides biographical information on SEI Fellows, the SEI leadership team, and the Board of Visitors.",
            href: "https://sei.cmu.edu/about/leadership/index.cfm",
            key: "leadership",
            label: "Leadership",
            type: "descriptive"
          },
          {
            description: "The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance the field of software engineering to meet emerging challenges.",
            href: "https://sei.cmu.edu/publications/annual-reviews/index.cfm",
            key: "annual-reviews",
            label: "Annual Reviews",
            type: "descriptive"
          },
        ],
        [
          {
            description: "As an FFRDC, the SEI works with government industry, and academia to address issues in software engineering, cybersecurity, process improvement, and more.",
            href: "https://sei.cmu.edu/about/work-with-us/index.cfm",
            key: "work-with-us",
            label: "Work with Us",
            type: "descriptive"
          },
          {
            description: "The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie Mellon on a number of major research projects.",
            href: "https://sei.cmu.edu/about/collaboration-with-cmu/index.cfm",
            key: "collaboration-with-cmu",
            label: "Collaboration with CMU",
            type: "descriptive"
          },
        ],
      ],
      divisionLink: {
        href: "https://sei.cmu.edu/divisions/",
        key: "divisions",
        label: "Divisions",
        type: "landing-page",
      },
      divisionRows: [
        {
          href: "https://sei.cmu.edu/divisions/ai",
          key: "artificial-intelligence-division",
          label: "Artificial Intelligence (AI) Division",
          type: "simple",
        },
        {
          href: "https://sei.cmu.edu/divisions/cert",
          key: "cert-division",
          label: "CERT Division",
          type: "simple",
        },
        {
          href: "https://sei.cmu.edu/divisions/software-solutions",
          key: "software-solutions-division",
          label: "Software Solutions Division",
          type: "simple",
        },
      ],
    }
  },
  {
    key: "research-and-development",
    title: "Research and Development",
    content: {
      topicsLink: {
        href: "https://sei.cmu.edu/our-work/all-topics/index.cfm",
        key: "topics",
        label: "Topics",
        type: "landing-page",
      },
      topicsColumns: [
        [
          {
            key: "agile",
            title: "Agile",
            href: "https://sei.cmu.edu/our-work/agile/index.cfm"
          },
          {
            key: "artificial-intelligence-engineering",
            title: "Artificial Intelligence Engineering",
            href: "https://sei.cmu.edu/our-work/artificial-intelligence-engineering/index.cfm"
          },
          {
            key: "cloud-computing",
            title: "Cloud Computing",
            href: "https://sei.cmu.edu/our-work/cloud-computing/index.cfm"
          },
          {
            key: "cyber-workforce-development",
            title: "Cyber Workforce Development",
            href: "https://sei.cmu.edu/our-work/cyber-workforce-development/index.cfm"
          },
          {
            key: "cybersecurity-center-development",
            title: "Cybersecurity Center Development",
            href: "https://sei.cmu.edu/our-work/cybersecurity-center-development/index.cfm"
          },
          {
            key: "cybersecurity-engineering",
            title: "Cybersecurity Engineering",
            href: "https://sei.cmu.edu/our-work/cybersecurity-engineering/index.cfm"
          },
          {
            key: "devsecops",
            title: "DevSecOps",
            href: "https://sei.cmu.edu/our-work/devsecops/index.cfm"
          },
          {
            key: "edge-computing",
            title: "Edge Computing",
            href: "https://sei.cmu.edu/our-work/edge-computing/index.cfm"
          }
        ],
        [
          {
            key: "enterprise-risk-and-resilience-management",
            title: "Engerprise Risk and Resilience Management",
            href: "https://sei.cmu.edu/our-work/enterprise-risk-resilience-management/index.cfm"
          },
          {
            key: "insider-threat",
            title: "Insider Threat",
            href: "https://sei.cmu.edu/our-work/insider-threat/index.cfm"
          },
          {
            key: "quantum-computing",
            title: "Quantum Computing",
            href: "https://sei.cmu.edu/our-work/quantum-computing/index.cfm"
          },
          {
            key: "reverse-engineering-for-malware-analysis",
            title: "Reverse Engineering for Malware Analysis",
            href: "https://sei.cmu.edu/our-work/reverse-engineering-for-malware-analysis/index.cfm"
          },
          {
            key: "secure-development",
            title: "Secure Development",
            href: "https://www.sei.cmu.edu/our-work/secure-development/index.cfm"
          },
          {
            key: "security-vulnerabilities",
            title: "Security Vulnerabilities",
            href: "https://sei.cmu.edu/our-work/security-vulnerabilities/index.cfm"
          },
          {
            key: "situational-awareness",
            title: "Situational Awareness",
            href: "https://sei.cmu.edu/our-work/situational-awareness/index.cfm"
          },
          {
            key: "software-architecture",
            title: "Software Architecture",
            href: "https://sei.cmu.edu/our-work/software-architecture/"
          }
        ]
      ],
      extra: [
        {
          cta: true,
          description: "Explore all SEI research and development projects.",
          href: "https://sei.cmu.edu/our-work/projects/index.cfm",
          key: "projects",
          label: "Projects",
          type: "descriptive"
        },
        {
          cta: true,
          description: "Access and download the software and tools that the SEI creates, tests, refines, and disseminates to improve the quality and security of software systems.",
          href: "https://sei.cmu.edu/publications/software-tools/index.cfm",
          key: "software-and-tools",
          label: "Software and Tools",
          type: "descriptive"
        },
      ]
    }
  },
  {
    key: "publications-and-media",
    title: "Publications and Media",
    content: {
      links: [
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "publications-and-media",
          label: "Publications and Media",
          type: "landing-page"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "digital-library",
          label: "Digital Library"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "podcasts",
          label: "Podcasts"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "technical-papers",
          label: "Technical Papers"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "videos",
          label: "Videos"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "vulnerability-notes",
          label: "Vulnerability Notes"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "history-of-innovation-at-the-sei",
          label: "History of Innovation at the SEI"
        },
      ],
      blogPosts: [
        {
          key: 0,
          title: "Cybersecurity of Quantum Computing: A New Frontier",
          published: "April 10, 2023",
          author: "Douglas Schmidt"
        },
        {
          key: 1,
          title: "Security Analytics: Using SILK and Mothra to Identify Data Exfiltration via the Domain Name",
          published: "April 3, 2023",
          author: "Grace Lewis"
        },
        {
          key: 2,
          title: "How to Use Docker and NS-3 to Create Realistic Network Simulations",
          published: "March 27, 2023",
          author: "Cecilia Alberts"
        }
      ]
    }
  },
  {
    key: "careers",
    title: "Careers",
    content: {
      careersLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "careers",
        label: "Careers",
        type: "landing-page"
      },
      careersLinks: [
        {
          href: "",
          key: "internship-opportunities",
          label: "Internship Opportunities",
          description: "Learn about internship opportunities for students and recent graduates at the Carnegie Mellon University Software Engineering Institute.",
          type: "descriptive"
        },
        {
          href: "",
          key: "diversity-equity-and-inclusion",
          label: "Diversity, Equity and Inclusion",
          description: "We identify best practices, develop detailed plans, and innovate pathways to our shared vision of a welcoming, empowering workplace for all.",
          type: "descriptive"
        },
      ],
      jobsLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "job-postings",
        label: "Job Postings",
        type: "landing-page"
      },
      jobs: [
        [
          {
            href: "",
            key: "assistant-software-engineer",
            label: "Assistant Software Engineer",
            posted: "Yesterday",
            locations: "2 Locations",
            type: "descriptive"
          },
          {
            href: "",
            key: "senior-assurance-researcher",
            label: "Senior Assurance Researcher",
            posted: "2 Days Ago",
            locations: "3 Locations",
            type: "descriptive"
          }
        ],
        [
          {
            href: "",
            key: "cybersecurity-operations-researcher",
            label: "Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive"
          },
          {
            href: "",
            key: "assistant-machine-learning-researcher",
            label: "Assistant Machine Learning Researcher",
            posted: "3 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive"
          }
        ],
        [
          {
            href: "",
            key: "associate-cybersecurity-operations-researcher",
            label: "Associate Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive"
          },
          {
            href: "",
            key: "lead-nuclear-surety-software-engineer",
            label: "Lead Nuclear Surety Software Engineer",
            posted: "6 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive"
          }
        ]
      ]
    }
  },
  {
    key: "education",
    title: "Education",
    content: {
      educationLinks: [
        {
          href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
          key: "education",
          label: "Education",
          type: "landing-page"
        },
        {
          href: "",
          key: "credentials",
          label: "Credentials",
          type: "descriptive",
          description: "Learn about the credentials, including certificates, certifications, and authorizations offered by the SEI that individuals can earn."
        },
        {
          href: "",
          key: "curricula",
          label: "Curricula",
          type: "descriptive",
          description: "Learn about SEI-developed curricula and educational materials, including how you can use them."
        },
        {
          href: "",
          key: "license-sei-materials",
          label: "License SEI Materials",
          type: "descriptive",
          description: "Learn how the SEI authorizes Partner organizations to deliver SEI training and services."
        },
      ],
      trainings: [
        {
          href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
          key: "training",
          label: "Training",
          type: "landing-page"
        },
        {
          href: "",
          key: "fundamentals-of-statistics-applied-to-cybersecurity",
          label: "Fundamentals of Statistics Applied to Cybersecurity"
        },
        {
          href: "",
          key: "advanced-analytics-netflow",
          label: "Advanced Analytics: Netflow"
        },
        {
          href: "",
          key: "advanced-analytics-malware",
          label: "Advanced Analytics: Malware"
        },
        {
          href: "",
          key: "advanced-analytics-digital-forensics",
          label: "Advanced Analytics: Digital Forensics"
        },
        {
          href: "",
          key: "cert-applied-data-science-for-cybersecurity-certificate-package",
          label: "CERT Applied Data Science for Cybersecurity Certificate Package"
        }
      ],
      eventLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "events",
        label: "Events",
        type: "landing-page"
      },
      events: [
        {
          dateRange: "Dec 5-7, 2023",
          description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P132",
          key: "insider-threat-analyst",
          label: "Insider Threat Analyst",
          month: "Dec",
          startDay: "5",
          type: "descriptive",
        },
        {
          dateRange: "Nov 14-16, 2023",
          description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect, and respond to insider activity. It discusses various techniques and methods for designing, implementing, and measuring the effectiveness of various components...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P133",
          key: "insider-threat-program-evaluator",
          label: "Insider Threat Program Evaluator",
          month: "Nov",
          startDay: "14",
          type: "descriptive"
        },
        {
          dateRange: "Nov 6-9, 2023",
          description: "This four-day course, designed for computer security incident response team (CSIRT) and security operations center (SOC) technical personnel with several months of incident handling experience, addresses techniques for detecting and responding...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P23B",
          key: "advanced-topics-in-incident-handling",
          label: "Advanced Topics in Incident Handling",
          month: "Nov",
          startDay: "6",
          type: "descriptive"
        },
      ]
    }
  },
  {
    key: "darkMode",
    tag: "a",
    href: "#",
    title: "Dark Mode",
    alignment: "right",
    onClick: (link: any, event: any) => {
      event.preventDefault()
      document.body.classList.toggle('dark')
    }
  }
])

const megaMenu2 = ref([
  {
    key: "about-1",
    title: "About",
    active: true,
    content: {
      aboutLink: {
        href: "https://sei.cmu.edu/about/index.cfm",
        key: "about",
        label: "About",
        type: "landing-page",
      },
      aboutRows: [
        [
          {
            description: "This page describes the leadership structure of the SEI and provides biographical information on SEI Fellows, the SEI leadership team, and the Board of Visitors.",
            href: "https://sei.cmu.edu/about/leadership/index.cfm",
            key: "leadership",
            label: "Leadership",
            type: "descriptive"
          },
          {
            description: "The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance the field of software engineering to meet emerging challenges.",
            href: "https://sei.cmu.edu/publications/annual-reviews/index.cfm",
            key: "annual-reviews",
            label: "Annual Reviews",
            type: "descriptive"
          },
        ],
        [
          {
            description: "As an FFRDC, the SEI works with government industry, and academia to address issues in software engineering, cybersecurity, process improvement, and more.",
            href: "https://sei.cmu.edu/about/work-with-us/index.cfm",
            key: "work-with-us",
            label: "Work with Us",
            type: "descriptive"
          },
          {
            description: "The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie Mellon on a number of major research projects.",
            href: "https://sei.cmu.edu/about/collaboration-with-cmu/index.cfm",
            key: "collaboration-with-cmu",
            label: "Collaboration with CMU",
            type: "descriptive"
          },
        ],
      ],
      divisionLink: {
        href: "https://sei.cmu.edu/divisions/",
        key: "divisions",
        label: "Divisions",
        type: "landing-page",
      },
      divisionRows: [
        {
          href: "https://sei.cmu.edu/divisions/ai",
          key: "artificial-intelligence-division",
          label: "Artificial Intelligence (AI) Division",
          type: "simple",
        },
        {
          href: "https://sei.cmu.edu/divisions/cert",
          key: "cert-division",
          label: "CERT Division",
          type: "simple",
        },
        {
          href: "https://sei.cmu.edu/divisions/software-solutions",
          key: "software-solutions-division",
          label: "Software Solutions Division",
          type: "simple",
        },
      ],
    }
  },
  {
    key: "research-and-development-1",
    title: "Research and Development",
    content: {
      topicsLink: {
        href: "https://sei.cmu.edu/our-work/all-topics/index.cfm",
        key: "topics",
        label: "Topics",
        type: "landing-page",
      },
      topicsColumns: [
        [
          {
            key: "agile",
            title: "Agile",
            href: "https://sei.cmu.edu/our-work/agile/index.cfm"
          },
          {
            key: "artificial-intelligence-engineering",
            title: "Artificial Intelligence Engineering",
            href: "https://sei.cmu.edu/our-work/artificial-intelligence-engineering/index.cfm"
          },
          {
            key: "cloud-computing",
            title: "Cloud Computing",
            href: "https://sei.cmu.edu/our-work/cloud-computing/index.cfm"
          },
          {
            key: "cyber-workforce-development",
            title: "Cyber Workforce Development",
            href: "https://sei.cmu.edu/our-work/cyber-workforce-development/index.cfm"
          },
          {
            key: "cybersecurity-center-development",
            title: "Cybersecurity Center Development",
            href: "https://sei.cmu.edu/our-work/cybersecurity-center-development/index.cfm"
          },
          {
            key: "cybersecurity-engineering",
            title: "Cybersecurity Engineering",
            href: "https://sei.cmu.edu/our-work/cybersecurity-engineering/index.cfm"
          },
          {
            key: "devsecops",
            title: "DevSecOps",
            href: "https://sei.cmu.edu/our-work/devsecops/index.cfm"
          },
          {
            key: "edge-computing",
            title: "Edge Computing",
            href: "https://sei.cmu.edu/our-work/edge-computing/index.cfm"
          }
        ],
        [
          {
            key: "enterprise-risk-and-resilience-management",
            title: "Engerprise Risk and Resilience Management",
            href: "https://sei.cmu.edu/our-work/enterprise-risk-resilience-management/index.cfm"
          },
          {
            key: "insider-threat",
            title: "Insider Threat",
            href: "https://sei.cmu.edu/our-work/insider-threat/index.cfm"
          },
          {
            key: "quantum-computing",
            title: "Quantum Computing",
            href: "https://sei.cmu.edu/our-work/quantum-computing/index.cfm"
          },
          {
            key: "reverse-engineering-for-malware-analysis",
            title: "Reverse Engineering for Malware Analysis",
            href: "https://sei.cmu.edu/our-work/reverse-engineering-for-malware-analysis/index.cfm"
          },
          {
            key: "secure-development",
            title: "Secure Development",
            href: "https://www.sei.cmu.edu/our-work/secure-development/index.cfm"
          },
          {
            key: "security-vulnerabilities",
            title: "Security Vulnerabilities",
            href: "https://sei.cmu.edu/our-work/security-vulnerabilities/index.cfm"
          },
          {
            key: "situational-awareness",
            title: "Situational Awareness",
            href: "https://sei.cmu.edu/our-work/situational-awareness/index.cfm"
          },
          {
            key: "software-architecture",
            title: "Software Architecture",
            href: "https://sei.cmu.edu/our-work/software-architecture/"
          }
        ]
      ],
      extra: [
        {
          cta: true,
          description: "Explore all SEI research and development projects.",
          href: "https://sei.cmu.edu/our-work/projects/index.cfm",
          key: "projects",
          label: "Projects",
          type: "descriptive"
        },
        {
          cta: true,
          description: "Access and download the software and tools that the SEI creates, tests, refines, and disseminates to improve the quality and security of software systems.",
          href: "https://sei.cmu.edu/publications/software-tools/index.cfm",
          key: "software-and-tools",
          label: "Software and Tools",
          type: "descriptive"
        },
      ]
    }
  },
  {
    key: "publications-and-media-1",
    title: "Publications and Media",
    content: {
      links: [
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "publications-and-media",
          label: "Publications and Media",
          type: "landing-page"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "digital-library",
          label: "Digital Library"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "podcasts",
          label: "Podcasts"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "technical-papers",
          label: "Technical Papers"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "videos",
          label: "Videos"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "vulnerability-notes",
          label: "Vulnerability Notes"
        },
        {
          href: "https://sei.cmu.edu/publications/index.cfm",
          key: "history-of-innovation-at-the-sei",
          label: "History of Innovation at the SEI"
        },
      ],
      blogPosts: [
        {
          key: 0,
          title: "Cybersecurity of Quantum Computing: A New Frontier",
          published: "April 10, 2023",
          author: "Douglas Schmidt"
        },
        {
          key: 1,
          title: "Security Analytics: Using SILK and Mothra to Identify Data Exfiltration via the Domain Name",
          published: "April 3, 2023",
          author: "Grace Lewis"
        },
        {
          key: 2,
          title: "How to Use Docker and NS-3 to Create Realistic Network Simulations",
          published: "March 27, 2023",
          author: "Cecilia Alberts"
        }
      ]
    }
  },
  {
    key: "careers-1",
    title: "Careers",
    content: {
      careersLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "careers",
        label: "Careers",
        type: "landing-page"
      },
      careersLinks: [
        {
          href: "",
          key: "internship-opportunities",
          label: "Internship Opportunities",
          description: "Learn about internship opportunities for students and recent graduates at the Carnegie Mellon University Software Engineering Institute.",
          type: "descriptive"
        },
        {
          href: "",
          key: "diversity-equity-and-inclusion",
          label: "Diversity, Equity and Inclusion",
          description: "We identify best practices, develop detailed plans, and innovate pathways to our shared vision of a welcoming, empowering workplace for all.",
          type: "descriptive"
        },
      ],
      jobsLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "job-postings",
        label: "Job Postings",
        type: "landing-page"
      },
      jobs: [
        [
          {
            href: "",
            key: "assistant-software-engineer",
            label: "Assistant Software Engineer",
            posted: "Yesterday",
            locations: "2 Locations",
            type: "descriptive"
          },
          {
            href: "",
            key: "senior-assurance-researcher",
            label: "Senior Assurance Researcher",
            posted: "2 Days Ago",
            locations: "3 Locations",
            type: "descriptive"
          }
        ],
        [
          {
            href: "",
            key: "cybersecurity-operations-researcher",
            label: "Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive"
          },
          {
            href: "",
            key: "assistant-machine-learning-researcher",
            label: "Assistant Machine Learning Researcher",
            posted: "3 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive"
          }
        ],
        [
          {
            href: "",
            key: "associate-cybersecurity-operations-researcher",
            label: "Associate Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive"
          },
          {
            href: "",
            key: "lead-nuclear-surety-software-engineer",
            label: "Lead Nuclear Surety Software Engineer",
            posted: "6 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive"
          }
        ]
      ]
    }
  },
  {
    key: "education-1",
    title: "Education",
    alignment: "right",
    content: {
      educationLinks: [
        {
          href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
          key: "education",
          label: "Education",
          type: "landing-page"
        },
        {
          href: "",
          key: "credentials",
          label: "Credentials",
          type: "descriptive",
          description: "Learn about the credentials, including certificates, certifications, and authorizations offered by the SEI that individuals can earn."
        },
        {
          href: "",
          key: "curricula",
          label: "Curricula",
          type: "descriptive",
          description: "Learn about SEI-developed curricula and educational materials, including how you can use them."
        },
        {
          href: "",
          key: "license-sei-materials",
          label: "License SEI Materials",
          type: "descriptive",
          description: "Learn how the SEI authorizes Partner organizations to deliver SEI training and services."
        },
      ],
      trainings: [
        {
          href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
          key: "training",
          label: "Training",
          type: "landing-page"
        },
        {
          href: "",
          key: "fundamentals-of-statistics-applied-to-cybersecurity",
          label: "Fundamentals of Statistics Applied to Cybersecurity"
        },
        {
          href: "",
          key: "advanced-analytics-netflow",
          label: "Advanced Analytics: Netflow"
        },
        {
          href: "",
          key: "advanced-analytics-malware",
          label: "Advanced Analytics: Malware"
        },
        {
          href: "",
          key: "advanced-analytics-digital-forensics",
          label: "Advanced Analytics: Digital Forensics"
        },
        {
          href: "",
          key: "cert-applied-data-science-for-cybersecurity-certificate-package",
          label: "CERT Applied Data Science for Cybersecurity Certificate Package"
        }
      ],
      eventLink: {
        href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
        key: "events",
        label: "Events",
        type: "landing-page"
      },
      events: [
        {
          dateRange: "Dec 5-7, 2023",
          description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P132",
          key: "insider-threat-analyst",
          label: "Insider Threat Analyst",
          month: "Dec",
          startDay: "5",
          type: "descriptive",
        },
        {
          dateRange: "Nov 14-16, 2023",
          description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect, and respond to insider activity. It discusses various techniques and methods for designing, implementing, and measuring the effectiveness of various components...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P133",
          key: "insider-threat-program-evaluator",
          label: "Insider Threat Program Evaluator",
          month: "Nov",
          startDay: "14",
          type: "descriptive"
        },
        {
          dateRange: "Nov 6-9, 2023",
          description: "This four-day course, designed for computer security incident response team (CSIRT) and security operations center (SOC) technical personnel with several months of incident handling experience, addresses techniques for detecting and responding...",
          href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P23B",
          key: "advanced-topics-in-incident-handling",
          label: "Advanced Topics in Incident Handling",
          month: "Nov",
          startDay: "6",
          type: "descriptive"
        },
      ]
    }
  },
  {
    key: "darkMode-1",
    tag: "a",
    href: "#",
    title: "Dark Mode",
    onClick: (link: any, event: any) => {
      event.preventDefault()
      document.body.classList.toggle('dark')
    }
  }
])

defineOptions({
  name: 'NavigationPage'
})

definePage({
  meta: {
    title: 'Navigation'
  }
})

useHead({
  title: 'Navigation'
})
</script>