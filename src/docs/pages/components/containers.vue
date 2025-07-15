<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Resizer
      </h2>
      <div class="space-y-4 max-w-full">
        <div class="flex flex-row gap-y-4 flex-wrap justify-start max-w-full">
          <SdsResizer
            class="bg-teal-25 dark:bg-teal-900 mr-4"
            direction="right"
            :initial="300"
            :max="400"
          >
            <div class="justify-start max-h-40">
              <div class="pt-4 px-4 overflow-x-auto">
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                  <span class="inline-block h-4 w-full" />
                </p>
              </div>
            </div>
          </SdsResizer>
          <SdsResizer
            class="bg-teal-25 dark:bg-teal-900 mr-4"
            direction="right"
            :initial="300"
          >
            <div class="justify-start h-fit">
              <div class="line-clamp-6 p-4 overflow-y-scroll h-fit">
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                  <span class="inline-block h-4 w-full" />
                </p>
              </div>
            </div>
          </SdsResizer>
        </div>
        <div class="flex flex-col">
          <SdsResizer
            :initial="100"
            :clamp="false"
            class="bg-indigo-25 dark:bg-indigo-900 mb-4"
          >
            <div class="justify-start p-4 h-fit overflow-y-hidden">
              <div class="h-fit">
                <h1 class="text-xl font-bold">
                  Top resizable container with fixed initial height
                </h1>
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                </p>
              </div>
            </div>
          </SdsResizer>
          <SdsResizer
            :clamp="false"
            class="bg-indigo-25 dark:bg-indigo-900 mb-4"
          >
            <div class="justify-start p-4 h-fit overflow-y-hidden">
              <div class="h-fit">
                <h1 class="text-xl font-bold">
                  Bottom resizable container that fits all the content
                </h1>
                <p class="mb-1 mr-auto w-full block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla urna porttitor rhoncus dolor purus non. Eu consequat ac felis donec et odio pellentesque diam volutpat. Adipiscing vitae proin sagittis nisl rhoncus mattis. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Magna etiam tempor orci eu lobortis elementum nibh tellus. Massa sapien faucibus et molestie ac feugiat sed lectus vestibulum. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Auctor augue mauris augue neque gravida in fermentum et. Tempor nec feugiat nisl pretium fusce. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla aliquet porttitor lacus luctus accumsan. Aliquet eget sit amet tellus cras. Dui ut ornare lectus sit amet est placerat in.
                </p>
              </div>
            </div>
          </SdsResizer>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Modal
      </h2>
      <div>
        <SdsButton
          kind="secondary"
          @click="showModal = !showModal"
        >
          Launch a modal
        </SdsButton>
        <SdsModal
          v-model="showModal"
          size="md"
          title="Prop title"
          hide-header
        >
          <template #title>
            Slotted title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsModal>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Panel
      </h2>
      <div>
        <SdsButton
          kind="secondary"
          @click="showPanel = !showPanel"
        >
          Launch a panel
        </SdsButton>
        <SdsPanel
          v-model="showPanel"
          side="right"
          size="md"
        >
          <template #title>
            Panel title
          </template>
          <p>Main content</p>
          <template #footer>
            Footer
          </template>
        </SdsPanel>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Section
      </h2>
      <div class="space-y-4">
        <SdsSection type="accented">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
        <SdsSection type="raised">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
        <SdsSection type="simple">
          <template #title>
            <strong class="text-sm uppercase">
              Section title
            </strong>
          </template>
          <p>Sed libero enim sed faucibus turpis in eu mi.</p>
        </SdsSection>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Callout
      </h2>
      <div class="space-x-4 flex pb-16">
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="bold"
              title="This is a title that spans multiple lines of content to show what happens"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'bold')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
          <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','bold')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="white">Primary</ActionButton>
                <ActionButton kind="secondary" variant="white">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="white">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="white">Primary</ActionButton>
                <ActionButton kind="secondary" variant="white">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="white">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
            />
        </div>
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'outline')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
          <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','outline')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
            />
        </div>
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'subtle')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
          <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','subtle')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="md"
            />
        </div>
      </div>
      <!-- Callout sm -->
      <div class="space-x-4 flex">
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'bold')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','bold')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="white">Primary</ActionButton>
                <ActionButton kind="secondary" variant="white">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="white">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="white">Primary</ActionButton>
                <ActionButton kind="secondary" variant="white">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="white">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="bold"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
            />
        </div>
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'outline')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
          <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','outline')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="outline"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
            />
        </div>
        <div class="w-[352px] space-y-4">
          <template v-for="v in calloutVariants" :key="v">
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              :variant="v"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass(v,'subtle')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
            </Callout>
          </template>
          <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #leftIcon>
                <svg :class="calloutFillClass('gray','subtle')" width="18" height="24" viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.8125 17.1914V16.125H11.1875L11.1602 17.1914C11.1602 17.3281 11.1055 17.5469 11.0234 17.6562L10.5586 18.3672C10.4219 18.5859 10.0938 18.75 9.82031 18.75H8.15234C7.87891 18.75 7.55078 18.5859 7.41406 18.3672L6.94922 17.6562C6.83984 17.5195 6.8125 17.3555 6.8125 17.1914ZM9 4.75C11.6523 4.77734 13.8125 6.91016 13.8125 9.5625C13.8125 10.793 13.3477 11.8867 12.6094 12.707C12.1445 13.2266 11.4609 14.3203 11.1875 15.2227C11.1875 15.2227 11.1875 15.2227 11.1875 15.25H6.78516C6.78516 15.2227 6.78516 15.2227 6.78516 15.2227C6.51172 14.3203 5.82812 13.2266 5.36328 12.707C4.625 11.8594 4.1875 10.7656 4.1875 9.5625C4.1875 7.01953 6.21094 4.77734 9 4.75ZM11.625 11.8867C12.1719 11.2305 12.5 10.4102 12.5 9.5625C12.5 7.64844 10.9141 6.0625 8.97266 6.0625C6.8125 6.08984 5.5 7.86719 5.5 9.5625C5.5 10.4102 5.80078 11.2305 6.34766 11.8867C6.78516 12.3516 7.30469 13.1445 7.6875 13.9375H10.2852C10.668 13.1445 11.1875 12.3516 11.625 11.8867ZM8.5625 6.9375C8.78125 6.9375 9 7.15625 9 7.40234C9 7.62109 8.78125 7.8125 8.5625 7.8125C7.82422 7.8125 7.25 8.41406 7.25 9.125C7.25 9.37109 7.03125 9.5625 6.8125 9.5625C6.56641 9.5625 6.375 9.37109 6.375 9.125C6.375 7.92188 7.33203 6.9375 8.5625 6.9375Z"/>
                </svg>
              </template>
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            >
              <template #buttons>
                <ActionButton kind="primary" variant="gray">Primary</ActionButton>
                <ActionButton kind="secondary" variant="gray">Secondary</ActionButton>
                <ActionButton kind="ghost" variant="gray">Ghost</ActionButton>
              </template>
            </Callout>
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
              :timestamp="new Date()"
              dismissable
            />
            <Callout
              type="subtle"
              title="This is a title"
              description="This is an amazing description that spans multiple lines because people love to talk about content."
              size="sm"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '../../../components/ActionButton/ActionButton.vue'
