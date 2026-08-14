<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Activity
      </h2>
      <div class="grid gap-10 lg:grid-cols-2">
        <section class="grid gap-4">
          <h3 class="text-lg">
            Review events
          </h3>
          <SdsTimeline>
            <SdsTimelineItem
              title="Record status changed to Approved"
              subtitle="Review package 42"
              description="The final review is complete."
              timestamp="A moment ago"
            />
            <SdsTimelineItem
              title="Final approval assigned to Maya Jankowski"
              timestamp="A moment ago"
            />
            <SdsTimelineItem
              title="Documents uploaded by Daniel Lee"
              timestamp="A moment ago"
            />
            <SdsTimelineItem
              title="Review comments added by Daniel Lee"
              timestamp="A moment ago"
            />
          </SdsTimeline>
        </section>

        <section class="grid gap-4">
          <h3 class="text-lg">
            Comments
          </h3>
          <SdsTimeline>
            <SdsTimelineItem
              title="Maya Jankowski"
              timestamp="A moment ago"
            >
              <template #marker>
                <SdsAvatar
                  size="xs"
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
              timestamp="Yesterday"
            >
              <template #marker>
                <SdsAvatar
                  size="xs"
                  shape="circle"
                  name="Daniel Lee"
                  variant="blue"
                />
              </template>
              <template #description>
                Added access for the audit team.
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </section>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Horizontal Timelines
      </h2>
      <div class="grid gap-10">
        <section class="grid min-w-0 gap-4">
          <h3 class="text-lg">
            Review progress
          </h3>
          <SdsTimeline
            orientation="horizontal"
            aria-label="Review progress"
          >
            <SdsTimelineItem
              title="Review requested"
              subtitle="Review package 42"
              description="The package entered the review queue."
              timestamp="Aug 12, 9:00 AM"
              datetime="2026-08-12T09:00:00-04:00"
            />
            <SdsTimelineItem
              current
              subtitle="Review package 42"
              description="The security team is reviewing the submitted package."
              timestamp="Today, 10:30 AM"
              datetime="2026-08-13T10:30:00-04:00"
            >
              <template #title>
                <span class="inline-flex flex-wrap items-center gap-2">
                  Security review
                  <SdsBadge
                    type="light"
                    variant="green"
                  >
                    Current
                  </SdsBadge>
                </span>
              </template>
            </SdsTimelineItem>
            <SdsTimelineItem title="Final approval" />
            <SdsTimelineItem title="Published" />
          </SdsTimeline>
        </section>

        <section class="grid min-w-0 gap-4">
          <h3 class="text-lg">
            Collapsed review progress
          </h3>
          <SdsTimeline
            orientation="horizontal"
            :collapse-after="2"
            aria-label="Collapsed review progress"
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
        </section>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Rich Events
      </h2>
      <div class="max-w-3xl">
        <SdsTimeline>
          <SdsTimelineItem>
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Review Package"
                variant="purple"
              />
            </template>
            <div class="grid gap-1">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Review package updated
              </h3>
              <p class="text-sm text-gray-700 dark:text-gray-200">
                Classification review
              </p>
              <p class="text-sm leading-5 text-gray-600 dark:text-gray-300">
                The missing classification notes were added and the decision memo was linked.
              </p>
              <time class="text-xs text-gray-500 dark:text-gray-400">
                12 min ago
              </time>
              <div class="mt-1 flex flex-wrap gap-2">
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
            </div>
          </SdsTimelineItem>
          <SdsTimelineItem
            title="Approval history verified"
            subtitle="Source record"
            description="The supporting files and approval history match the source record."
            timestamp="Yesterday"
          >
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Approval History"
                variant="green"
              />
            </template>
          </SdsTimelineItem>
        </SdsTimeline>
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