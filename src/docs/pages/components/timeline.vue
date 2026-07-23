<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Timeline
      </h2>
      <div class="grid gap-10 xl:grid-cols-3">
        <section class="grid gap-4">
          <h3 class="text-lg">
            Activity
          </h3>
          <SdsTimeline>
            <SdsTimelineItem
              title="Record status changed to Approved"
              timestamp="A moment ago"
              marker-label="Approved"
            >
              <template #marker>
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-green-600 dark:text-green-300">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.88a.75.75 0 0 0-1.22-.87l-3.2 4.48-1.6-1.6a.75.75 0 1 0-1.06 1.06l2.23 2.23a.75.75 0 0 0 1.14-.1l3.71-5.2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Final approval assigned to Maya Jankowski"
              timestamp="A moment ago"
              marker-label="Assigned"
            >
              <template #marker>
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-pink-600 dark:text-pink-300">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5h-4.75v4.75a.75.75 0 0 1-1.5 0v-4.75H4.5a.75.75 0 0 1 0-1.5h4.75V4.5a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Documents uploaded by Daniel Lee"
              timestamp="A moment ago"
              marker-label="Documents uploaded"
            >
              <template #marker>
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 dark:text-gray-400">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.75 3A1.75 1.75 0 0 0 3 4.75v10.5C3 16.22 3.78 17 4.75 17h10.5c.97 0 1.75-.78 1.75-1.75V7.06c0-.46-.18-.9-.51-1.23L14.17 3.5A1.75 1.75 0 0 0 12.94 3H4.75Zm8 1.5c.07 0 .13.03.18.07l2.5 2.5c.04.05.07.11.07.18V15.25c0 .14-.11.25-.25.25H4.75a.25.25 0 0 1-.25-.25V4.75c0-.14.11-.25.25-.25h8Z" />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Review comments added by Daniel Lee"
              timestamp="A moment ago"
              marker-label="Review comments added"
            >
              <template #marker>
                <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 dark:text-gray-400">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.75 4A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14H6v2.25a.75.75 0 0 0 1.2.6L11 14h4.25A2.75 2.75 0 0 0 18 11.25v-4.5A2.75 2.75 0 0 0 15.25 4H4.75Z" />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>

        <section class="grid gap-4">
          <h3 class="text-lg">
            Comments
          </h3>
          <SdsTimeline marker-size="md">
            <SdsTimelineItem
              title="Maya Jankowski"
              timestamp="A moment ago"
              marker-label="Maya Jankowski comment"
            >
              <template #marker>
                <SdsAvatar
                  size="sm"
                  shape="circle"
                  name="Maya Jankowski"
                  variant="orange"
                />
              </template>
              <template #description>
                I think we can close this out now that the missing attachment was added.
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Daniel Lee"
              timestamp="A moment ago"
              marker-label="Daniel Lee comment"
            >
              <template #marker>
                <SdsAvatar
                  size="sm"
                  shape="circle"
                  name="Daniel Lee"
                  variant="blue"
                />
              </template>
              <template #description>
                Thanks — the updated retention policy looks good to me now.
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Olivia Meyers"
              timestamp="A moment ago"
              marker-label="Olivia Meyers comment"
            >
              <template #marker>
                <SdsAvatar
                  size="sm"
                  shape="circle"
                  name="Olivia Meyers"
                  variant="green"
                />
              </template>
              <template #description>
                I reviewed the metadata updates and everything matches the source record.
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>

        <section class="grid gap-4">
          <h3 class="text-lg">
            Experience
          </h3>
          <SdsTimeline marker-size="md">
            <SdsTimelineItem
              title="Synergistic Software"
              timestamp="Engineering Team Lead"
              marker-label="Synergistic Software"
            >
              <template #marker>
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-theme-sm bg-gray-900 text-[11px] font-bold leading-none text-white dark:bg-gray-100 dark:text-gray-900">
                  SS
                </span>
              </template>
              <template #description>
                Managing a team of 12 engineers.
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Software Engineer II"
              marker-label="Software Engineer II"
            />
            <SdsTimelineItem
              title="Software Engineer I"
              marker-label="Software Engineer I"
            />
            <SdsTimelineItem
              title="Stellar Systems"
              timestamp="Software Engineer I"
              marker-label="Stellar Systems"
            >
              <template #marker>
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-theme-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3.75C4 2.78 4.78 2 5.75 2h8.5c.97 0 1.75.78 1.75 1.75V18h-3.5v-3h-5v3H4V3.75ZM7 6h2v2H7V6Zm0 4h2v2H7v-2Zm4-4h2v2h-2V6Zm0 4h2v2h-2v-2Z" />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Apex Systems"
              timestamp="Junior Software Engineer"
              marker-label="Apex Systems"
            >
              <template #marker>
                <span class="inline-flex h-8 w-8 items-center justify-center rounded-theme-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  <svg
                    aria-hidden="true"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3.75C4 2.78 4.78 2 5.75 2h8.5c.97 0 1.75.78 1.75 1.75V18h-3.5v-3h-5v3H4V3.75ZM7 6h2v2H7V6Zm0 4h2v2H7v-2Zm4-4h2v2h-2V6Zm0 4h2v2h-2v-2Z" />
                  </svg>
                </span>
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar Sizes And Content
      </h2>
      <div class="grid gap-10 lg:grid-cols-2">
        <section class="grid gap-4">
          <h3 class="text-lg">
            Medium avatar comments
          </h3>
          <SdsTimeline marker-size="md">
            <SdsTimelineItem
              title="Priya Raman"
              timestamp="12 min ago"
              marker-label="Priya Raman comment"
            >
              <template #marker>
                <SdsAvatar
                  size="sm"
                  shape="circle"
                  src="https://i.pravatar.cc/96?img=47"
                  name="Priya Raman"
                  variant="purple"
                />
              </template>
              <template #description>
                The updated review package is ready. I added the missing classification notes and linked the decision memo.
              </template>
              <div class="mt-2 flex flex-wrap gap-2">
                <SdsBadge
                  type="light"
                  variant="purple"
                >
                  Review package
                </SdsBadge>
                <SdsBadge
                  type="light"
                  variant="gray"
                >
                  3 files
                </SdsBadge>
              </div>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Morgan Markowski"
              timestamp="Yesterday"
              marker-label="Morgan Markowski comment"
            >
              <template #marker>
                <SdsAvatar
                  size="sm"
                  shape="circle"
                  name="Morgan Markowski"
                  variant="green"
                />
              </template>
              <template #description>
                Looks good from my side. The approval history and supporting files match the record.
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>

        <section class="grid gap-4">
          <h3 class="text-lg">
            Large profile entries
          </h3>
          <SdsTimeline marker-size="xl">
            <SdsTimelineItem
              title="Jordan Lee"
              timestamp="Primary reviewer"
              marker-label="Jordan Lee profile"
            >
              <template #marker>
                <SdsAvatar
                  size="md"
                  shape="portrait"
                  src="https://i.pravatar.cc/120?img=12"
                  name="Jordan Lee"
                  variant="blue"
                />
              </template>
              <template #description>
                Owns technical validation and coordinates the final reviewer handoff.
              </template>
              <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
                <dt class="font-semibold text-gray-800 dark:text-gray-100">
                  Team
                </dt>
                <dd>Platform Assurance</dd>
                <dt class="font-semibold text-gray-800 dark:text-gray-100">
                  SLA
                </dt>
                <dd>24 hours</dd>
              </dl>
            </SdsTimelineItem>
            <SdsTimelineItem
              title="Taylor Quinn"
              timestamp="Backup reviewer"
              marker-label="Taylor Quinn profile"
            >
              <template #marker>
                <SdsAvatar
                  size="md"
                  shape="square"
                  name="Taylor Quinn"
                  variant="orange"
                  type="outline"
                />
              </template>
              <template #description>
                Reviews escalations when the primary reviewer is unavailable.
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Collapsed Timeline
      </h2>
      <SdsTimeline
        :collapse-after="3"
        class="max-w-2xl"
      >
        <SdsTimelineItem
          title="Created"
          timestamp="08:15"
        />
        <SdsTimelineItem
          title="Submitted"
          timestamp="09:00"
        />
        <SdsTimelineItem
          title="Reviewed"
          timestamp="10:30"
        />
        <SdsTimelineItem
          title="Revised"
          timestamp="12:45"
        />
        <SdsTimelineItem
          title="Approved"
          timestamp="14:30"
        />
      </SdsTimeline>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TimelinePage'
})

definePage({
  meta: {
    title: 'Timeline'
  }
})

useHead({
  title: 'Timeline'
})
</script>