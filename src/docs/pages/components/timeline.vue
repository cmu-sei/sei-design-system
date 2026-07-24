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
        Rich Events
      </h2>
      <div class="max-w-3xl">
        <SdsTimeline>
          <SdsTimelineItem
            title="Review package updated"
            timestamp="12 min ago"
          >
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Review Package"
                variant="purple"
              />
            </template>
            <template #description>
              The missing classification notes were added and the decision memo was linked.
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
            title="Approval history verified"
            timestamp="Yesterday"
          >
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Approval History"
                variant="green"
              />
            </template>
            <template #description>
              The supporting files and approval history match the source record.
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