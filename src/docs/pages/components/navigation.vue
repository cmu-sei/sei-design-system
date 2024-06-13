<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Link
      </h2>
      <div class="flex gap-2">
        <SdsLink
          href="https://sei.cmu.edu"
          kind="secondary"
          decoration="underline"
          size="xl"
          class="font-semibold"
        >
          SEI Homepage Decorated
        </SdsLink>
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
              <template #default="{ content }">
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
              <template #panel(about)="{ content }: { content?: MegaMenuContent }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-2">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="col-span-2">
                        <SdsMegaMenuItem
                          :label="content?.aboutLink?.label"
                          :type="content?.aboutLink?.type"
                          :href="content?.aboutLink?.href"
                        />
                      </div>
                      <div
                        v-for="row, index in content?.aboutRows"
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
                      :label="content?.divisionLink?.label"
                      :type="content?.divisionLink?.type"
                      :href="content?.divisionLink?.href"
                    />
                    <div
                      v-for="division in content?.divisionRows"
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
              <template #panel(research-and-development)="{ content }: { content?: MegaMenuContent }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-2">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="col-span-2">
                        <SdsMegaMenuItem
                          :label="content?.topicsLink?.label"
                          :type="content?.topicsLink?.type"
                          :href="content?.topicsLink?.href"
                        />
                      </div>
                      <template
                        v-for="column, index in content?.topicsColumns"
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
                      v-for="item in content?.extra"
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
              <template #panel(publications-and-media)="{ content }: { content?: MegaMenuContent }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <div
                      v-for="item in content?.links"
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
                      v-for="blogPost in content?.blogPosts"
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
              <template #panel(education)="{ content, close }: { content?: MegaMenuContent, close: Function }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <div
                      v-for="educationLink in content?.educationLinks"
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
                      v-for="training in content?.trainings"
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
                      :label="content?.eventLink?.label"
                      :type="content?.eventLink?.type"
                      :href="content?.eventLink?.href"
                    />
                    <div
                      v-for="event in content?.events"
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
                    @click="close()"
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
              <template #panel(careers)="{ content }: { content?: MegaMenuContent }">
                <div class="grid grid-cols-3 gap-2">
                  <div class="col-span-1">
                    <SdsMegaMenuItem
                      :href="content?.careersLink?.href"
                      :label="content?.careersLink?.label"
                      :type="content?.careersLink?.type"
                    />
                    <div
                      v-for="careerLink in content?.careersLinks"
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
                      :href="content?.jobsLink?.href"
                      :label="content?.jobsLink?.label"
                      :type="content?.jobsLink?.type"
                      :external="content?.jobsLink?.external"
                    />
                    <div
                      v-for="row, index in content?.jobs"
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
                          :external="job.external"
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
              <template #panel(about-1)="{ content }: { content?: MegaMenuContent }">
                <SdsMegaMenuItem
                  :label="content?.divisionLink?.label"
                  :type="content?.divisionLink?.type"
                  :href="content?.divisionLink?.href"
                  class="select-none"
                />
                <div
                  v-for="division in content?.divisionRows"
                  :key="division.key"
                >
                  <SdsMegaMenuItem
                    :label="division.label"
                    :href="division.href"
                  />
                </div>
              </template>
              <template #panel(research-and-development-1)="{ content }: { content?: MegaMenuContent }">
                <div
                  v-for="item in content?.extra"
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
              <template #panel(education-1)="{ content, close }: { content?: MegaMenuContent, close: Function }">
                <div class="max-w-lg">
                  <SdsMegaMenuItem
                    :label="content?.eventLink?.label"
                    :type="content?.eventLink?.type"
                    :href="content?.eventLink?.href"
                  />
                  <div
                    v-for="event in content?.events"
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
                    @click="close()"
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
              <template #panel(careers-1)="{ content }: { content?: MegaMenuContent }">
                <SdsMegaMenuItem
                  :href="content?.jobsLink?.href"
                  :label="content?.jobsLink?.label"
                  :type="content?.jobsLink?.type"
                  :external="content?.jobsLink?.external"
                />
                <div
                  v-for="row, index in content?.jobs"
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
                      :external="job.external"
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
        Mobile Menu
      </h2>
      <div>
        <div class="grid gap-4">
          <SdsMobileMenu
            v-model="showPanel"
            :mobile-menus="mobileMenus"
            side="left"
            size="sm"
          >
            <template #title>
              <p>
                <span class="font-bold text-red-600 dark:text-red-500">Suite</span><span class="font-semibold text-gray-600 dark:text-gray-400">Name</span>
              </p>
            </template>
            <template #default="{ navigate }">
              <SdsComboBox
                v-model="comboBox.modelValue"
                variant="gray"
                class="mb-4"
                :disabled="false"
                :autofocus="false"
                :disable-search="false"
                @enter="comboBox.onSearch"
              />
              <SdsNavigationItem
                v-for="menuItem in mobileMenus"
                :key="menuItem.key"
                :label="menuItem.title"
                :type="menuItem.type"
                :selected="menuItem.selected ?? false"
                @click="navigate(menuItem.key)"
              >
                <template
                  v-if="menuItem.icon"
                  #left
                >
                  <svg
                    v-if="menuItem.icon === 'plant'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M205.41 151.07a60.9 60.9 0 0 1-31.83 8.86a71.71 71.71 0 0 1-27.36-5.66A55.55 55.55 0 0 0 136 186.51V216a8 8 0 0 1-8.53 8a8.18 8.18 0 0 1-7.47-8.25v-12.44l-38.62-38.62A52.5 52.5 0 0 1 63.44 168a45.82 45.82 0 0 1-23.92-6.67C17.73 148.09 6 117.62 8.27 79.79a8 8 0 0 1 7.52-7.52c37.83-2.23 68.3 9.46 81.5 31.25a46 46 0 0 1 6.45 28.48a4 4 0 0 1-6.89 2.43l-19.2-20.1a8 8 0 0 0-11.31 11.31l53.88 55.25c.06-.78.13-1.56.21-2.33a68.56 68.56 0 0 1 18.64-39.46l50.59-53.46a8 8 0 0 0-11.31-11.32l-49 51.82a4 4 0 0 1-6.78-1.74c-4.74-17.48-2.65-34.88 6.4-49.82c17.86-29.48 59.42-45.26 111.18-42.22a8 8 0 0 1 7.52 7.52c3 51.77-12.78 93.33-42.26 111.19Z"
                    />
                  </svg>
                  <svg
                    v-if="menuItem.icon === 'tree'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 21v-3H3l5-5H5l5-5H7l5-5l5 5h-3l5 5h-3l5 5h-7v3h-4Z"
                    />
                  </svg>
                  <svg
                    v-if="menuItem.icon === 'bug'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 8h-1.81a5.985 5.985 0 0 0-1.82-1.96l.93-.93a.996.996 0 1 0-1.41-1.41l-1.47 1.47C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L9.11 3.7A.996.996 0 1 0 7.7 5.11l.92.93C7.88 6.55 7.26 7.22 6.81 8H5c-.55 0-1 .45-1 1s.45 1 1 1h1.09c-.05.33-.09.66-.09 1v1H5c-.55 0-1 .45-1 1s.45 1 1 1h1v1c0 .34.04.67.09 1H5c-.55 0-1 .45-1 1s.45 1 1 1h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19c.55 0 1-.45 1-1s-.45-1-1-1h-1.09c.05-.33.09-.66.09-1v-1h1c.55 0 1-.45 1-1s-.45-1-1-1h-1v-1c0-.34-.04-.67-.09-1H19c.55 0 1-.45 1-1s-.45-1-1-1zm-6 8h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1zm0-4h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                  </svg>
                </template>
                <template #children>
                  <SdsNavigationItem
                    v-for="child in (menuItem.content as MobileMenuContent).children"
                    :key="child.key"
                    :label="child.title"
                    :href="child.href"
                    :type="child.type"
                    :disabled="child.disabled"
                  />
                </template>
              </SdsNavigationItem>
              <hr class="mt-2 mb-2 border-gray-200 dark:border-gray-700">
              <SdsNavigationItem
                label="News & Media"
                href="/components/navigation"
              />
              <SdsNavigationItem
                label="Resources"
                href="/components/navigation"
              />
              <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
            </template>
            <template #panel(plants)="{ navigate }">
              <SdsNavigationItem
                type="back"
                @click="navigate()"
              />
              <SdsNavigationItem
                v-for="menuItem in (mobileMenus[0].content as MobileMenuContent).children"
                :key="menuItem.key"
                :label="menuItem.title"
                :href="menuItem.href"
                :type="menuItem.type"
                :disabled="menuItem.disabled"
              />
              <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
            </template>
            <template #panel(trees)="{ navigate }">
              <SdsNavigationItem
                type="back"
                @click="navigate()"
              />
              <SdsNavigationItem
                type="title"
                label="Trees"
              />
              <p class="text-lg pt-4 mb-2 dark:text-gray-200">
                <b>Tree Categories</b>
              </p>
              <SdsNavigationItem
                v-for="menuItem in (mobileMenus[1].content as MobileMenuContent).children_1"
                :key="menuItem.key"
                :label="menuItem.title"
                :href="menuItem.href"
              />
              <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
              <SdsNavigationItem
                v-for="menuItem in (mobileMenus[1].content as MobileMenuContent).children_2"
                :key="menuItem.key"
                :label="menuItem.title"
                :href="menuItem.href"
              />
              <hr class="mt-2 mb-1 border-gray-200 dark:border-gray-700">
            </template>
            <template #footer>
              <div class="flex flex-row text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 512 512"
                  class="border-r-gray-400 border-r pr-4 hover:text-red-600 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l217.6-163.2c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2a63.9 63.9 0 0 1-76.8 0L0 176z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 448 512"
                  class="pl-4 hover:text-red-600 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M0 64c0-17.7 14.3-32 32-32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zm0 352a64 64 0 1 1 128 0a64 64 0 1 1-128 0zm32-256c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 448 512"
                  class="hover:text-red-600 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48c27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 256 256"
                  class="hover:text-red-600 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M154.2 138.33a32 32 0 1 0-52.4 0a24.27 24.27 0 0 0-8.76 7a23.68 23.68 0 0 0-4.3 20.49l12.18 48A24.18 24.18 0 0 0 124.44 232h7.12a24.18 24.18 0 0 0 23.52-18.15l12.18-48a23.68 23.68 0 0 0-4.3-20.49a24.27 24.27 0 0 0-8.76-7.03ZM128 104a16 16 0 1 1-16 16a16 16 0 0 1 16-16Zm23.75 57.91l-12.18 48a8.18 8.18 0 0 1-8 6.09h-7.12a8.18 8.18 0 0 1-8-6.09l-12.18-48a7.71 7.71 0 0 1 1.42-6.73a8.26 8.26 0 0 1 6.58-3.18h31.5a8.26 8.26 0 0 1 6.58 3.18a7.71 7.71 0 0 1 1.4 6.73ZM72 128a56.27 56.27 0 0 0 1.76 14a8 8 0 1 1-15.49 4a72 72 0 1 1 139.46 0a8 8 0 0 1-7.74 6a8.12 8.12 0 0 1-2-.25a8 8 0 0 1-5.75-9.74A56 56 0 1 0 72 128Zm160 0a103.86 103.86 0 0 1-46.49 86.66a8 8 0 0 1-8.86-13.32a88 88 0 1 0-97.31 0A8 8 0 0 1 74.91 216a7.92 7.92 0 0 1-4.42-1.34A104 104 0 1 1 232 128Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="20"
                  viewBox="0 0 448 512"
                  class="hover:text-red-600 cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5c0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7c-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5c67.2 0 79.7 44.3 79.7 101.9V416z"
                  />
                </svg>
              </div>
            </template>
          </SdsMobileMenu>
          <SdsButton
            kind="secondary"
            class="max-w-xs"
            @click="showPanel = !showPanel"
          >
            Show Mobile Menu
          </SdsButton>
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
import { MegaMenuItem } from '../../../components/MegaMenu/MegaMenu.vue';
import { MobileMenuItem } from '../../../components/MobileMenu/MobileMenu.vue';
import { TabItem } from '../../../components/Tabs/Tabs.vue';