import Callout from '../../../components/Callout/Callout.vue'

const showModal = ref(false)
const showPanel = ref(false)
const calloutVariants = ref<('gray' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green')[]>(
  ['gray','orange','red','purple','indigo','blue','teal','green']
)

const calloutFillClass = (variant: string, type: string) => {
  switch(variant) {
    case 'gray':
      return type === 'bold' ? 'fill-gray-900 dark:fill-white' :'fill-gray-900 dark:fill-gray-300'
    case 'orange':
      return type === 'bold' ? 'fill-black dark:fill-black' : 'fill-orange-600 dark:fill-orange-300'
    case 'red': 
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-red-600 dark:fill-red-300'
    case 'purple': 
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-purple-600 dark:fill-purple-300'
    case 'indigo': 
      return type === 'bold' ? 'fill-white dark:fill-black' :'fill-indigo-600 dark:fill-indigo-300'
    case 'blue': 
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-blue-600 dark:fill-blue-300'
    case 'teal': 
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-teal-600 dark:fill-teal-300'
    case 'green': 
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-green-600 dark:fill-green-300'
    default:
      return type === 'bold' ? 'fill-white dark:fill-black' : 'fill-gray-900 dark:fill-gray-300'
  }
}

defineOptions({
  name: 'ContainersPage'
})

definePage({
  meta: {
    title: 'Containers'
  }
})

useHead({
  title: 'Containers'
})
</script>
