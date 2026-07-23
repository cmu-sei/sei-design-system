<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Technical Leadership
      </h2>
      <SdsSection
        type="simple"
        class="max-w-3xl"
      >
        <template #title>
          Technical Leadership
        </template>
        <template #nav>
          <SdsActionButton
            kind="ghost"
            variant="gray"
            size="sm"
            aria-label="Refresh leadership history"
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
            aria-label="Add leadership entry"
          >
            <SdsSvgIcon
              :path="plusPath"
              view-box="0 0 20 20"
            />
          </SdsActionButton>
        </template>
        <SdsList
          divided
          marker-size="lg"
          title-size="md"
        >
          <SdsListItem
            title="IEEE Computer Society"
            content-layout="full"
            marker-variant="gray"
          >
            <template #marker>
              <SdsSvgIcon
                :path="organizationPath"
                view-box="0 0 20 20"
                :height="20"
                :width="20"
              />
            </template>
            <SdsTimeline
              :collapse-after="5"
              marker-size="lg"
              variant="history"
            >
              <SdsTimelineItem
                title="Vice President"
                variant="green"
              >
                <template #description>
                  Since Jan 1, 2025
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Treasurer">
                <template #description>
                  Sep 1, 2011 – Dec 31, 2024
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Technical Program Chair">
                <template #description>
                  Jun 1, 2008 – Aug 31, 2011
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Conference Organizer">
                <template #description>
                  Mar 1, 2005 – May 31, 2008
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Awards Committee Member">
                <template #description>
                  Jan 1, 2001 – Feb 28, 2005
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Standards Working Group Member">
                <template #description>
                  Jan 1, 1999 – Dec 31, 2000
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Regional Chapter Liaison">
                <template #description>
                  Jan 1, 1997 – Dec 31, 1998
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Student Chapter Mentor">
                <template #description>
                  Jan 1, 1996 – Dec 31, 1996
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Student Chapter Advisor">
                <template #description>
                  Mar 1, 1995 – Dec 31, 1996
                </template>
              </SdsTimelineItem>
            </SdsTimeline>
          </SdsListItem>

          <SdsListItem
            title="Symantec"
            marker-variant="gray"
            content-title="Steering Committee Member"
            content-description="Since May 19, 2018"
          >
            <template #marker>
              <SdsSvgIcon
                :path="organizationPath"
                view-box="0 0 20 20"
                :height="20"
                :width="20"
              />
            </template>
          </SdsListItem>

          <SdsListItem
            title="ICSE Conference"
            marker-variant="gray"
            content-title="Program Committee Chair"
            content-description="Jul 8, 2019 – Apr 8, 2021"
          >
            <template #marker>
              <SdsSvgIcon
                :path="organizationPath"
                view-box="0 0 20 20"
                :height="20"
                :width="20"
              />
            </template>
          </SdsListItem>

          <SdsListItem
            title="NIST"
            content-layout="full"
            marker-variant="gray"
          >
            <template #marker>
              <SdsSvgIcon
                :path="organizationPath"
                view-box="0 0 20 20"
                :height="20"
                :width="20"
              />
            </template>
            <SdsTimeline
              marker-size="lg"
              variant="history"
            >
              <SdsTimelineItem
                title="Working Group Lead"
                variant="green"
              >
                <template #description>
                  Since Mar 1, 2022
                </template>
              </SdsTimelineItem>
              <SdsTimelineItem title="Technical Reviewer">
                <template #description>
                  Jun 15, 2019 – Feb 28, 2022
                </template>
              </SdsTimelineItem>
            </SdsTimeline>
          </SdsListItem>
        </SdsList>
      </SdsSection>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        List
      </h2>
      <div class="max-w-4xl">
        <SdsList>
          <SdsListItem
            title="Application review"
            content-layout="full"
          >
            <template #marker>
              <SdsAvatar
                size="xs"
                shape="circle"
                name="Morgan Markowski"
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
          <SdsListItem title="Stakeholder follow-up">
            <template #marker>
              <SdsAvatar
                size="sm"
                shape="circle"
                name="Maya Jankowski"
                variant="orange"
              />
            </template>
            <template #description>
              Larger markers can lead a list row when the person is the main subject.
            </template>
            <div class="grid gap-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Maya asked for one more pass on the approval date before the record is closed.
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
          <SdsListItem title="Supporting material">
            <template #marker>
              <span class="inline-flex h-6 w-6 items-center justify-center rounded-theme-sm border border-blue-600 bg-blue-25 text-[10px] font-bold leading-none text-blue-700 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-300">
                QA
              </span>
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
        </SdsList>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Marker Sizes And Shapes
      </h2>
      <SdsList class="grid gap-5 lg:grid-cols-2 lg:space-y-0">
        <SdsListItem title="Extra-small avatar">
          <template #marker>
            <SdsAvatar
              size="xs"
              shape="circle"
              name="Sam Edwards"
              variant="blue"
            />
          </template>
          <template #description>
            Compact rows match dense activity feeds and audit histories.
          </template>
        </SdsListItem>
        <SdsListItem title="Small avatar with detail content">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="circle"
              name="Priya Raman"
              variant="purple"
            />
          </template>
          <template #description>
            Use a larger avatar when the list item represents a person-owned task.
          </template>
          <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
            <dt class="font-semibold text-gray-800 dark:text-gray-100">
              Role
            </dt>
            <dd>Approver</dd>
            <dt class="font-semibold text-gray-800 dark:text-gray-100">
              Status
            </dt>
            <dd>Review requested</dd>
          </dl>
        </SdsListItem>
        <SdsListItem title="Medium portrait avatar">
          <template #marker>
            <SdsAvatar
              size="md"
              shape="portrait"
              src="https://i.pravatar.cc/96?img=32"
              name="Jordan Lee"
              variant="blue"
            />
          </template>
          <template #description>
            Portrait avatars work for profile-oriented lists with richer row content.
          </template>
        </SdsListItem>
        <SdsListItem title="Image marker">
          <template #marker>
            <img
              src="https://picsum.photos/seed/list-marker/48/48"
              alt=""
              class="h-6 w-6 rounded-full object-cover"
            >
          </template>
          <template #description>
            Use an image when the item is associated with an external object or entity.
          </template>
        </SdsListItem>
        <SdsListItem title="Logo marker">
          <template #marker>
            <SdsAvatar
              size="sm"
              shape="square"
              name="Synergistic Software"
              variant="gray"
            >
              SS
            </SdsAvatar>
          </template>
          <template #description>
            Square logo markers suit organizations, systems, and integrations.
          </template>
        </SdsListItem>
        <SdsListItem title="Icon marker">
          <template #marker>
            <SdsAvatar
              size="xs"
              shape="circle"
              name="Complete"
              variant="green"
            >
              <SdsSvgIcon
                :path="checkPath"
                view-box="0 0 20 20"
                :height="14"
                :width="14"
              />
            </SdsAvatar>
          </template>
          <template #description>
            Use an icon when the item represents a status or action.
          </template>
        </SdsListItem>
      </SdsList>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Content Variations
      </h2>
      <SdsList class="grid gap-4 lg:grid-cols-2 lg:space-y-0">
        <SdsListItem title="Long-form item">
          <template #description>
            This item uses a longer description to verify wrapping and spacing across narrow and wide viewports.
          </template>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            The list item leaves its default slot unformatted so consumers can place paragraphs, controls, tables, or nested timelines inside it.
          </p>
        </SdsListItem>
        <SdsListItem title="Actions and metadata">
          <template #marker>
            <SdsAvatar
              size="xs"
              shape="circle"
              name="Daniel Lee"
              variant="blue"
            />
          </template>
          <template #description>
            Combine concise summary text with secondary controls.
          </template>
          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <SdsBadge
              type="light"
              variant="blue"
            >
              Commented
            </SdsBadge>
            <span>2 attachments</span>
            <span>Updated 12 min ago</span>
          </div>
        </SdsListItem>
        <SdsListItem
          title="Nested compact timeline"
          content-layout="full"
        >
          <template #marker>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold leading-none text-white dark:bg-gray-100 dark:text-gray-900">
              TL
            </span>
          </template>
          <template #description>
            A compact timeline can be embedded inside a list item and align with the list edge.
          </template>
          <SdsTimeline
            :collapse-after="2"
          >
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
        <SdsListItem
          title="Nested avatar timeline"
          content-layout="full"
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
            A nested timeline can reserve a larger marker lane for avatar comments.
          </template>
          <SdsTimeline
            marker-size="md"
          >
            <SdsTimelineItem
              title="Olivia Meyers"
              timestamp="A moment ago"
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
            <SdsTimelineItem
              title="Daniel Lee"
              timestamp="Yesterday"
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
                Added access for the audit team.
              </template>
            </SdsTimelineItem>
          </SdsTimeline>
        </SdsListItem>
      </SdsList>
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

