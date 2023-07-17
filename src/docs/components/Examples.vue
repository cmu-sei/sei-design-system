<template>
  <div class="guide">
    <SdsButton
      disabled
      kind="primary"
      class="my-10"
    >
      I am Testing A11y
    </SdsButton>
    <p>MegaMenu</p>
    <SdsMegaMenu
      v-model="topLinks"
      type="underline"
      class="my-10 sticky top-0 z-50"
      @change="changeTab"
    >
      <template #panel(about)>
        <div class="grid grid-cols-3 gap-x-2 py-8">
          <div class="col-span-2">
            <div class="grid grid-cols-2 gap-x-2">
              <div class="col-span-2 px-4">
                <SdsMegaMenuLink
                  label="About"
                  variant="landing-page"
                  href="https://sei.cmu.edu/about/index.cfm"
                />
              </div>
              <div class="col-span-1 px-4">
                <SdsMegaMenuLink
                  label="Leadership"
                  variant="descriptive"
                  href="https://sei.cmu.edu/about/leadership/index.cfm"
                >
                  This page describes the leadership structure of the SEI and provides biographical information on SEI
                  Fellows, the SEI leadership team, and the Board of Visitors.
                </SdsMegaMenuLink>
                <SdsMegaMenuLink
                  label="Work with Us"
                  variant="descriptive"
                  href="https://sei.cmu.edu/about/work-with-us/index.cfm"
                >
                  <p>
                    As an FFRDC, the SEI works with government, industry, and academia to address issues in software
                    engineering, cybersecurity, process improvement, and more.
                  </p>
                </SdsMegaMenuLink>
              </div>
              <div class="col-span-1 px-4">
                <SdsMegaMenuLink
                  label="Annual Reviews"
                  variant="descriptive"
                  href="https://sei.cmu.edu/publications/annual-reviews/index.cfm"
                >
                  <p>
                    The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance
                    the field of software engineering to meet emerging challenges.
                  </p>
                </SdsMegaMenuLink>
                <SdsMegaMenuLink
                  label="Collaboration with CMU"
                  variant="descriptive"
                  href="https://sei.cmu.edu/about/collaboration-with-cmu/index.cfm"
                >
                  <p>
                    The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie
                    Mellon on a number of major research projects.
                  </p>
                </SdsMegaMenuLink>
              </div>
            </div>
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              label="Divisions"
              variant="landing-page"
              href="https://sei.cmu.edu/about/divisions/index.cfm"
            />
            <SdsMegaMenuLink
              label="Artificial Intelligence (AI) Division"
              variant="simple"
              href="https://sei.cmu.edu/about/divisions/artificial-intelligence-division/index.cfm"
            />
            <SdsMegaMenuLink
              label="CERT Division"
              variant="simple"
              href="https://sei.cmu.edu/about/divisions/cert/index.cfm"
            />
            <SdsMegaMenuLink
              label="Software Solutions Division"
              variant="simple"
              href="https://sei.cmu.edu/about/divisions/software-solutions-division/index.cfm"
            />
          </div>
        </div>
      </template>
      <template #panel(research-and-development)>
        <div class="grid grid-cols-3 gap-x-2 py-8">
          <div class="col-span-2">
            <div class="grid grid-cols-2 gap-x-2">
              <div class="col-span-2 px-4">
                <SdsMegaMenuLink
                  label="Topics"
                  variant="landing-page"
                  href="https://sei.cmu.edu/our-work/all-topics/index.cfm"
                />
              </div>
              <div class="col-span-1 px-4">
                <template
                  v-for="topic in topics_1"
                  :key="topic.key"
                >
                  <SdsMegaMenuLink
                    :label="topic.title"
                    variant="simple"
                    href="topic.href"
                  />
                </template>
              </div>
              <div class="col-span-1 px-4">
                <template
                  v-for="topic in topics_2"
                  :key="topic.key"
                >
                  <SdsMegaMenuLink
                    :label="topic.title"
                    variant="simple"
                    href="topic.href"
                  />
                </template>
              </div>
            </div>
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              cta
              label="Projects"
              variant="descriptive"
              href="https://sei.cmu.edu/our-work/projects/index.cfm"
            >
              Explore all SEI research and development projects.
            </SdsMegaMenuLink>
            <SdsMegaMenuLink
              cta
              label="Software and Tools"
              variant="descriptive"
              href="https://sei.cmu.edu/publications/software-tools/index.cfm"
            >
              Access and download the software and tools that the SEI creates, tests, refines, and disseminates to improve
              the quality and security of software systems.
            </SdsMegaMenuLink>
          </div>
        </div>
      </template>
      <template #panel(publications-and-media)>
        <div class="grid grid-cols-3 gap-x-2 py-8">
          <div class="col-span-1 px-4">
            <SdsMegaMenuLink
              label="Publications and Media"
              variant="landing-page"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Digital Library"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Podcasts"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Technical Papers"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Videos"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Vulnerability Notes"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="History of Innovation at the SEI"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              label="Blog"
              variant="landing-page"
              href="https://sei.cmu.edu/our-work/projects/index.cfm"
            />
            <template
              v-for="blogPost in blogPosts"
              :key="blogPost.key"
            >
              <SdsMegaMenuLink
                :label="blogPost.title"
                variant="descriptive"
                href="https://sei.cmu.edu/publications/software-tools/index.cfm"
              >
                <span class="uppercase">{{ blogPost.published }}</span>
              </SdsMegaMenuLink>
            </template>
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              label="News"
              variant="landing-page"
              href="https://sei.cmu.edu/our-work/projects/index.cfm"
            />
            <SdsMegaMenuLink
              label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
              variant="descriptive"
              href="https://sei.cmu.edu/news/index.cfm"
            >
              <template #top>
                <img
                  class="mb-4"
                  src="src/assets/images/Software-Engineering-Workshop-f.max-640x366.format-webp.webp"
                >
              </template>
              <template #left>
                <div class="bg-gray-100 text-gray-900 p-4 text-center">
                  <div class="font-bold">
                    Mar
                  </div>
                  <div>24</div>
                </div>
              </template>
              <template #default>
                <span class="uppercase">May 2, 2023</span>
              </template>
            </SdsMegaMenuLink>
          </div>
        </div>
      </template>
      <template #panel(education)>
        <div class="grid grid-cols-3 gap-x-2 py-8">
          <div class="col-span-1 px-4">
            <SdsMegaMenuLink
              label="Education"
              variant="landing-page"
              href="https://sei.cmu.edu/education/index.cfm"
            />
            <SdsMegaMenuLink
              label="Credentials"
              variant="descriptive"
              href="https://sei.cmu.edu/publications/index.cfm"
            >
              Learn about the credentials, including certificates, certifications, and authorizations offered by the SEI
              that individuals can earn.
            </SdsMegaMenuLink>
            <SdsMegaMenuLink
              label="Curricula"
              variant="descriptive"
              href="https://sei.cmu.edu/publications/index.cfm"
            >
              Learn about SEI-developed curricula and educational materials, including how you can use them.
            </SdsMegaMenuLink>
            <SdsMegaMenuLink
              label="License SEI Materials"
              variant="descriptive"
              href="https://sei.cmu.edu/publications/index.cfm"
            >
              Learn how the SEI authorizes Partner organizations to deliver SEI training and services.
            </SdsMegaMenuLink>
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              label="Training"
              variant="landing-page"
              href="https://sei.cmu.edu/education/index.cfm"
            />
            <SdsMegaMenuLink
              label="Fundamentals of Statistics Applied to Cybersecurity"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Advanced Analytics: Netflow"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Advanced Analytics: Malware"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="Advanced Analytics: Digital Forensics"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
            <SdsMegaMenuLink
              label="CERT Applied Data Science for Cybersecurity Certificate Package"
              variant="simple"
              href="https://sei.cmu.edu/publications/index.cfm"
            />
          </div>
          <div class="col-span-1 border-l dark:border-l-gray-800 px-4">
            <SdsMegaMenuLink
              label="Events"
              variant="landing-page"
              href="https://sei.cmu.edu/our-work/projects/index.cfm"
            />
            <SdsMegaMenuLink
              label="Software Engineering Workshop for Educators Returns for 20th Anniversary"
              image="src/assets/images/Software-Engineering-Workshop-f.max-640x366.format-webp.webp"
              variant="descriptive"
              href="https://sei.cmu.edu/news/index.cfm"
            >
              <span class="uppercase">May 2, 2023</span>
            </SdsMegaMenuLink>
          </div>
        </div>
      </template>
      <template #panel(careers)>
        <div class="grid grid-cols-3">
          <div class="col-span-2">
            <div class="grid grid-cols-2">
              <div class="col-span-2">
                <SdsMegaMenuLink
                  label="About"
                  variant="landing-page"
                  href="https://sei.cmu.edu/about"
                />
              </div>
              <div class="col-span-1">
                <SdsMegaMenuLink
                  label="Leadership"
                  variant="descriptive"
                  href="https://insights.sei.cmu.edu"
                >
                  <p>
                    This page describes the leadership structure of the SEI and provides biographical information on SEI
                    Fellows, the SEI leadership team, and the Board of Visitors.
                  </p>
                </SdsMegaMenuLink>
                <SdsMegaMenuLink
                  label="Work with Us"
                  variant="descriptive"
                  href="https://insights.sei.cmu.edu"
                >
                  <p>
                    As an FFRDC, the SEI works with government, industry, and academia to address issues in software
                    engineering, cybersecurity, process improvement, and more.
                  </p>
                </SdsMegaMenuLink>
              </div>
              <div class="col-span-1">
                <SdsMegaMenuLink
                  label="Annual Reviews"
                  variant="descriptive"
                  href="https://sei.cmu.edu/annual-reviews/"
                >
                  <p>
                    The SEI showcases its research in two annual reviews that demonstrate the ways in which we advance
                    the field of software engineering to meet emerging challenges.
                  </p>
                </SdsMegaMenuLink>
                <SdsMegaMenuLink
                  label="Collaboration with CMU"
                  variant="descriptive"
                  href="https://sei.cmu.edu/annual-reviews/"
                >
                  <p>
                    The Software Engineering Institute is part of Carnegie Mellon University and partners with Carnegie
                    Mellon on a number of major research projects.
                  </p>
                </SdsMegaMenuLink>
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <SdsMegaMenuLink
              label="Divisions"
              variant="landing-page"
              href="https://sei.cmu.edu/divisions/"
            />
            <SdsMegaMenuLink
              label="Artificial Intelligence (AI) Division"
              variant="simple"
              href="https://sei.cmu.edu/divisions/ai"
            />
            <SdsMegaMenuLink
              label="CERT Division"
              variant="simple"
              href="https://sei.cmu.edu/divisions/cert"
            />
            <SdsMegaMenuLink
              label="Software Solutions Division"
              variant="simple"
              href="https://sei.cmu.edu/divisions/software-solutions"
            />
          </div>
        </div>
      </template>
    </SdsMegaMenu>
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
          Badge Content
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
      <sds-select
        v-model="selectModel"
        :options="selectOptions"
      />
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

        <h4 class="mb-4 text-lg">
          Sds Textarea & Sds Input
        </h4>
        <sds-textarea
          v-model="maxTextarea.input"
          placeholder="Enter text here"
          :maxlength="2000"
          count-characters
        />
        <sds-input
          v-model="maxTextarea.input"
          placeholder="Enter text here"
          :maxlength="20"
          count-characters
        />

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

        <form @submit.prevent>
          <sds-datepicker
            v-model="calendar.date"
            :min="calendar.min"
            :max="calendar.max"
            :mode="calendar.mode"
            :size="calendar.size"
            required
            use-current-time-for-today
          />
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
        <sds-multiselect
          v-model="multiselect.input"
          :selected="multiselect.selected"
          :options="filteredMultiselectOptions"
          show-clear
          multiple
          taggable
          @update-selected="updateSelected"
        />
        <p>Selected: {{ JSON.stringify(multiselect.selected) }}</p>

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
          <sds-autosuggest
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
          <sds-radio-group
            v-model="radioModel"
            :options="radioOptions"
            required
            @change="$emit('radioGroupChange')"
          >
            <template #label="{ optionId, option }">
              <label :for="optionId">
                Radio Group: {{ option.text }}
              </label>
            </template>
          </sds-radio-group>
        </div>
        <div class="py-12">
          <sds-radio-group
            v-model="radio2Model"
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
import sprites from "../../assets/images/sprites-social.png";

export default defineComponent({
  name: "ExamplesSection",
  emits: ["radioGroupChange", "hello"],
  data() {
    return {
      topics_1: [
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
      topics_2: [
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
      ],
      blogPosts: [
        {
          key: 0,
          title: "Cybersecurity of Quantum Computing: A New Frontier",
          published: "April 10, 2023"
        },
        {
          key: 1,
          title: "Security Analytics: Using SILK and Mothra to Identify Data Exfiltration via the Domain Name",
          published: "April 3, 2023"
        },
        {
          key: 2,
          title: "How to Use Docker and NS-3 to Create Realistic Network Simulations",
          published: "March 27, 2023"
        }
      ],
      topLinks: [
        { key: "about", title: "About" },
        { key: "research-and-development", title: "Research and Development" },
        { key: "publications-and-media", title: "Publications and Media" },
        { key: "education", title: "Education" },
        { key: "careers", title: "Careers" },
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
        { key: "lastModified", label: "Last Modified", sortable: true, format: (date: Date) => date.toLocaleDateString() },
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
        date: { start: null, end: null },
        // date: new Date('03/23/2001'),
        max: null,
        min: null,
        mode: "dateTime",
        size: "md"
      },
      calendarSingle: {
        date: null,
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
