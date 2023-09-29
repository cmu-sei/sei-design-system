<template>
  <div class="guide">
    <div class="input-group my-10">
      <SdsInput />
      <SdsInput />
      <SdsInput />
      <SdsInput />
      <SdsButton
        kind="primary"
      >
        I am Testing A11y
      </SdsButton>
      <SdsInput />
    </div>
    <div class="input-group my-10">
      <SdsInput />
      <SdsInput />
      <SdsButton
        disabled
        kind="primary"
      >
        I am Testing A11y
      </SdsButton>
    </div>
    <div class="input-group my-10">
      <SdsInput count-characters />
    </div>
    <p>MegaMenu</p>
    <div class="my-10">
      <SdsMegaMenu
        v-model="megaMenu"
        kind="block"
      >
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
                    :kind="content.aboutLink.kind"
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
                        :kind="link.kind"
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
                :kind="content.divisionLink.kind"
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
                    :kind="content.topicsLink.kind"
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
                  :kind="item.kind"
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
                  :kind="item.kind ? item.kind : 'simple'"
                />
              </div>
            </div>
            <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
              <SdsMegaMenuItem
                label="Blog"
                kind="landing-page"
                href="https://sei.cmu.edu/our-work/projects/index.cfm"
              />
              <div
                v-for="blogPost in content.blogPosts"
                :key="blogPost.key"
                class="mb-2"
              >
                <SdsMegaMenuItem
                  :label="blogPost.title"
                  kind="descriptive"
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
                kind="landing-page"
                href="https://sei.cmu.edu/our-work/projects/index.cfm"
              />
              <SdsMegaMenuItem
                label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
                kind="descriptive"
                href="https://sei.cmu.edu/news/index.cfm"
              >
                <template #top>
                  <img
                    src="src/assets/images/Software-Engineering-Workshop-f.max-640x366.format-webp.webp"
                  >
                </template>
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
                  :kind="educationLink.kind"
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
                  :kind="training.kind"
                />
              </div>
            </div>
            <div class="col-span-1 border-l dark:border-l-gray-800 pl-2">
              <SdsMegaMenuItem
                :label="content.eventLink.label"
                :kind="content.eventLink.kind"
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
                  :kind="event.kind"
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
              kind="danger"
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
                :kind="content.careersLink.kind"
              />
              <div
                v-for="careerLink in content.careersLinks"
                :key="careerLink.key"
              >
                <SdsMegaMenuItem
                  :href="careerLink.href"
                  :label="careerLink.label"
                  :kind="careerLink.kind"
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
                :kind="content.jobsLink.kind"
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
                    :kind="job.kind"
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
    <div class="my-10">
      <SdsMegaMenu
        v-model="megaMenu2"
        width="auto"
      >
        <template #panel(about-1)="{ content }">
          <SdsMegaMenuItem
            :label="content.divisionLink.label"
            :kind="content.divisionLink.kind"
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
              :kind="item.kind"
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
              kind="landing-page"
              href="https://sei.cmu.edu/our-work/projects/index.cfm"
            />
            <SdsMegaMenuItem
              label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
              kind="descriptive"
              href="https://sei.cmu.edu/news/index.cfm"
            >
              <template #top>
                <img
                  src="src/assets/images/Software-Engineering-Workshop-f.max-640x366.format-webp.webp"
                >
              </template>
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
              :kind="content.eventLink.kind"
              :href="content.eventLink.href"
            />
            <div
              v-for="event in content.events"
              :key="event.key"
            >
              <SdsMegaMenuItem
                :href="event.href"
                :label="event.label"
                :kind="event.kind"
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
              kind="danger"
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
            :kind="content.jobsLink.kind"
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
                :kind="job.kind"
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
    <SdsToggleSwitch v-model="toggleSwitchValue" />
    <div class="h-48 w-48">
      <SdsLoadingBox />
    </div>
    <div class="my-12">
      <p>Indicator</p>
      <div class="p-6 flex flex-wrap gap-6">
        <SdsIndicator
          size="sm"
          variant="gray"
          placement="top-left"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="sm"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          placement="top-right"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          size="lg"
          placement="bottom-left"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="lg"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          size="sm"
          variant="gray"
          placement="bottom-right"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="sm"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          placement="bottom-right"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          size="lg"
          placement="bottom-right"
          placement-over="circle"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="lg"
            shape="circle"
          />
        </SdsIndicator>
        <SdsIndicator
          size="sm"
          placement="bottom-right"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="sm"
          />
        </SdsIndicator>
        <SdsIndicator placement="bottom-right">
          <SdsAvatar name="Jason Shimkoski" />
        </SdsIndicator>
        <SdsIndicator
          size="lg"
          placement="bottom-right"
        >
          <SdsAvatar
            name="Jason Shimkoski"
            size="lg"
          />
        </SdsIndicator>
        <SdsIndicator
          variant="green"
          size="sm"
          placement="top-left"
        >
          <SdsButton variant="primary">
            Cool
          </SdsButton>
        </SdsIndicator>
        <SdsIndicator
          variant="red"
          size="sm"
          placement="top-right"
        >
          <SdsButton variant="primary">
            Cool
          </SdsButton>
        </SdsIndicator>
        <SdsIndicator
          variant="teal"
          size="sm"
          placement="bottom-left"
        >
          <SdsButton variant="primary">
            Cool
          </SdsButton>
        </SdsIndicator>
        <SdsIndicator
          variant="orange"
          placement="top-right"
          status="This is awesome"
        >
          <SdsButton variant="primary">
            Cool
          </SdsButton>
        </SdsIndicator>
      </div>
    </div>
    <div class="my-12">
      <p>Floating Action Button</p>
      <div class="p-6 space-y-4">
        <sds-floating-action-button
          v-model="fabTabs"
          show-indicator
          @open="fabOpen"
          @close="fabClose"
        >
          <template #tab-icon(tab1)>
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
          </template>
          <template #trigger-icon>
            <img
              src="https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png"
              alt="About SEI"
            >
          </template>
          <template #tab(tab1)="{ tab }">
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
            <p>Hello, there! This is {{ tab.title }}.</p>
          </template>
          <template #tab(tab2)>
            <p>Hello, there! This is tab 2.</p>
          </template>
          <template #tab(tab3)>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
            <p>Hello, there! This is tab 3.</p>
          </template>
          <template #tab(tab4)>
            <p>Hello, there! This is tab 4.</p>
          </template>
        </sds-floating-action-button>
      </div>
    </div>
    <p>Datapoint</p>
    <div class="p-6 space-y-4">
      <sds-datapoint
        size="lg"
        variant="red"
      >
        {{ datapointModel.toLocaleString() }}
        <template #label>
          Super Mario
        </template>
        <template #context>
          <sds-badge
            variant="teal"
            type="light-border"
          >
            Yahoo!
          </sds-badge>
        </template>
      </sds-datapoint>
      <sds-datapoint>
        400
        <template #label>
          Label
        </template>
        <template #context>
          Context
        </template>
      </sds-datapoint>
      <sds-datapoint
        v-model="datapointModel"
        size="lg"
        variant="orange"
        label="Coffee"
        context="Cups"
      />
    </div>
    <p>Badge</p>
    <div class="p-6 space-y-4">
      <div class="space-x-4">
        <sds-badge type="light-border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          <span>Tree</span>
        </sds-badge>
        <sds-badge type="light">
          Badge Content
        </sds-badge>
        <sds-badge type="medium">
          Badge Content
        </sds-badge>
        <sds-badge type="dark">
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="tan"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="tan"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="tan"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="tan"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="yellow"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="yellow"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="yellow"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="yellow"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="orange"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="orange"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="orange"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="orange"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="pink"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="pink"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="pink"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="pink"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="red"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="red"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="red"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="red"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="purple"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="purple"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="purple"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="purple"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="indigo"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="indigo"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="indigo"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="indigo"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="blue"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="blue"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="blue"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="blue"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="teal"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="teal"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="teal"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="teal"
        >
          Badge Content
        </sds-badge>
      </div>
      <div class="space-x-4">
        <sds-badge
          type="light-border"
          variant="green"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="light"
          variant="green"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="medium"
          variant="green"
        >
          Badge Content
        </sds-badge>
        <sds-badge
          type="dark"
          variant="green"
        >
          Badge Content
        </sds-badge>
      </div>
    </div>
    <p>Spinner</p>
    <div class="p-6 space-y-8">
      <sds-loading-spinner size="sm" />
      <sds-loading-spinner />
      <sds-loading-spinner size="lg" />
      <sds-button
        variant="primary"
        class="flex gap-2"
      >
        <sds-loading-spinner
          size="sm"
          class="my-auto"
        /> Testing
      </sds-button>
    </div>
    <p>Tabs</p>
    <div class="p-6 space-y-8">
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
    <p>Select</p>
    <div class="p-6">
      <SdsFormGroup
        v-slot="{ id }"
        label="Select field"
        show-marker
        required
      >
        <sds-select
          :id="id"
          v-model="selectModel"
          :options="selectOptions"
        />
      </SdsFormGroup>
    </div>
    <p>Floating UI</p>
    <div class="p-6 bg-white dark:bg-gray-900">
      Dropdown:
      <sds-floating-ui
        :offset="5"
        placement="bottom-start"
        popper-class="absolute border shadow-lg w-56 rounded-md bg-white dark:border-gray-500 dark:bg-gray-700"
      >
        <template #trigger="{ toggle }">
          <sds-button
            variant="primary"
            @click="toggle"
          >
            Hello
          </sds-button>
        </template>
        <template #default="{ close }">
          <div class="py-2">
            <p @click="close">
              This is a dropdown
            </p>
          </div>
        </template>
      </sds-floating-ui>
    </div>
    <div class="p-6 bg-white dark:bg-gray-900">
      Tooltip:
      <sds-floating-ui
        popper-class="absolute bg-black text-white text-xs shadow rounded-lg w-32 text-center"
        arrow-class="absolute bg-black w-2 h-2 rotate-45"
        placement-top-arrow-class="-bottom-1"
        placement-right-arrow-class="-left-1"
        placement-bottom-arrow-class="-top-1"
        placement-left-arrow-class="-right-1"
        :will-open="willOpen"
        :will-close="willClose"
      >
        <template #trigger="{ open, close }">
          <sds-button
            variant="primary"
            @mouseover="open"
            @mouseout="close"
          >
            Hello
          </sds-button>
        </template>
        <template #default>
          <div class="p-2">
            <p>News &amp; Events</p>
          </div>
        </template>
      </sds-floating-ui>
    </div>
    <div class="p-6 bg-white dark:bg-gray-900">
      Popover:
      <sds-floating-ui
        popper-class="absolute z-10 bg-white border shadow rounded-lg"
        arrow-class="absolute bg-white border w-3 h-3 rotate-45"
        placement-top-arrow-class="-bottom-1.5 border-t-0 border-l-0"
        placement-right-arrow-class="-left-1.5 border-t-0 border-r-0"
        placement-bottom-arrow-class="-top-1.5 border-b-0 border-r-0"
        placement-left-arrow-class="-right-1.5 border-b-0 border-l-0"
        shift
      >
        <template #trigger="{ open, close }">
          <sds-button
            variant="primary"
            @mouseover="open(500)"
            @mouseout="close(500)"
          >
            Hello
          </sds-button>
        </template>
        <template #default="{ open, close }">
          <div
            class="p-4"
            @mouseover="open"
            @mouseout="close(500)"
          >
            <p @click="close">
              This is a popover
            </p>
            <p>lkajsdflkjsdalf</p>
            <p>lkajsdflkjsdalf</p>
            <p>lkajsdflkjsdalf</p>
            <p>lkajsdflkjsdalf</p>
          </div>
        </template>
      </sds-floating-ui>
    </div>
    <p>File Uploader</p>
    <div class="p-8 bg-white dark:bg-gray-900">
      <sds-file-uploader
        v-model="fileUploaderModel"
        accept=".jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .csv, .json"
        helper-text="Use a JSON, JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX or CSV under 1MB."
        :allowed-filetypes="[
          'image/jpeg',
          'image/png',
          'text/csv',
          'application/json',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]"
        :filesize="1"
        multiple
      />
      <div class="grid grid-cols-4 gap-4 my-4">
        <div
          v-for="image in uploadedImages"
          :key="image.src"
          class="border rounded p-4"
        >
          <img
            :src="image.src"
            :title="image.caption"
            class="w-64 h-auto"
          >
          <p>{{ image.caption }}</p>
          <sds-input v-model="image.caption" />
          <p>{{ image.name }}</p>
          <p>{{ image.type }}</p>
          {{ image }}
        </div>
      </div>
      <sds-button
        variant="default"
        @click="fileUploaderModel = []"
      >
        Clear files
      </sds-button>
    </div>
    <div class="p-8 bg-white dark:bg-gray-900">
      <sds-file-uploader />
    </div>
    <p>Scroll area</p>
    <sds-scrollspy
      :items="[
        { id: 'scrollspy-test', text: 'Test 1' },
        { id: 'scrollspy-test-2', text: 'Test 2' },
        { id: 'scrollspy-test-3', text: 'Test 3' },
        { id: 'scrollspy-test-4', text: 'Test 4' },
        { id: 'scrollspy-test-5', text: 'Test 5' }
      ]"
      parent="#scrollspy-parent"
      item-class="nav nav-primary nav-underline"
      active-class="active"
      class="nav-group"
    />
    <sds-scroll-area
      id="scrollspy-parent"
      class="h-96 mb-4"
    >
      <p
        id="scrollspy-test"
        class="mb-48 text-4xl text-green-700 dark:text-green-300"
      >
        test 1
      </p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p
        id="scrollspy-test-2"
        class="mb-48 text-4xl text-green-700 dark:text-green-300"
      >
        test 2
      </p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p
        id="scrollspy-test-3"
        class="mb-48 text-4xl text-green-700 dark:text-green-300"
      >
        test 3
      </p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p
        id="scrollspy-test-4"
        class="mb-48 text-4xl text-green-700 dark:text-green-300"
      >
        test 4
      </p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p
        id="scrollspy-test-5"
        class="mb-48 text-4xl text-green-700 dark:text-green-300"
      >
        test 5
      </p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </sds-scroll-area>
    <h2 class="mb-6 text-4xl">
      Examples
    </h2>
    <sds-section
      type="raised"
      nav-class="gap-2"
    >
      <template #title>
        <h3 class="text-2xl">
          Hello
        </h3>
      </template>
      <template #subtitle>
        <p>Subtitle text</p>
      </template>
      <template #nav>
        <a
          href="#"
          class="nav nav-pill nav-blue"
        >Option 1</a>
        <a
          href="#"
          class="nav nav-pill nav-blue"
        >Option 2</a>
        <a
          href="#"
          class="nav nav-pill nav-blue active"
        >Option 3</a>
      </template>
      <div>
        <section class="mb-4">
          <sds-popover>
            <template #trigger>
              <sds-link
                href="#"
                variant="primary"
                external
              >
                External link (has a popover)
              </sds-link>
            </template>
            <p>Popover content</p>
          </sds-popover>
        </section>
        <section class="mb-4">
          <h3 class="my-4 text-lg">
            Top Five Chart
          </h3>
          <sds-top-five-chart
            title="Top Five Chart"
            :entries="topFiveEntries"
          />
        </section>
        <div class="mb-4 align-right">
          <h4 class="mb-4 text-lg">
            Toaster
          </h4>
          <sds-toaster v-model="toasts" />
          <button
            class="btn btn-blue"
            @click="generateToast"
          >
            Generate Toast
          </button>

          <h4 class="my-4 text-lg">
            Dropdown (open on hover, custom styling, click btn to go home)
          </h4>
          <sds-dropdown
            title="Dropdown"
            auto
          >
            <div class="text-sm px-4">
              This is going to be a lot of text. This is going to be a lot of
              text. This is going to be a lot of text. This is going to be a lot
              of text.
            </div>
            <sds-dropdown-header>
              <p>Signed in as</p>
              <p class="font-semibold truncate">
                tom@example.com
              </p>
            </sds-dropdown-header>
            <sds-dropdown-divider />
            <sds-dropdown-item
              href="/"
              disabled
            >
              Guide
            </sds-dropdown-item>
            <sds-dropdown-item href="#">
              Support
            </sds-dropdown-item>
            <sds-dropdown-item href="#">
              License
            </sds-dropdown-item>
            <sds-dropdown-divider />
            <form
              method="POST"
              action="#"
            >
              <sds-dropdown-item
                tag="button"
                type="submit"
              >
                Sign out
              </sds-dropdown-item>
            </form>
          </sds-dropdown>

          <sds-dropdown
            :title="`Modal Size: ${modalSize}`"
            placement="bottom-end"
            size="sm"
          >
            <sds-dropdown-header> Select the modal's size </sds-dropdown-header>
            <sds-dropdown-divider />
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('sm')"
            >
              Small
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('md')"
            >
              Medium
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('lg')"
            >
              Large
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('xl')"
            >
              Extra Large
            </sds-dropdown-item>
          </sds-dropdown>
        </div>

        <div class="space-y-8 mb-8">
          <h4 class="text-lg">
            Sds Textarea & Sds Input
          </h4>
          <div class="grid gap-8">
            <sds-form-group
              v-slot="{ id, valid, invalid, required, readonly }"
              label="Field label"
              description="This is a field description"
              helper-text="This is a field helper text"
              required
              invalid-feedback="Please enter at least 5 characters"
              valid-feedback="Woohoo!"
              :state="maxTextarea.input.length < 3 ? null : maxTextarea.input !== '' && maxTextarea.input.length > 5"
            >
              <sds-textarea
                :id="id"
                v-model="maxTextarea.input"
                placeholder="Enter text here"
                :valid="valid"
                :invalid="invalid"
                :required="required"
                :readonly="readonly"
                :maxlength="2000"
                count-characters
              />
            </sds-form-group>
            <sds-form-group
              v-slot="{ id, valid, invalid, required, readonly }"
              label="Field label"
              description="This is a field description"
              helper-text="This is a field helper text"
              required
              invalid-feedback="Please enter at least 5 characters"
              valid-feedback="Woohoo!"
              :state="maxTextarea.input.length < 3 ? null : maxTextarea.input !== '' && maxTextarea.input.length > 5"
            >
              <sds-input
                :id="id"
                v-model="maxTextarea.input"
                :valid="valid"
                :invalid="invalid"
                :required="required"
                :readonly="readonly"
                placeholder="Enter text here"
                :maxlength="20"
                count-characters
              />
            </sds-form-group>
          </div>
        </div>

        <sds-tooltip>
          <template #trigger>
            <button
              class="btn btn-blue"
              @click="showModal = true"
            >
              Show Modal Component
            </button>
          </template>
          <p>Click this to show a modal!</p>
        </sds-tooltip>
        <sds-modal
          v-model="showModal"
          :size="modalSize"
        >
          <template #title>
            <h3>Modal title</h3>
          </template>

          <div class="mb-4">
            <p>Lorem ipsum...</p>
            <p>Lorem ipsum...</p>
            <p>Lorem ipsum...</p>
            <p>Lorem ipsum...</p>
            <p>Lorem ipsum...</p>
            <p>Let's make sure the modal destroys correctly:</p>
            <a
              href="/"
              class="link link-primary"
            >Go home</a>
          </div>
          <sds-dropdown
            v-model="showModalSizeDropdown"
            :title="`Modal Size: ${modalSize}`"
            btn-class="btn btn-default"
          >
            <sds-dropdown-header>
              <p class="font-semibold text-gray-500">
                Select the modal's size
              </p>
            </sds-dropdown-header>
            <sds-dropdown-divider />
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('sm')"
            >
              Small
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('md')"
            >
              Medium
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('lg')"
            >
              Large
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              @click="changeModalSize('xl')"
            >
              Extra Large
            </sds-dropdown-item>
          </sds-dropdown>
          <template #footer>
            <button
              class="btn btn-red"
              @click="showModal = false"
            >
              Close
            </button>
          </template>
        </sds-modal>

        <h4 class="my-4 text-lg">
          Calendar
        </h4>
        <sds-calendar
          v-model="calendar.date"
          :min="calendar.min"
          :max="calendar.max"
          :mode="calendar.mode"
          :size="calendar.size"
        />

        <form
          class="space-y-4"
          @submit.prevent
        >
          <SdsFormGroup
            v-slot="{ required }"
            el="fieldset"
            label="Date range"
            description="Select a start and an end date"
            show-field-marker
            required
          >
            <sds-datepicker
              v-model="calendar.date"
              :min="calendar.min"
              :max="calendar.max"
              :mode="calendar.mode"
              :size="calendar.size"
              :required="required"
              use-current-time-for-today
            />
          </SdsFormGroup>
          <sds-button
            kind="danger"
            type="button"
            :disabled="calendar.date.start === null || calendar.date.end === null"
          >
            Test button
          </sds-button>
          <sds-datepicker
            v-model="calendar2.date"
            :min="calendar2.min"
            :max="calendar2.max"
            :mode="calendar2.mode"
            :size="calendar2.size"
            required
          />
          <sds-datepicker
            v-model="calendar2.date"
            :min="calendar2.min"
            :max="calendar2.max"
            mode="date"
            :size="calendar2.size"
            required
          />
          <sds-datepicker
            v-model="calendar2.date"
            :min="calendar2.min"
            :max="calendar2.max"
            mode="time"
            :size="calendar2.size"
            required
          />
          <sds-datepicker
            v-model="calendarSingle.date"
            :min="calendarSingle.min"
            :max="calendarSingle.max"
            :mode="calendarSingle.mode"
            :size="calendarSingle.size"
            required
          />
          <sds-datepicker
            v-model="calendarSingle.date"
            :min="calendarSingle.min"
            :max="calendarSingle.max"
            mode="date"
            :size="calendarSingle.size"
            required
          />
          <sds-datepicker
            v-model="calendarSingle.date"
            :min="calendarSingle.min"
            :max="calendarSingle.max"
            mode="time"
            :size="calendarSingle.size"
            required
          />
          <input
            type="submit"
            value="Submit"
            class="mt-4 btn btn-primary"
          >
        </form>

        <h4 class="my-4 text-lg">
          Paginator
        </h4>
        <sds-paginator
          :current-page="paginator.currentPage"
          :total-pages="paginator.totalPages"
        />

        <h4 class="my-4 text-lg">
          Multiselect
        </h4>
        <form @submit.prevent>
          <SdsFormGroup
            label="Multiselect Example"
            description="This is just an example"
            valid-feedback="cool"
            invalid-feedback="bummer"
            required
          >
            <template #description>
              Overriding the description
            </template>
            <template #validFeedback>
              Overriding valid feedback
            </template>
            <template #invalidFeedback>
              Overriding invalid feedback
            </template>
            <template #default="{ id, required }">
              <sds-multiselect
                :id="id"
                v-model="multiselect.input"
                :selected="multiselect.selected"
                :options="filteredMultiselectOptions"
                :required="required"
                show-clear
                multiple
                taggable
                @update-selected="updateSelected"
              />
            </template>
          </SdsFormGroup>
          <p>Selected: {{ JSON.stringify(multiselect.selected) }}</p>
          <input
            type="submit"
            value="Submit"
            class="btn btn-primary"
          >
        </form>

        <h4 class="my-4 text-lg">
          Filter By Dropdown
        </h4>
        <div class="space-y-4">
          <div>
            <sds-filter-by-dropdown
              v-model="filterby.options"
              :title="filterByBtnText"
              enable-filter
              enable-sort-options
              @update:model-value="filtered"
            />
          </div>
          <div>
            <sds-filter-by-dropdown
              v-model="filterby.options"
              :title="filterByBtnText"
              variant="primary"
              right
              @update:model-value="filtered"
            />
          </div>
          <ul v-if="filterBySelectedOptions.length > 0">
            <li
              v-for="o in filterBySelectedOptions"
              :key="o.id"
            >
              {{ o.text }}
            </li>
          </ul>
          <p>Filtering by ids: {{ filterby.idsText }}</p>
        </div>

        <h4 class="my-4 text-lg">
          Autosuggest
        </h4>
        <div>
          <SdsFormGroup
            v-slot="{ id }"
            label="Autosuggest Example"
            description="This is just an example"
            required
          >
            <sds-autosuggest
              :id="id"
              v-model="text"
              :items="items"
              :threshold="2"
              :autosuggest="autosuggest"
              :disable-search="text === ''"
              placeholder="Search for a fruit"
              variant="primary"
              use-built-in-highlighting
              @result="result"
              @search="search"
            />
          </SdsFormGroup>
          <p class="mt-3">
            You performed a search with: {{ searchText }}
          </p>
        </div>

        <h4 class="my-4 text-lg">
          Search Box
        </h4>
        <div class="space-y-4">
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            @search="search"
          />
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            variant="primary"
            @search="search"
          />
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            variant="success"
            @search="search"
          />
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            variant="info"
            @search="search"
          />
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            variant="warning"
            @search="search"
          />
          <sds-search-box
            v-model="text"
            placeholder="Search for a fruit"
            :disable-search="text === ''"
            variant="danger"
            @search="search"
          />
        </div>

        <h4 class="my-4 text-lg">
          Radio Group
        </h4>
        <div class="py-12">
          <sds-form-group
            v-slot="{ required }"
            el="fieldset"
            label="Checkbox Group"
            description="Please select one or more of the options"
            description-position="top"
            required
          >
            <sds-checkbox-group
              v-model="checkboxModel"
              :options="checkboxOptions"
              :required="required"
              @change="$emit('radioGroupChange')"
            >
              <template #label="{ optionId, option }">
                <label :for="optionId">
                  Radio Group: {{ option.text }}
                </label>
              </template>
            </sds-checkbox-group>
          </sds-form-group>
        </div>
        <div class="py-12">
          <sds-form-group
            v-slot="{ required }"
            el="fieldset"
            label="Radio Group"
            description="Please select one of the options"
            description-position="top"
            required
          >
            <sds-radio-group
              v-model="radio2Model"
              :options="radioOptions"
              :required="required"
              stacked
              @change="$emit('radioGroupChange')"
            >
              <template #label="{ optionId, option }">
                <label :for="optionId">
                  Radio Group 2: {{ option.text }}
                </label>
              </template>
            </sds-radio-group>
          </sds-form-group>
        </div>
        <sds-radio-group
          v-model="radio3Model"
          :options="radioOptions"
          required
          stacked
          @change="$emit('radioGroupChange')"
        >
          <template #label="{ optionId, option }">
            <label :for="optionId">
              Radio Group 2: {{ option.text }}
            </label>
          </template>
        </sds-radio-group>
      </div>
      <sds-table
        id="table_example"
        :fields="fields"
        :items="tableItems"
        :on-sort="sortTableItems"
        :sort-by="sortField"
        :sort-desc="sortDesc"
        enable-drawer
        @open-drawer="handleDrawerOpen"
      >
        <template #drawer="{ item }">
          {{ item }}
        </template>
        <template #cell(author_title)="{ item, format }">
          <p>{{ item.title }}</p>
          <p class="text-gray-500 text-sm">
            {{ format('author') }}
          </p>
        </template>
        <template #cell(actions)="{ item }">
          <sds-button
            variant="default"
            size="sm"
          >
            Do something for: {{ item.id }}
          </sds-button>
        </template>
        <template #head(actions)="{ field }">
          {{ field.label }}
          <sds-button @click="addField">
            Add field
          </sds-button>
        </template>
      </sds-table>
    </sds-section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExamplesSection",
  emits: ["radioGroupChange", "hello"],
  data() {
    return {
      megaMenu: [
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
              kind: "landing-page",
            },
            aboutRows: [
              [
                {
                  description: "This page describes the leadership structure of the SEI and provides biographical information on SEI Fellows, the SEI leadership team, and the Board of Visitors.",
                  href: "https://sei.cmu.edu/about/leadership/index.cfm",
                  key: "leadership",
                  label: "Leadership",
                  kind: "descriptive"
                },
                {
                  description: "The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance the field of software engineering to meet emerging challenges.",
                  href: "https://sei.cmu.edu/publications/annual-reviews/index.cfm",
                  key: "annual-reviews",
                  label: "Annual Reviews",
                  kind: "descriptive"
                },
              ],
              [
                {
                  description: "As an FFRDC, the SEI works with government industry, and academia to address issues in software engineering, cybersecurity, process improvement, and more.",
                  href: "https://sei.cmu.edu/about/work-with-us/index.cfm",
                  key: "work-with-us",
                  label: "Work with Us",
                  kind: "descriptive"
                },
                {
                  description: "The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie Mellon on a number of major research projects.",
                  href: "https://sei.cmu.edu/about/collaboration-with-cmu/index.cfm",
                  key: "collaboration-with-cmu",
                  label: "Collaboration with CMU",
                  kind: "descriptive"
                },
              ],
            ],
            divisionLink: {
              href: "https://sei.cmu.edu/divisions/",
              key: "divisions",
              label: "Divisions",
              kind: "landing-page",
            },
            divisionRows: [
              {
                href: "https://sei.cmu.edu/divisions/ai",
                key: "artificial-intelligence-division",
                label: "Artificial Intelligence (AI) Division",
                kind: "simple",
              },
              {
                href: "https://sei.cmu.edu/divisions/cert",
                key: "cert-division",
                label: "CERT Division",
                kind: "simple",
              },
              {
                href: "https://sei.cmu.edu/divisions/software-solutions",
                key: "software-solutions-division",
                label: "Software Solutions Division",
                kind: "simple",
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
              kind: "landing-page",
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
                kind: "descriptive"
              },
              {
                cta: true,
                description: "Access and download the software and tools that the SEI creates, tests, refines, and disseminates to improve the quality and security of software systems.",
                href: "https://sei.cmu.edu/publications/software-tools/index.cfm",
                key: "software-and-tools",
                label: "Software and Tools",
                kind: "descriptive"
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
                kind: "landing-page"
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
              kind: "landing-page"
            },
            careersLinks: [
              {
                href: "",
                key: "internship-opportunities",
                label: "Internship Opportunities",
                description: "Learn about internship opportunities for students and recent graduates at the Carnegie Mellon University Software Engineering Institute.",
                kind: "descriptive"
              },
              {
                href: "",
                key: "diversity-equity-and-inclusion",
                label: "Diversity, Equity and Inclusion",
                description: "We identify best practices, develop detailed plans, and innovate pathways to our shared vision of a welcoming, empowering workplace for all.",
                kind: "descriptive"
              },
            ],
            jobsLink: {
              href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
              key: "job-postings",
              label: "Job Postings",
              kind: "landing-page"
            },
            jobs: [
              [
                {
                  href: "",
                  key: "assistant-software-engineer",
                  label: "Assistant Software Engineer",
                  posted: "Yesterday",
                  locations: "2 Locations",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "senior-assurance-researcher",
                  label: "Senior Assurance Researcher",
                  posted: "2 Days Ago",
                  locations: "3 Locations",
                  kind: "descriptive"
                }
              ],
              [
                {
                  href: "",
                  key: "cybersecurity-operations-researcher",
                  label: "Cybersecurity Operations Researcher",
                  posted: "Yesterday",
                  locations: "Arlington",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "assistant-machine-learning-researcher",
                  label: "Assistant Machine Learning Researcher",
                  posted: "3 Days Ago",
                  locations: "Pittsburgh",
                  kind: "descriptive"
                }
              ],
              [
                {
                  href: "",
                  key: "associate-cybersecurity-operations-researcher",
                  label: "Associate Cybersecurity Operations Researcher",
                  posted: "Yesterday",
                  locations: "Arlington",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "lead-nuclear-surety-software-engineer",
                  label: "Lead Nuclear Surety Software Engineer",
                  posted: "6 Days Ago",
                  locations: "Pittsburgh",
                  kind: "descriptive"
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
                kind: "landing-page"
              },
              {
                href: "",
                key: "credentials",
                label: "Credentials",
                kind: "descriptive",
                description: "Learn about the credentials, including certificates, certifications, and authorizations offered by the SEI that individuals can earn."
              },
              {
                href: "",
                key: "curricula",
                label: "Curricula",
                kind: "descriptive",
                description: "Learn about SEI-developed curricula and educational materials, including how you can use them."
              },
              {
                href: "",
                key: "license-sei-materials",
                label: "License SEI Materials",
                kind: "descriptive",
                description: "Learn how the SEI authorizes Partner organizations to deliver SEI training and services."
              },
            ],
            trainings: [
              {
                href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
                key: "training",
                label: "Training",
                kind: "landing-page"
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
              kind: "landing-page"
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
                kind: "descriptive",
              },
              {
                dateRange: "Nov 14-16, 2023",
                description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect, and respond to insider activity. It discusses various techniques and methods for designing, implementing, and measuring the effectiveness of various components...",
                href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P133",
                key: "insider-threat-program-evaluator",
                label: "Insider Threat Program Evaluator",
                month: "Nov",
                startDay: "14",
                kind: "descriptive"
              },
              {
                dateRange: "Nov 6-9, 2023",
                description: "This four-day course, designed for computer security incident response team (CSIRT) and security operations center (SOC) technical personnel with several months of incident handling experience, addresses techniques for detecting and responding...",
                href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P23B",
                key: "advanced-topics-in-incident-handling",
                label: "Advanced Topics in Incident Handling",
                month: "Nov",
                startDay: "6",
                kind: "descriptive"
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
      ],
      megaMenu2: [
        {
          key: "about-1",
          title: "About",
          active: true,
          content: {
            aboutLink: {
              href: "https://sei.cmu.edu/about/index.cfm",
              key: "about",
              label: "About",
              kind: "landing-page",
            },
            aboutRows: [
              [
                {
                  description: "This page describes the leadership structure of the SEI and provides biographical information on SEI Fellows, the SEI leadership team, and the Board of Visitors.",
                  href: "https://sei.cmu.edu/about/leadership/index.cfm",
                  key: "leadership",
                  label: "Leadership",
                  kind: "descriptive"
                },
                {
                  description: "The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance the field of software engineering to meet emerging challenges.",
                  href: "https://sei.cmu.edu/publications/annual-reviews/index.cfm",
                  key: "annual-reviews",
                  label: "Annual Reviews",
                  kind: "descriptive"
                },
              ],
              [
                {
                  description: "As an FFRDC, the SEI works with government industry, and academia to address issues in software engineering, cybersecurity, process improvement, and more.",
                  href: "https://sei.cmu.edu/about/work-with-us/index.cfm",
                  key: "work-with-us",
                  label: "Work with Us",
                  kind: "descriptive"
                },
                {
                  description: "The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie Mellon on a number of major research projects.",
                  href: "https://sei.cmu.edu/about/collaboration-with-cmu/index.cfm",
                  key: "collaboration-with-cmu",
                  label: "Collaboration with CMU",
                  kind: "descriptive"
                },
              ],
            ],
            divisionLink: {
              href: "https://sei.cmu.edu/divisions/",
              key: "divisions",
              label: "Divisions",
              kind: "landing-page",
            },
            divisionRows: [
              {
                href: "https://sei.cmu.edu/divisions/ai",
                key: "artificial-intelligence-division",
                label: "Artificial Intelligence (AI) Division",
                kind: "simple",
              },
              {
                href: "https://sei.cmu.edu/divisions/cert",
                key: "cert-division",
                label: "CERT Division",
                kind: "simple",
              },
              {
                href: "https://sei.cmu.edu/divisions/software-solutions",
                key: "software-solutions-division",
                label: "Software Solutions Division",
                kind: "simple",
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
              kind: "landing-page",
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
                kind: "descriptive"
              },
              {
                cta: true,
                description: "Access and download the software and tools that the SEI creates, tests, refines, and disseminates to improve the quality and security of software systems.",
                href: "https://sei.cmu.edu/publications/software-tools/index.cfm",
                key: "software-and-tools",
                label: "Software and Tools",
                kind: "descriptive"
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
                kind: "landing-page"
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
              kind: "landing-page"
            },
            careersLinks: [
              {
                href: "",
                key: "internship-opportunities",
                label: "Internship Opportunities",
                description: "Learn about internship opportunities for students and recent graduates at the Carnegie Mellon University Software Engineering Institute.",
                kind: "descriptive"
              },
              {
                href: "",
                key: "diversity-equity-and-inclusion",
                label: "Diversity, Equity and Inclusion",
                description: "We identify best practices, develop detailed plans, and innovate pathways to our shared vision of a welcoming, empowering workplace for all.",
                kind: "descriptive"
              },
            ],
            jobsLink: {
              href: "https://www.sei.cmu.edu/news-events/events/index.cfm",
              key: "job-postings",
              label: "Job Postings",
              kind: "landing-page"
            },
            jobs: [
              [
                {
                  href: "",
                  key: "assistant-software-engineer",
                  label: "Assistant Software Engineer",
                  posted: "Yesterday",
                  locations: "2 Locations",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "senior-assurance-researcher",
                  label: "Senior Assurance Researcher",
                  posted: "2 Days Ago",
                  locations: "3 Locations",
                  kind: "descriptive"
                }
              ],
              [
                {
                  href: "",
                  key: "cybersecurity-operations-researcher",
                  label: "Cybersecurity Operations Researcher",
                  posted: "Yesterday",
                  locations: "Arlington",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "assistant-machine-learning-researcher",
                  label: "Assistant Machine Learning Researcher",
                  posted: "3 Days Ago",
                  locations: "Pittsburgh",
                  kind: "descriptive"
                }
              ],
              [
                {
                  href: "",
                  key: "associate-cybersecurity-operations-researcher",
                  label: "Associate Cybersecurity Operations Researcher",
                  posted: "Yesterday",
                  locations: "Arlington",
                  kind: "descriptive"
                },
                {
                  href: "",
                  key: "lead-nuclear-surety-software-engineer",
                  label: "Lead Nuclear Surety Software Engineer",
                  posted: "6 Days Ago",
                  locations: "Pittsburgh",
                  kind: "descriptive"
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
                kind: "landing-page"
              },
              {
                href: "",
                key: "credentials",
                label: "Credentials",
                kind: "descriptive",
                description: "Learn about the credentials, including certificates, certifications, and authorizations offered by the SEI that individuals can earn."
              },
              {
                href: "",
                key: "curricula",
                label: "Curricula",
                kind: "descriptive",
                description: "Learn about SEI-developed curricula and educational materials, including how you can use them."
              },
              {
                href: "",
                key: "license-sei-materials",
                label: "License SEI Materials",
                kind: "descriptive",
                description: "Learn how the SEI authorizes Partner organizations to deliver SEI training and services."
              },
            ],
            trainings: [
              {
                href: "https://www.sei.cmu.edu/education-outreach/index.cfm",
                key: "training",
                label: "Training",
                kind: "landing-page"
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
              kind: "landing-page"
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
                kind: "descriptive",
              },
              {
                dateRange: "Nov 14-16, 2023",
                description: "This 3-day course presents strategies for collecting and analyzing data to prevent, detect, and respond to insider activity. It discusses various techniques and methods for designing, implementing, and measuring the effectiveness of various components...",
                href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P133",
                key: "insider-threat-program-evaluator",
                label: "Insider Threat Program Evaluator",
                month: "Nov",
                startDay: "14",
                kind: "descriptive"
              },
              {
                dateRange: "Nov 6-9, 2023",
                description: "This four-day course, designed for computer security incident response team (CSIRT) and security operations center (SOC) technical personnel with several months of incident handling experience, addresses techniques for detecting and responding...",
                href: "https://www.sei.cmu.edu/education-outreach/courses/course.cfm?courseCode=P23B",
                key: "advanced-topics-in-incident-handling",
                label: "Advanced Topics in Incident Handling",
                month: "Nov",
                startDay: "6",
                kind: "descriptive"
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
      ],
      toggleSwitchValue: false,
      fabTabs: [
        { key: "tab1", tabName: "Tab 1 is the title", title: "Active Tab 1", active: true },
        { key: "tab2", tabName: "Tab 2", title: "Active Tab 2", active: false, iconSrc: "https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png" },
        { key: "tab3", tabName: "Tab 3", title: "Active Tab 3", active: false },
        { key: "tab4", tabName: "Tab 4", title: "Active Tab 4", active: false }
      ],
      datapointModel: 4567,
      fileUploaderModel: [],
      uploadedImages: [] as any,
      tabs: [
        { key: "home", title: "Home", disabled: true },
        { key: "about", title: "About Us", active: true },
        { key: "workplace-services", title: "Workplace Services" },
        { key: "link-to-google", title: "Link to Google", tag: "a", href: "https://google.com", external: true, disabled: true },
        { key: "link-trigger", title: "Link Trigger", href: "https://google.com" },
        { key: "groups", align: "right" }
      ],
      selectModel: 2,
      selectOptions: [
        { id: 1, value: 1, text: "Option 1" },
        { id: 2, value: 2, text: "Option 2" },
        { id: 3, value: 3, text: "Option 3" }
      ],
      disablePopover: true,
      fields: [
        { key: "id", label: "ID", format: (id: number) => `${id} is the id` },
        {
          key: "author_title",
          fields: [
            { key: "title", label: "Title", sortable: true },
            { key: "author", label: "Author", sortable: true, format: (id: string) => `${id} is the author` }
          ]
        },
        { key: "lastModified", label: "Last Modified", align: "right", sortable: true, format: (date: Date) => date.toLocaleDateString() },
        { key: "actions", label: "Actions" }
      ],
      tableItems: [
        { id: 1, title: "First entry", author: "Jason Shimkoski", lastModified: new Date() },
        { id: 2, title: "Second entry", author: "Steve Scholnick", lastModified: new Date("2021-12-01") },
        { id: 3, title: "Third entry", author: "Damon Morda", lastModified: new Date("2021-11-15") },
        { id: 4, title: "Fourth entry", author: "Matt Winwood", lastModified: new Date("2022-01-03") }
      ],
      sortField: "lastModified",
      sortDesc: true,
      countText: "",
      toasts: [] as any,
      showDropdown: false,
      showModal: false,
      showModalSizeDropdown: false,
      modalSize: "md",
      maxTextarea: {
        input: "",
      },
      calendar: {
        date: { start: new Date('03-23-2001'), end: new Date('04-20-2001') },
        // date: new Date('03/23/2001'),
        max: null,
        min: null,
        mode: "dateTime",
        size: "md"
      },
      calendarSingle: {
        date: new Date('03-04-2022'),
        // date: new Date('03/23/2001'),
        max: null,
        min: null,
        mode: "dateTime",
        size: "md"
      },
      calendar2: {
        date: { start: null, end: null },
        // date: new Date('03/23/2001'),
        max: null,
        min: null,
        mode: "dateTime",
        size: "md"
      },
      paginator: {
        currentPage: 2,
        totalPages: 23,
      },
      multiselect: {
        input: "",
        options: [
          { key: 1, value: "Apple" },
          { key: 2, value: "Banana" },
          { key: 3, value: "Orange" },
          { key: 4, value: "Lemon" },
          { key: 5, value: "Pear" },
        ],
        selected: [],
      },
      filterby: {
        options: [
          { id: 1, text: "Option 1", selected: false },
          { id: 2, text: "Option 2", selected: false },
          { id: 3, text: "Option 3", selected: false },
          { id: 4, text: "Option 4", selected: false },
          { id: 5, text: "Option 5", selected: false },
          { id: 6, text: "Option 6", selected: false },
          { id: 7, text: "Option 7", selected: false },
          { id: 8, text: "Option 8", selected: false },
          { id: 9, text: "Option 9", selected: false },
          { id: 10, text: "Option 10", selected: false },
          { id: 11, text: "Option 11", selected: false },
          { id: 12, text: "Option 12", selected: false },
          { id: 13, text: "Option 13", selected: false },
          { id: 14, text: "Option 14", selected: false },
          { id: 15, text: "Option 15", selected: false },
          { id: 16, text: "Option 16", selected: false },
          { id: 17, text: "Option 17", selected: false },
          { id: 18, text: "Option 18", selected: false },
          { id: 19, text: "Option 19", selected: false },
          { id: 20, text: "Option 20", selected: false },
        ],
        idsText: null,
      },
      text: "",
      items: [] as any,
      fakeAjaxItems: [
        { term: "Apple", payload: "test" },
        {
          term: "Apple lksd kljsdflk jsdflk sdflkj sdflkj sdflk sdflkj sdflk sdflk sdflkj sdflkj sdflkj sdflkj sdflkj sdflksjd f",
          payload: "test",
        },
        { term: "Banana", payload: "test" },
        { term: "Orange", payload: "test" },
        { term: "Pineapple", payload: "test" },
        { term: "Kiwi", payload: "test" },
        { term: "Pomegranate", payload: "test" },
        { term: "Strawberry", payload: "test" },
        { term: "Raspberry", payload: "test" },
        { term: "Watermelon", payload: "test" },
        { term: "Mango", payload: "test" },
      ],
      searchText: "",
      checkboxModel: [1, 3],
      checkboxOptions: [
        { text: 'One', value: 1 },
        { text: 'Two', value: 2 },
        { text: 'Three', value: 3 },
      ],
      radioModel: true,
      radio2Model: true,
      radio3Model: true,
      radioOptions: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      topFiveEntries: [
        {
          id: 1,
          title: "Entry 1",
          url: "https://seinet.sei.cmu.edu",
          count: 20,
        },
        {
          id: 2,
          title: "Entry 2",
          url: "https://seinet.sei.cmu.edu",
          count: 18,
        },
        {
          id: 3,
          title: "Entry 3",
          url: "https://seinet.sei.cmu.edu",
          count: 12,
        },
        {
          id: 4,
          title: "Entry 4",
          url: "https://seinet.sei.cmu.edu",
          count: 8,
        },
        {
          id: 5,
          title: "Entry 5",
          url: "https://seinet.sei.cmu.edu",
          count: 2,
        },
      ],
    };
  },
  computed: {
    filteredMultiselectOptions() {
      return this.multiselect.options.filter((i) => i.value.toLowerCase().includes(this.multiselect.input.toLowerCase()));
    },
    filterByBtnText() {
      return this.filterBySelectedOptions.length > 0
        ? "One or more options selected"
        : "No options are selected";
    },
    filterBySelectedOptions() {
      return this.filterby.options.filter((i) => i.selected);
    },
  },
  watch: {
    fileUploaderModel(value) {
      this.uploadedImages = value.map((file: any) => {
        return {
          src: URL.createObjectURL(file),
          isInvalid: file.invalidType || file.invalidSize,
          caption: "",
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type
        };
      }).filter((file: any) => !file.isInvalid);
    }
  },
  methods: {
    fabOpen() {
      console.log("open");
    },
    fabClose() {
      console.log("close");
    },
    generateToast() {
      const index = Math.floor(Math.random() * Math.floor(4));
      const toasts = [
        {
          id: Math.random(),
          title: "Success Toast",
          text: "This is the content of this toast.",
          variant: "success",
        },
        {
          id: Math.random(),
          title: "Info Toast",
          text: "This is the content of this toast.",
          variant: "info",
        },
        {
          id: Math.random(),
          title: "Warning Toast",
          text: "This is the content of this toast.",
          variant: "warning",
        },
        {
          id: Math.random(),
          title: "Danger Toast",
          text: "This is the content of this toast.",
          variant: "danger",
          noAutoHide: true,
        },
      ];
      this.toasts.unshift(toasts[index]);
    },
    changeModalSize(size: string) {
      this.modalSize = size;
    },
    updateSelected(selections: any) {
      this.multiselect.selected = selections;
    },
    filtered(options: any) {
      this.filterby.idsText = options
        .filter((i: any) => i.selected)
        .map((i: any) => i.id)
        .join(", ");
    },
    result(result: any) {
      console.log(result);
    },
    // Perform a search
    search(q: any) {
      this.$emit("hello", q);
      this.searchText = this.text;
    },
    // Retrieve autosuggest items
    autosuggest() {
      setTimeout(() => {
        this.items = this.fakeAjaxItems.filter((i) => {
          return i.term.toLowerCase().includes(this.text.toLowerCase());
        });
      }, 250);
    },
    addField() {
      this.fields.push({ key: (new Date).toLocaleDateString(), label: "Test" });
    },
    async willOpen(res: Function, rej: Function) {
      console.log("Pause for 1 seconds to get fake api request");
      await new Promise(r => setTimeout(r, 1000));
      console.log("Open now!");
      res();
    },
    async willClose(res: Function, rej: Function) {
      console.log("Pause for 1 seconds to do something on close");
      await new Promise(r => setTimeout(r, 1000));
      console.log("Close now!");
      res();
    },
    async willChangeTab(tab: any, res: Function, rej: Function) {
      console.log("Pause for 1/2 second to get fake api request", tab);
      await new Promise(r => setTimeout(r, 500));
      console.log("Open now!");
      res();
    },
    changeTab(tab: any) {
      console.log(tab);
    },
    handleDrawerOpen(item: any) {
      console.log(item);
    },
    sortTableItems({ field, sortBy, sortDesc }: any) {
      console.log(field);
      this.sortField = sortBy;
      this.sortDesc = sortDesc;
      // this.tableItems = [
      //   { id: 1, title: 'A title', author: 'B Person Last', lastModified: new Date() },
      //   { id: 2, title: 'B title', author: 'A Person Last', lastModified: new Date() },
      // ]
      this.tableItems = this.tableItems.reverse();
    }
  }
});
</script>