const checkPath = 'M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42 0L3.29 9.225a1 1 0 1 1 1.42-1.408l4.04 4.073 6.54-6.594a1 1 0 0 1 1.414-.006Z'
const organizationPath = 'M4 3.75C4 2.78 4.78 2 5.75 2h8.5c.97 0 1.75.78 1.75 1.75V18h-3.5v-3h-5v3H4V3.75ZM7 6h2v2H7V6Zm0 4h2v2H7v-2Zm4-4h2v2h-2V6Zm0 4h2v2h-2v-2Z'
const plusPath = 'M10 3.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5h-4.75v4.75a.75.75 0 0 1-1.5 0v-4.75H4.5a.75.75 0 0 1 0-1.5h4.75V4.5a.75.75 0 0 1 .75-.75Z'
const refreshPath = 'M4.58 5.16A7 7 0 0 1 16.95 8.5a.75.75 0 0 1-1.5 0 5.5 5.5 0 0 0-9.7-3.54h1.7a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75V2.25a.75.75 0 0 1 1.5 0v2.2l-.17.71Zm10.84 9.68A7 7 0 0 1 3.05 11.5a.75.75 0 0 1 1.5 0 5.5 5.5 0 0 0 9.7 3.54h-1.7a.75.75 0 0 1 0-1.5H16a.75.75 0 0 1 .75.75v3.46a.75.75 0 0 1-1.5 0v-2.2l.17-.71Z'
</script>