interface MegaMenuContent {
  aboutLink?: {
    href: string
    description?: string
    label: string
    key: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  aboutRows?: {
    description: string
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[][],
  divisionLink?: {
    href: string
    description?: string
    label: string
    key: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  divisionRows?: {
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  topicsLink?: {
    href: string
    description?: string
    label: string
    key: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  topicsColumns?: {
    key: string
    title: string
    href: string
  }[][],
  extra?: {
    cta: boolean
    description: string
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  links?: {
    href: string,
    key: string,
    label: string,
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  blogPosts?: {
    key: number,
    title: string
    published: string
    author: string
  }[],
  careersLink?: {
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  careersLinks?: {
    href: string
    description: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  jobsLink?: {
    href: string
    key: string
    label: string
    external: boolean
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  jobs?: {
    external: boolean,
    href: string
    key: string
    label: string
    posted: string
    locations: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[][],
  educationLinks?: {
    href: string
    description?: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  trainings?: {
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[],
  eventLink?: {
    href: string
    key: string
    label: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  },
  events?: {
    dateRange: string
    description: string
    href: string
    key: string
    label: string
    month: string
    startDay: string
    type?: 'landing-page' | 'descriptive' | 'simple'
  }[]
}

interface MobileMenuContent {
  children?: {
    key: string
    title: string
    href?: string
    type?: 'title' | 'simple' | 'slide' | 'back' | 'expand'
    disabled?: boolean
  }[],
  children_1?: {
    key: string,
    title: string,
    href: string
  }[],
  children_2?: {
    key: string,
    title: string,
    href: string
  }[]
}

const currentPage = ref(3)
const totalPages = ref(10)

const showPanel = ref(false)

const comboBox = reactive({
  modelValue: '',
  onSearch(value: string) {
    alert(`Searching: ${value}`)
  }
})

const tabs = ref<TabItem[]>([
  { key: "home", title: "Home", disabled: true },
  { key: "about", title: "About Us", active: true },
  { key: "workplace-services", title: "Workplace Services" },
  { key: "link-to-google", title: "Link to Google", tag: "a", href: "https://google.com", external: true, disabled: true },
  { key: "link-trigger", title: "Link Trigger", href: "https://google.com" },
  { key: "groups", align: "right" }
])

const changeTab = (tab: TabItem) => {
  console.log(tab);
}

const megaMenu = ref<MegaMenuItem<MegaMenuContent>[]>([
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
        external: true,
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
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "senior-assurance-researcher",
            label: "Senior Assurance Researcher",
            posted: "2 Days Ago",
            locations: "3 Locations",
            type: "descriptive",
            external: true
          }
        ],
        [
          {
            href: "",
            key: "cybersecurity-operations-researcher",
            label: "Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "assistant-machine-learning-researcher",
            label: "Assistant Machine Learning Researcher",
            posted: "3 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive",
            external: true
          }
        ],
        [
          {
            href: "",
            key: "associate-cybersecurity-operations-researcher",
            label: "Associate Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "lead-nuclear-surety-software-engineer",
            label: "Lead Nuclear Surety Software Engineer",
            posted: "6 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive",
            external: true
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
    onClick: (link: MegaMenuItem, event: Event) => {
      event.preventDefault()
      document.body.classList.toggle('dark')
    }
  }
])

const megaMenu2 = ref<MegaMenuItem<MegaMenuContent>[]>([
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
        type: "landing-page",
        external: true
      },
      jobs: [
        [
          {
            href: "",
            key: "assistant-software-engineer",
            label: "Assistant Software Engineer",
            posted: "Yesterday",
            locations: "2 Locations",
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "senior-assurance-researcher",
            label: "Senior Assurance Researcher",
            posted: "2 Days Ago",
            locations: "3 Locations",
            type: "descriptive",
            external: true
          }
        ],
        [
          {
            href: "",
            key: "cybersecurity-operations-researcher",
            label: "Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "assistant-machine-learning-researcher",
            label: "Assistant Machine Learning Researcher",
            posted: "3 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive",
            external: true
          }
        ],
        [
          {
            href: "",
            key: "associate-cybersecurity-operations-researcher",
            label: "Associate Cybersecurity Operations Researcher",
            posted: "Yesterday",
            locations: "Arlington",
            type: "descriptive",
            external: true
          },
          {
            href: "",
            key: "lead-nuclear-surety-software-engineer",
            label: "Lead Nuclear Surety Software Engineer",
            posted: "6 Days Ago",
            locations: "Pittsburgh",
            type: "descriptive",
            external: true
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
    onClick: (link: MegaMenuItem, event: Event) => {
      event.preventDefault()
      document.body.classList.toggle('dark')
    }
  }
])

const mobileMenus = ref<MobileMenuItem<MobileMenuContent>[]>([
  {
    key: "plants",
    title: "Plants",
    icon: "plant",
    type: "slide",
    selected: false,
    content: {
      children: [
        {
          key: "plants_title",
          title: "Plants",
          type: "title",
        },
        {
          key: "ferns",
          title: "Ferns",
          href: "/components/navigation",
          disabled: true
        },
        {
          key: "cacti",
          title: "Cacti",
          href: "/components/navigation",
        }
      ]
    }
  },
  {
    key: "trees",
    title: "Trees",
    icon: "tree",
    type: "slide",
    selected: false,
    content: {
      children_1: [
        {
          key: "deciduous",
          title: "Deciduous",
          href: "/components/navigation"
        },
        {
          key: "leafy",
          title: "Leafy",
          href: "/components/navigation"
        }
      ],
      children_2: [
        {
          key: "tree_anatomy",
          title: "Tree Anatomy",
          href: "/components/navigation"
        },
        {
          key: "available_saplings",
          title: "Available Saplings",
          href: "/components/navigation"
        }
      ]
    }
  },
  {
    key: "bugs",
    title: "Bugs",
    icon: "bug",
    type: "expand",
    selected: false,
    content: {
      children: [
        {
          key: "anthropods",
          title: "Anthropods",
          href: "/components/navigation",
          type: "simple",
          disabled: false
        },
        {
          key: "arachnids",
          title: "Arachnids",
          href: "/components/navigation",
          type: "simple",
          disabled: false
        }
      ]
    }
  },
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
