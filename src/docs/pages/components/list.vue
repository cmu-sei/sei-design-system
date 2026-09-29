<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Review Queue
      </h2>
      <SdsSection
        type="simple"
        class="max-w-3xl"
      >
        <template #title>
          Review Queue
        </template>
        <template #nav>
          <SdsActionButton
            kind="ghost"
            variant="gray"
            size="sm"
            aria-label="Refresh review queue"
          >
            <SdsSvgIcon
              :path="refreshPath"
              view-box="0 0 20 20"
            />
          </SdsActionButton>
          <SdsActionButton
            kind="ghost"
            variant="gray"
            size="sm"
            aria-label="Add review item"
          >
            <SdsSvgIcon
              :path="plusPath"
              view-box="0 0 20 20"
            />
          </SdsActionButton>
        </template>

        <SdsList divided>
          <SdsListItem
            title="Application review"
            marker-column-width="3rem"
          >
            <template #marker>
              <SdsAvatar
                size="md"
                name="Application Review"
                variant="green"
              />
            </template>
            <template #description>
              Track review work as it moves forward.
            </template>
            <SdsTimeline>
              <SdsTimelineItem
                title="Submitted"
                timestamp="09:00"
              />
              <SdsTimelineItem
                title="Approved"
                timestamp="13:30"
              />
            </SdsTimeline>
          </SdsListItem>

          <SdsListItem title="Supporting material">
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Quality Assurance"
                variant="blue"
              />
            </template>
            <template #description>
              Collect final documentation and decision notes.
            </template>
            <div class="flex flex-wrap gap-2">
              <SdsBadge
                type="light"
                variant="green"
              >
                Complete
              </SdsBadge>
              <SdsBadge
                type="light"
                variant="blue"
              >
                Reviewed
              </SdsBadge>
            </div>
          </SdsListItem>

          <SdsListItem title="Stakeholder follow-up">
            <template #marker>
              <SdsAvatar
                size="xs"
                name="Maya Jankowski"
                variant="orange"
              />
            </template>
            <template #description>
              Confirm the approval date before closing the record.
            </template>
            <div class="grid gap-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Maya asked for one more pass on the decision notes before the record is closed.
              </p>
              <div class="flex flex-wrap gap-2">
                <SdsBadge
                  type="light"
                  variant="orange"
                >
                  Waiting
                </SdsBadge>
                <SdsBadge
                  type="light"
                  variant="gray"
                >
                  Due today
                </SdsBadge>
              </div>
            </div>
          </SdsListItem>
        </SdsList>
      </SdsSection>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Team Responsibilities
      </h2>
      <SdsList class="grid gap-5 lg:grid-cols-2 lg:space-y-0">
        <SdsListItem title="Primary reviewer">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="circle"
              name="Jordan Lee"
              variant="blue"
            />
          </template>
          <template #description>
            Owns technical validation and reviewer handoff.
          </template>
          <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
            <dt class="font-semibold text-gray-800 dark:text-gray-100">
              Team
            </dt>
            <dd>Platform Assurance</dd>
            <dt class="font-semibold text-gray-800 dark:text-gray-100">
              SLA
            </dt>
            <dd>24 hours</dd>
          </dl>
        </SdsListItem>

        <SdsListItem title="Backup reviewer">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="circle"
              name="Taylor Quinn"
              variant="orange"
            />
          </template>
          <template #description>
            Reviews escalations when the primary reviewer is unavailable.
          </template>
          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <SdsBadge
              type="light"
              variant="orange"
            >
              Escalations
            </SdsBadge>
            <span>Updated 12 min ago</span>
          </div>
        </SdsListItem>

        <SdsListItem title="Policy group">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="square"
              name="Policy Group"
              variant="gray"
            />
          </template>
          <template #description>
            Provides final language for classification and retention notes.
          </template>
        </SdsListItem>

        <SdsListItem title="Audit team">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="square"
              name="Audit Team"
              variant="purple"
            />
          </template>
          <template #description>
            Checks supporting evidence before release.
          </template>
          <div class="flex flex-wrap gap-2">
            <SdsBadge
              type="light"
              variant="purple"
            >
              3 files
            </SdsBadge>
            <SdsBadge
              type="light"
              variant="gray"
            >
              Read only
            </SdsBadge>
          </div>
        </SdsListItem>
      </SdsList>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Nested Timeline
      </h2>
      <div class="max-w-3xl">
        <SdsList divided>
          <SdsListItem title="Build pipeline">
            <template #marker>
              <SdsAvatar
                size="xs"
                shape="square"
                name="Build Pipeline"
                variant="gray"
              />
            </template>
            <template #description>
              Track a compact sequence of related events inside one list item.
            </template>
            <SdsTimeline :collapse-after="2">
              <SdsTimelineItem
                title="Queued"
                timestamp="08:00"
              />
              <SdsTimelineItem
                title="Running"
                timestamp="08:15"
              />
              <SdsTimelineItem
                title="Finished"
                timestamp="08:40"
              />
            </SdsTimeline>
          </SdsListItem>
        </SdsList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ListPage'
})

definePage({
  meta: {
    title: 'List'
  }
})

useHead({
  title: 'List'
})

const plusPath = 'M10 3.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5h-4.75v4.75a.75.75 0 0 1-1.5 0v-4.75H4.5a.75.75 0 0 1 0-1.5h4.75V4.5a.75.75 0 0 1 .75-.75Z'
const refreshPath = 'M4.58 5.16A7 7 0 0 1 16.95 8.5a.75.75 0 0 1-1.5 0 5.5 5.5 0 0 0-9.7-3.54h1.7a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75V2.25a.75.75 0 0 1 1.5 0v2.2l-.17.71Zm10.84 9.68A7 7 0 0 1 3.05 11.5a.75.75 0 0 1 1.5 0 5.5 5.5 0 0 0 9.7 3.54h-1.7a.75.75 0 0 1 0-1.5H16a.75.75 0 0 1 .75.75v3.46a.75.75 0 0 1-1.5 0v-2.2l.17-.71Z'
</script>
