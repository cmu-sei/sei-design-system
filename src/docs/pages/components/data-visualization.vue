<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar
      </h2>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div
            v-for="shape in avatarShapes"
            :key="shape"
            class="flex flex-col justify-center gap-4 h-auto"
          >
            <div>
              <SdsAvatar
                :size="size"
                :shape="shape"
                variant="gray"
                :src="`https://picsum.photos/seed/${size}-${shape}/200/200`"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div
            v-for="shape in avatarShapes"
            :key="shape"
            class="flex flex-col justify-center gap-4 h-auto"
          >
            <div>
              <SdsAvatar
                :size="size"
                :shape="shape"
                variant="gray"
                type="outline"
                :src="`https://picsum.photos/seed/${size}-${shape}/200/200`"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="circle"
            >
              <SdsAvatar
                :size="size"
                shape="circle"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="square"
            >
              <SdsAvatar
                :size="size"
                shape="square"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4 h-60">
        <div
          v-for="size in avatarSizes"
          :key="size"
        >
          <div class="h-full flex-col flex justify-end">
            <SdsIndicator
              variant="green"
              :size="size"
              status="Online"
              placement="top-right"
              placement-over="portrait"
            >
              <SdsAvatar
                :size="size"
                shape="portrait"
                variant="yellow"
                name="Morgan Markowski"
                alt="Avatar"
              />
            </SdsIndicator>
          </div>
        </div>
      </div>
    </div>
    <h2>Avatar - Icon Slot (All Sizes)</h2>
    <div class="flex flex-row gap-4 mb-8">
      <div
        v-for="size in avatarSizes"
        :key="size"
        class="flex flex-col justify-center gap-4 h-auto"
      >
        <div
          v-for="shape in avatarShapes"
          :key="shape"
        >
          <SdsAvatar
            :size="size"
            :shape="shape"
            variant="blue"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-2/3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </SdsAvatar>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-4 mb-8">
      <div
        v-for="size in avatarSizes"
        :key="size"
        class="flex flex-col justify-center gap-4 h-auto"
      >
        <div
          v-for="shape in avatarShapes"
          :key="shape"
        >
          <SdsAvatar
            :size="size"
            :shape="shape"
            variant="green"
            type="outline"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-3/5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </SdsAvatar>
        </div>
      </div>
    </div>
    <h2>Avatar - All Variants</h2>
    <div class="flex flex-row gap-4">
      <div
        v-for="type in avatarTypes"
        :key="type"
      >
        <div
          v-for="variant in avatarVariants"
          :key="variant"
        >
          <div class="h-full flex-col flex justify-end py-1">
            <SdsAvatar
              :type="type"
              size="lg"
              shape="circle"
              :variant="variant"
              name="Morgan Markowski"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Avatar Group
      </h2>
      <h3 class="text-lg">
        Condensed
      </h3>
      <h4>Circle</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              variant: 'green',
            },
            {
              name: 'Jacobim Mugatu',
              variant: 'purple',
            },
            {
              name: 'Maury Ballstein',
              variant: 'yellow'
            },
            {
              name: 'Morgan Markowski',
              variant: 'red',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein',
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein',
            },
            {
              name: 'Morgan Markowski',
              variant: 'blue',
            },
            {
              name: 'Jacobim Mugatu',
              variant: 'green',
            },
            {
              name: 'Maury Ballstein',
              variant: 'blue',
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              variant: 'green',
            },
            {
              name: 'Jacobim Mugatu',
              variant: 'purple',
            },
            {
              name: 'Maury Ballstein',
              variant: 'yellow'
            },
            {
              name: 'Morgan Markowski',
              variant: 'red',
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              src: 'https://picsum.photos/seed/1/200/200',
              href: 'https://google.com',
              variant: 'red',
              target: '_blank'
            },
            {
              name: 'Jacobim Mugatu',
              src: 'https://picsum.photos/seed/2/200/200',
              href: 'https://google.com',
              target: '_blank'
            },
            {
              name: 'Maury Ballstein',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/3/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/4/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/5/200/200',
              target: '_blank'
            },
            {
              name: 'Morgan Markowski',
              href: 'https://google.com',
              src: 'https://picsum.photos/seed/6/200/400',
              target: '_blank'
            },
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
              src: 'https://picsum.photos/seed/1/200/200',
              href: 'https://google.com',
              variant: 'red',
              target: '_blank'
            },
            {
              name: 'Jacobim Mugatu',
              src: 'https://picsum.photos/seed/2/200/200',
              href: 'https://google.com',
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="circle"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h4>Square</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="square"
          density="condensed"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h3 class="text-lg">
        Default
      </h3>
      <h4>Circle</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="circle"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <h4>Square</h4>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="md"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="sm"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
      <div class="flex flex-row gap-4">
        <SdsAvatarGroup
          size="xs"
          shape="square"
          :srcset="[
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            },
            {
              name: 'Morgan Markowski',
            },
            {
              name: 'Jacobim Mugatu',
            },
            {
              name: 'Maury Ballstein'
            }
          ]"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Badge
      </h2>
      <div class="flex flex-row gap-4 flex-wrap">
        <div
          v-for="variant in badgeVariants"
          :key="variant"
          class="flex flex-col gap-4"
        >
          <div
            v-for="type in badgeTypes"
            :key="type"
            class="flex flex-row gap-4"
          >
            <SdsBadge
              :type="type"
              :variant="variant"
            >
              Badge
            </SdsBadge>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Datapoint
      </h2>
      <div>
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="gray"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="gray"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="tan"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="md"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="lg"
          variant="yellow"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="md"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="lg"
          variant="orange"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="red"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="purple"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="indigo"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="blue"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="teal"
          label="Report Downloads"
        />
        <SdsDatapoint
          v-model="datapointModelValue"
          size="sm"
          variant="green"
          label="Report Downloads"
        />
      </div>
    </div>

    <div class="grid gap-4">
      <div class="prose prose-blue dark:prose-invert prose-headings:max-w-prose prose-p:max-w-4xl max-w-none p-4 md:p-8">
        <h2>
          Bar Chart
        </h2>
        <p>
          A reusable SVG-based bar chart built with
          <SdsLink
            :external="true"
            kind="primary"
            type="inline"
            variant="blue"
            href="https://d3js.org/"
          >
            D3
          </SdsLink>. Pass <code>:data</code> as a plain array of <code>{ label, value }</code> objects for a
          single-series chart, or as an array of named series for grouped/stacked charts. The component
          detects the data shape automatically. Use <code>mode="stacked"</code> to stack bars instead of
          grouping them.
          Use the optional <code>x-axis-label</code> and <code>y-axis-label</code> props to name each
          dimension independently. For example, the horizontal chart below has only an x-axis title;
          leaving both props out removes the titles.
        </p>

        <!-- ─── Vertical - Single Series ─────────────────────────────────────── -->
        <h3>Vertical - Single Series</h3>
        <p>
          A single-series bar chart using <code>:data</code>. Each bar is colored by position from the
          default palette.
        </p>
        <div class="not-prose mt-6 max-w-3xl">
          <SdsBarChart
            :data="browserShare2025"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            animate
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Vertical)"
            x-axis-label="Browser"
            y-axis-label="Percentage"
          />
        </div>

        <!-- ─── Horizontal - Single Series ───────────────────────────────────── -->
        <h3 class="mt-10">
          Horizontal - Single Series
        </h3>
        <p>
          Set <code>orientation="horizontal"</code> to flip the chart. Category labels appear on the
          y-axis; values extend left-to-right.
        </p>
        <div class="not-prose mt-6 max-w-3xl">
          <SdsBarChart
            :data="sortByProperty(browserShare2025, 'value', 'desc')"
            :x-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Horizontal)"
            x-axis-label="Percentage"
          />
        </div>

        <!-- ─── Horizontal - Long Y-Axis Labels ─────────────────────────────── -->
        <h3 class="mt-10">
          Horizontal - Long Y-Axis Labels
        </h3>
        <p>
          When category labels are long, a horizontal chart paired with
          <code>orientation="horizontal"</code> wraps them automatically rather than truncating. Labels
          are given descriptive engine or vendor names to stress-test the y-axis.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="sortByProperty(browserShare2025LongLabels, 'value', 'desc')"
            :x-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Long Labels)"
            x-axis-label="Percentage"
            y-axis-label="Browser"
          />
        </div>

        <!-- ─── Vertical - Grouped ────────────────────────────────────────────── -->
        <h3 class="mt-10">
          Vertical - Grouped
        </h3>
        <p>
          Use <code>mode="grouped"</code> for multi-series data. Here, each browser is an x-axis
          category, and the grouped bars represent years (2020-2025). This view makes it easy to see how
          each browser's market share evolved over time.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="browserShareByYearSeries"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Vertical Grouped (Years as Series)"
            x-axis-label="Browser"
            y-axis-label="Percentage"
          />
        </div>

        <!-- ─── Vertical - Stacked ────────────────────────────────────────────── -->
        <h3 class="mt-10">
          Vertical - Stacked
        </h3>
        <p>
          Set <code>mode="stacked"</code> to stack year segments on top of one another, making totals
          easy to compare while preserving per-year contributions.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="browserShareBySeries"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="stacked"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Vertical Stacked"
            x-axis-label="Year"
            y-axis-label="Percentage"
          />
        </div>

        <!-- ─── Horizontal - Grouped ─────────────────────────────────────────── -->
        <h3 class="mt-10">
          Horizontal - Grouped
        </h3>
        <p>
          Combine <code>orientation="horizontal"</code> with the default <code>mode="grouped"</code>.
          Category labels on the left scale naturally with longer browser names.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :height="720"
            :data="browserShareBySeries"
            :x-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            orientation="horizontal"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Horizontal Grouped"
            x-axis-label="Percentage"
            y-axis-label="Browser"
          />
        </div>

        <!-- ─── Horizontal - Stacked ─────────────────────────────────────────── -->
        <h3 class="mt-10">
          Horizontal - Stacked
        </h3>
        <p>
          Combine <code>orientation="horizontal"</code> with <code>mode="stacked"</code> for a
          part-to-whole view across browsers.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="browserShareBySeries"
            :x-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            mode="stacked"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Horizontal Stacked"
            x-axis-label="Percentage"
            y-axis-label="Browser"
          />
        </div>

        <!-- ─── Responsive aspect ratio ──────────────────────────────────────── -->
        <h3 class="mt-10">
          Responsive aspect ratio
        </h3>
        <p>
          Omit <code>height</code> and pass <code>aspect-ratio</code> instead. The chart derives its
          height from <code>containerWidth / aspectRatio</code> and updates on resize.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="browserShare2025"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            :aspect-ratio="16 / 9"
            show-tooltip
            title="Browser Market Share 2025 - 16:9 Aspect Ratio"
            x-axis-label="Browser"
            y-axis-label="Percentage"
          />
        </div>

        <!-- ─── Single series - custom color ────────────────────────────────── -->
        <h3 class="mt-10">
          Single series - custom color
        </h3>
        <p>
          Set <code>color</code> on each item in the <code>:data</code> array to override the default
          uniform bar color for single-series charts.
        </p>
        <div class="not-prose mt-6 max-w-3xl">
          <SdsBarChart
            :data="browserShare2025CustomColor"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            show-tooltip
            title="Browser Market Share 2025 - Custom Color"
            x-axis-label="Browser"
            y-axis-label="Percentage"
          />
        </div>

        <!-- ─── Multi series - per-series color override ─────────────────────── -->
        <h3 class="mt-10">
          Multi series - per-series color override
        </h3>
        <p>
          Each series in the <code>:data</code> array can include a <code>color</code> property to
          override the default palette. Colors are defined at the data level, not as a separate prop.
        </p>
        <div class="not-prose mt-6">
          <SdsBarChart
            :data="browserShareBySeriesBrandColors"
            :y-tick-formatter="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Per-Series Brand Colors"
            x-axis-label="Year"
            y-axis-label="Percentage"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="prose prose-blue dark:prose-invert prose-headings:max-w-prose prose-p:max-w-4xl max-w-none p-4 md:p-8">
        <h2>
          Line Chart
        </h2>
        <p>
          A reusable SVG-based line chart for trend analysis across ordered categories. Like the other
          chart components, it is built on <code>BaseChart</code> and supports tooltips, optional
          legends via <code>show-legend</code>, and responsive sizing via <code>aspect-ratio</code>.
          Optional <code>x-axis-label</code> and <code>y-axis-label</code> props add horizontal and
          vertical axis titles. Leave either one out when that dimension is self-explanatory.
        </p>

        <h3>Multi-series trend comparison (6 lines or fewer)</h3>
        <p>
          This customer satisfaction dataset uses quarterly values across service channels. With six
          or fewer series, each line receives a distinct color for fast comparison.
        </p>
        <div class="not-prose mt-6">
          <SdsLineChart
            :data="browserLineTrendSeries"
            :y-tick-formatter="linePercentFormat"
            :tooltip-value-format="linePercentFormat"
            :aspect-ratio="16 / 9"
            show-tooltip
            show-points
            show-legend
            title="Customer Satisfaction by Channel (Quarterly)"
            x-axis-label="Quarter"
            y-axis-label="Satisfaction"
          />
        </div>

        <h3 class="mt-10">
          Missing data with dashed gaps
        </h3>
        <p>
          Null values intentionally break each line segment. Dashed connectors show missing reporting
          windows in a way users can read immediately.
        </p>
        <div class="not-prose mt-6">
          <SdsLineChart
            :data="browserLineTrendWithGaps"
            :y-tick-formatter="linePercentFormat"
            :tooltip-value-format="linePercentFormat"
            :aspect-ratio="16 / 9"
            show-tooltip
            show-points
            show-legend
            title="Customer Satisfaction with Missing Quarters"
            x-axis-label="Quarter"
            y-axis-label="Satisfaction"
          />
        </div>

        <h3 class="mt-10">
          Dense mode (more than 6 lines)
        </h3>
        <p>
          When series count exceeds six, all lines render in gray to reduce visual noise. Hovering a
          line highlights it in blue. Use <code>line-count-threshold</code> to override when this mode starts.
        </p>
        <div class="not-prose mt-6">
          <SdsLineChart
            :data="browserLineTrendManySeries"
            :y-tick-formatter="linePercentFormat"
            :tooltip-value-format="linePercentFormat"
            :aspect-ratio="16 / 9"
            :line-count-threshold="6"
            show-tooltip
            show-points
            show-legend
            title="Dense Multi-Series Customer Satisfaction Trends"
            x-axis-label="Quarter"
            y-axis-label="Satisfaction"
          />
        </div>

        <h3 class="mt-10">
          Time scale example
        </h3>
        <p>
          When the x-axis represents real dates, use <code>x-scale-type="time"</code> so D3 can render time ticks with actual temporal spacing.
        </p>
        <div class="not-prose mt-6">
          <SdsLineChart
            :data="[
              {
                label: 'Capacity',
                data: lineMonths.map((date, index) => ({ x: date, y: [42, 48, 45, 53, 49, 57, 61, 58, 64, 66, 69, 72][index] })),
              },
              {
                label: 'Demand',
                data: lineMonths.map((date, index) => ({ x: date, y: [50, 46, 52, 55, 60, 58, 63, 67, 65, 70, 74, 71][index] })),
              },
            ]"
            :y-tick-formatter="linePercentFormat"
            :tooltip-value-format="linePercentFormat"
            x-scale-type="utc"
            :x-tick-values="lineMonths"
            :x-tick-formatter="formatMonthTickLabel"
            :aspect-ratio="16 / 9"
            show-tooltip
            show-points
            show-legend
            title="Monthly Trend with a Time Scale"
            x-axis-label="Month"
            y-axis-label="Percentage"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="prose min-w-0 prose-blue dark:prose-invert prose-headings:max-w-prose prose-p:max-w-4xl max-w-none p-4 md:p-8">
        <h2>
          Heatmap Chart
        </h2>
        <p>
          A reusable SVG-based heatmap built with
          <SdsLink
            :external="true"
            kind="primary"
            type="inline"
            variant="blue"
            href="https://d3js.org/"
          >
            D3
          </SdsLink>. Pass <code>:data</code> as an array of <code>{ x, y, value }</code> objects, then control axis
          order with <code>x-tick-values</code> and <code>y-tick-values</code>.
        </p>
        <p>
          Heatmaps work best for dense, discrete categories where color intensity helps reveal
          distribution shifts. Keep labels short, align tooltip content to user questions, and pick a
          palette with clear low-to-high contrast in both light and dark themes. Optional
          <code>x-axis-label</code> and <code>y-axis-label</code> props identify the dimensions; omit
          either label when it is not needed.
        </p>

        <h3>Monthly Commits by Year</h3>
        <p>
          Generated sample commit counts for every month from 2021 through 2026. Month ticks use
          abbreviations; hover over a cell to see the full month and year, its color, and the commit
          count. New sample values are generated each time the page loads.
        </p>

        <div class="not-prose mt-6 overflow-x-auto">
          <SdsHeatmapChart
            :data="monthlyCommitsHeatmap"
            :x-tick-values="commitMonths"
            :x-tick-formatter="commitMonthTickFormatter"
            :y-tick-values="commitYears"
            show-tooltip
            show-legend
            legend-position="bottom-right"
            title="Monthly Commits by Year, 2021-2026"
            x-axis-label="Month"
            y-axis-label="Year"
          >
            <template #tooltip="{ data }">
              <SdsChartTooltipContent
                v-if="data"
                :title="`${data.x}, ${data.y}`"
                label="commits"
                :datapoint="data.value"
                :color="data.color"
              />
            </template>
          </SdsHeatmapChart>
        </div>
      </div>
    </div>

    <div class="grid gap-4">
      <div class="prose prose-blue dark:prose-invert prose-headings:max-w-prose prose-p:max-w-4xl max-w-none p-4 md:p-8">
        <h2>
          Pie Chart
        </h2>
        <p>
          A reusable SVG-based pie chart built with
          <SdsLink
            :external="true"
            kind="primary"
            type="inline"
            variant="blue"
            href="https://d3js.org/"
          >
            D3
          </SdsLink>. The component accepts a <code>slices</code> array and renders a responsive pie chart with a
          built-in legend. An optional <code>innerRadius</code> prop turns the chart into a donut.
        </p>

        <h3>Browser Market Share 2025 - default color palette</h3>
        <p>
          When slices omit the <code>color</code> property, the chart automatically assigns colors from
          the built-in <code>defaultColors</code> utility palette. Data sourced from
          <SdsLink
            :external="true"
            kind="primary"
            type="inline"
            variant="blue"
            href="https://gs.statcounter.com/browser-market-share/all/worldwide/2025"
          >
            StatCounter Global Stats
          </SdsLink>.
        </p>
        <div class="not-prose mt-6 max-w-2xl">
          <SdsPieChart
            :slices="browserSlicesNoColor"
            :height="400"
            :aspect-ratio="16 / 9"
            show-labels
            show-legend
            show-tooltip
            :tooltip-value-format="formatPercent"
            label-type="both"
            title="Browser Market Share Worldwide 2025 - default palette"
          />
        </div>
        <h3 class="mt-10">
          Browser Market Share 2025 - explicit brand colors
        </h3>
        <p>
          When slices include a <code>color</code> property, that value is used directly, overriding the
          default palette. This is useful when brand or category colors are meaningful to the reader.
        </p>
        <div class="not-prose mt-6 max-w-2xl">
          <SdsPieChart
            :slices="browserSlicesBrandColor"
            :height="400"
            :aspect-ratio="16 / 9"
            show-labels
            show-legend
            show-tooltip
            :tooltip-value-format="formatPercent"
            label-type="both"
            title="Browser Market Share Worldwide 2025 - brand colors"
          />
        </div>
        <h3 class="mt-10">
          Donut variant
        </h3>
        <p>Pass an <code>innerRadius</code> (as a pixel value) to render a donut chart.</p>
        <div class="not-prose mt-6 max-w-2xl">
          <SdsPieChart
            :slices="browserSlicesBrandColor"
            :height="400"
            :aspect-ratio="16 / 9"
            :inner-radius="100"
            show-labels
            show-legend
            show-tooltip
            :tooltip-value-format="formatPercent"
            label-type="both"
            title="Browser Market Share Worldwide 2025 (Donut)"
          />
        </div>
        <h3 class="mt-10">
          Responsive aspect ratio
        </h3>
        <p>
          Omit <code>height</code> and pass <code>aspect-ratio</code> instead. The chart derives its
          height from <code>containerWidth / aspectRatio</code> and updates automatically on resize,
          giving you a fully responsive chart without a fixed pixel height.
        </p>

        <div class="not-prose mt-6 max-w-4xl">
          <SdsPieChart
            :slices="browserSlicesBrandColor"
            :aspect-ratio="16 / 9"
            show-labels
            show-legend
            show-tooltip
            :tooltip-value-format="formatPercent"
            label-type="both"
            title="Browser Market Share Worldwide 2025 - 16:9 aspect ratio"
          />
        </div>
        <h3 class="mt-10">
          Custom legend slot
        </h3>
        <p>Override the <code>#legend</code> slot to provide a custom legend layout.</p>
        <div class="not-prose mt-6 max-w-2xl">
          <SdsPieChart
            :slices="browserSlicesBrandColor"
            :height="400"
            :aspect-ratio="16 / 9"
            show-labels
            show-legend
            :tooltip-value-format="formatPercent"
            label-type="both"
            title="Browser Market Share - Custom Legend"
          >
            <template #legend="{ items: legendItems, hoveredIndex, updateHoveredIndex }">
              <table class="w-full font-normal text-sm border-collapse text-gray-600 dark:text-gray-400">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="py-1 text-left font-semibold">
                      Browser
                    </th>
                    <th class="py-1 text-right font-semibold">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in legendItems"
                    :key="item.label"
                    :class="hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
                    class="border-b border-gray-100 dark:border-gray-800 cursor-pointer"
                    @mouseenter="updateHoveredIndex(i)"
                    @mouseleave="updateHoveredIndex(null)"
                  >
                    <td class="py-1 flex items-center gap-2">
                      <span
                        class="inline-block h-3.5 w-3.5 rounded-xs shrink-0"
                        :style="{ backgroundColor: item.color }"
                        aria-hidden="true"
                      />
                      {{ item.label }}
                    </td>
                    <td class="py-1 text-right tabular-nums">
                      {{ item.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </SdsPieChart>
        </div>
      </div>
    </div>

    <div class="grid gap-4">
      <h2 class="text-xl">
        Table
      </h2>
      <div>
        <SdsTable
          :fields="fields"
          :items="items"
          enable-drawer
          row-highlight
          hide-header
          caption="Fruits Table"
          subcaption="Current inventory and stocking assignments"
          standalone
        >
          <template #cell(fruit_employee)="{ item }: { item: TableItem }">
            <p class="font-bold">
              {{ item.fruit }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Stocked by <span class="font-bold">{{ item.employee }}</span>
            </p>
          </template>
          <template #cell(actions)="{ item }: { item: TableItem }">
            <button @click="edit(item)">
              Edit
            </button>
          </template>
          <template #drawer="{ item }: { item: TableItem }">
            <ul class="py-2 pl-10 pr-8 rounded-md">
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Store:</span>
                  <span>{{ (item.additionalData as AdditionalData).store }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Aisle:</span>
                  <span>{{ (item.additionalData as AdditionalData).aisle }}</span>
                </p>
              </li>
              <li>
                <p class="space-x-1">
                  <span class="font-bold">Price:</span>
                  <span>{{ (item.additionalData as AdditionalData).price }}</span>
                </p>
              </li>
            </ul>
          </template>
        </SdsTable>
      </div>
      <div>
        <SdsTable
          :fields="fields_simple"
          :items="items_simple"
          standalone
        >
          <template #cell(fruit)="{ value }">
            <p class="font-bold">
              {{ value }}
            </p>
          </template>
          <template #cell(actions)>
            <button>
              Edit
            </button>
          </template>
        </SdsTable>
      </div>
    </div>
    <div class="grid gap-4 h-full">
      <h2 class="text-xl">
        Top Five Chart
      </h2>
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="gray"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="tan"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="yellow"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="orange"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="green"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="blue"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="purple"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="indigo"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="red"
        :view-all-url="viewAllUrl"
      />
      <SdsTopFiveChart
        :title="title"
        :entries="entries"
        :show-percent="false"
        :small-heading="false"
        variant="teal"
        :view-all-url="viewAllUrl"
      />
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Tag
      </h2>
      <div class="grid gap-4">
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag>
              <template #label>
                Super duper long title that is so so long it cannot be stopped
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              href="https://designsystem.sei.cmu.edu/"
              :external="true"
            >
              <template #label>
                Super duper long title that is so so long it cannot be stopped
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :readonly="true"
            >
              <template #label>
                Read-only
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="increment"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="decrement"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="remove"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag size="md">
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              href="https://designsystem.sei.cmu.edu/"
              size="md"
              :external="true"
            >
              <template #label>
                Link
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              size="md"
              :readonly="true"
            >
              <template #label>
                Read-only
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="increment"
              size="md"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="decrement"
              size="md"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              action="remove"
              size="md"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
              href="https://sei.cmu.edu"
            >
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4000"
              action="increment"
              href="https://sei.cmu.edu"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="decrement"
              href="https://sei.cmu.edu"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="remove"
              href="https://sei.cmu.edu"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
              size="md"
            >
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="400"
              action="increment"
              size="md"
            >
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="decrement"
              size="md"
            >
              <template #label>
                Decrement
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="remove"
              size="md"
            >
              <template #label>
                Remove
              </template>
            </SdsTag>
          </li>
        </ul>
        <ul class="flex flex-row flex-wrap gap-2">
          <li>
            <SdsTag
              :counter="4"
              size="sm"
            >
              <template #leftSlot>
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
                </svg>
              </template>
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
              size="sm"
            >
              <template #leftSlot>
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
                </svg>
              </template>
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              size="md"
            >
              <template #leftSlot>
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
                </svg>
              </template>
              <template #label>
                Default
              </template>
            </SdsTag>
          </li>
          <li>
            <SdsTag
              :counter="4"
              action="increment"
              size="md"
              disabled
            >
              <template #leftSlot>
                <svg
                  class="svg-inline--fa fa-icons fa-fw h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="icons"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    class=""
                    fill="currentColor"
                    d="M500.3 7.3C507.7 13.3 512 22.4 512 32l0 144c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-57L352 90.2 352 208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48l0-96c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM74.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2l61.7 0c10.7 0 20.7 5.3 26.6 14.2L213.3 304l26.7 0c26.5 0 48 21.5 48 48l0 112c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 352c0-26.5 21.5-48 48-48l26.7 0zM192 408a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM478.7 278.3L440.3 368l55.7 0c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L391.7 400 336 400c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L19.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"
                  />
                </svg>
              </template>
              <template #label>
                Increment
              </template>
            </SdsTag>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AxisDomain } from '@/lib/d3'
import type { BarItem, BarSeries } from '@/composables/useBarChart'
import type { HeatmapCell } from '@/composables/useHeatmapChart'
import type { LineSeries } from '@/composables/useLineChart'
import type { PieSlice } from '@/composables/usePieChart'
import type { TableField, TableItem } from '../../../components/Table/Table.vue';
import SdsBarChart from '@/components/BarChart/BarChart.vue'
import SdsChartTooltipContent from '@/components/ChartTooltip/ChartTooltipContent.vue'
import SdsHeatmapChart from '@/components/HeatmapChart/HeatmapChart.vue'
import SdsLink from '@/components/Link/Link.vue';
import SdsLineChart from '@/components/LineChart/LineChart.vue'
import SdsPieChart from '@/components/PieChart/PieChart.vue';
import { formatPercent, sortByProperty } from '@/helpers/charts'

const datapointModelValue = ref(1451)

const avatarSizes = ref<('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')[]>(['xs', 'sm', 'md', 'lg', 'xl', '2xl'])
const avatarShapes = ref<('circle' | 'square' | 'portrait')[]>(['circle', 'square', 'portrait'])
const avatarVariants = ref<('gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'orange')[]>(['gray', 'red', 'yellow', 'green', 'blue', 'purple', 'orange'])
const avatarTypes = ref<('subtle' | 'outline')[]>(['subtle', 'outline'])
const badgeVariants = ref<('gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green' | undefined)[]>(
  ['gray', 'tan', 'yellow', 'orange', 'red', 'purple', 'indigo', 'blue', 'teal', 'green']
)
const badgeTypes = ref<('light-border' | 'light' | 'medium' | 'dark' | undefined)[]>(['light-border', 'light', 'medium', 'dark'])

/**
 * Bar Chart(s)
 */

// ── Single-series: 2025 market share ─────────────────────────────────────────
// Source: StatCounter Global Stats – Desktop, worldwide, 2025
const browserShare2025: BarItem[] = [
  { label: 'Chrome', value: 65.8 },
  { label: 'Safari', value: 18.2 },
  { label: 'Edge', value: 5.0 },
  { label: 'Firefox', value: 2.7 },
  { label: 'Others', value: 8.3 },
]

// ── Single-series with long descriptive labels (for y-axis wrapping demo) ─────
const browserShare2025LongLabels: BarItem[] = [
  { label: 'Google Chrome - Blink Rendering Engine', value: 65.8 },
  { label: 'Apple Safari - WebKit Rendering Engine', value: 18.2 },
  { label: 'Microsoft Edge - Chromium-based Browser', value: 5.0 },
  { label: 'Mozilla Firefox - Gecko Rendering Engine', value: 2.7 },
  { label: 'Opera, Samsung Internet & Other Browsers', value: 8.3 },
]

// ── Single-series with custom uniform color ──────────────────────────────────
const browserShare2025CustomColor: BarItem[] = [
  { label: 'Chrome', value: 65.8, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Safari', value: 18.2, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Firefox', value: 2.7, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Others', value: 8.3, color: { light: '#e15759', dark: '#f0a0a1' } },
]

// ── Multi-series: per-browser share across 2020 – 2025 ────────────────────────
// Source: StatCounter Global Stats – Desktop, worldwide
// Series = browsers; x-axis = years
const browserShareBySeries: BarSeries[] = [
  {
    label: 'Chrome',
    data: [
      { label: '2020', value: 68.3 },
      { label: '2021', value: 66.9 },
      { label: '2022', value: 65.1 },
      { label: '2023', value: 63.5 },
      { label: '2024', value: 65.2 },
      { label: '2025', value: 65.8 },
    ],
  },
  {
    label: 'Safari',
    data: [
      { label: '2020', value: 16.9 },
      { label: '2021', value: 18.2 },
      { label: '2022', value: 18.8 },
      { label: '2023', value: 19.9 },
      { label: '2024', value: 18.5 },
      { label: '2025', value: 18.2 },
    ],
  },
  {
    label: 'Edge',
    data: [
      { label: '2020', value: 3.1 },
      { label: '2021', value: 3.4 },
      { label: '2022', value: 3.9 },
      { label: '2023', value: 4.6 },
      { label: '2024', value: 5.1 },
      { label: '2025', value: 5.0 },
    ],
  },
  {
    label: 'Firefox',
    data: [
      { label: '2020', value: 4.1 },
      { label: '2021', value: 3.7 },
      { label: '2022', value: 3.2 },
      { label: '2023', value: 2.9 },
      { label: '2024', value: 2.8 },
      { label: '2025', value: 2.7 },
    ],
  },
  {
    label: 'Others',
    data: [
      { label: '2020', value: 7.6 },
      { label: '2021', value: 7.8 },
      { label: '2022', value: 9.0 },
      { label: '2023', value: 9.1 },
      { label: '2024', value: 8.4 },
      { label: '2025', value: 8.3 },
    ],
  },
]

// ── Restructure: years as series, browsers as categories ─────────────────────
// X-axis: browsers, Grouped bars: years (2020-2025 for each browser)
const browserShareByYearSeries = (() => {
  // Sort browsers by their 2025 value descending → x-axis categories: Chrome, Safari, Others, Edge, Firefox
  const browsers = browserShareBySeries
    .slice()
    .sort(
      (a, b) => (b.data[b.data.length - 1]?.value ?? 0) - (a.data[a.data.length - 1]?.value ?? 0),
    )
    .map((s) => s.label)

  // Years in chronological order
  const years = browserShareBySeries[0]?.data.map((d) => d.label) ?? []

  // Transform: create a series for each year, with browsers in the sorted order
  return years.map((year) => ({
    label: year,
    data: browsers.map((browserName) => {
      const browserSeries = browserShareBySeries.find((s) => s.label === browserName)
      const dataPoint = browserSeries?.data.find((d) => d.label === year)
      return {
        label: browserName,
        value: dataPoint?.value ?? 0,
      }
    }),
  })) as BarSeries[]
})()

// ── Multi-series with per-series brand colors ─────────────────────────────────
const browserShareBySeriesBrandColors: BarSeries[] = [
  {
    label: 'Chrome',
    color: { light: '#4e79a7', dark: '#7fb3d3' },
    data: [
      { label: '2020', value: 68.3 },
      { label: '2021', value: 66.9 },
      { label: '2022', value: 65.1 },
      { label: '2023', value: 63.5 },
      { label: '2024', value: 65.2 },
      { label: '2025', value: 65.8 },
    ],
  },
  {
    label: 'Safari',
    color: { light: '#f28e2b', dark: '#f7b97e' },
    data: [
      { label: '2020', value: 16.9 },
      { label: '2021', value: 18.2 },
      { label: '2022', value: 18.8 },
      { label: '2023', value: 19.9 },
      { label: '2024', value: 18.5 },
      { label: '2025', value: 18.2 },
    ],
  },
  {
    label: 'Edge',
    color: { light: '#e15759', dark: '#f0a0a1' },
    data: [
      { label: '2020', value: 3.1 },
      { label: '2021', value: 3.4 },
      { label: '2022', value: 3.9 },
      { label: '2023', value: 4.6 },
      { label: '2024', value: 5.1 },
      { label: '2025', value: 5.0 },
    ],
  },
  {
    label: 'Firefox',
    color: { light: '#76b7b2', dark: '#aad5d2' },
    data: [
      { label: '2020', value: 4.1 },
      { label: '2021', value: 3.7 },
      { label: '2022', value: 3.2 },
      { label: '2023', value: 2.9 },
      { label: '2024', value: 2.8 },
      { label: '2025', value: 2.7 },
    ],
  },
  {
    label: 'Others',
    color: { light: '#59a14f', dark: '#96c990' },
    data: [
      { label: '2020', value: 7.6 },
      { label: '2021', value: 7.8 },
      { label: '2022', value: 9.0 },
      { label: '2023', value: 9.1 },
      { label: '2024', value: 8.4 },
      { label: '2025', value: 8.3 },
    ],
  },
]

/**
 * Line Chart(s)
 */
const lineQuarters = [
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
  'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025',
]
const lineMonths = [
  new Date(Date.UTC(2025, 0, 1)),
  new Date(Date.UTC(2025, 1, 1)),
  new Date(Date.UTC(2025, 2, 1)),
  new Date(Date.UTC(2025, 3, 1)),
  new Date(Date.UTC(2025, 4, 1)),
  new Date(Date.UTC(2025, 5, 1)),
  new Date(Date.UTC(2025, 6, 1)),
  new Date(Date.UTC(2025, 7, 1)),
  new Date(Date.UTC(2025, 8, 1)),
  new Date(Date.UTC(2025, 9, 1)),
  new Date(Date.UTC(2025, 10, 1)),
  new Date(Date.UTC(2025, 11, 1)),
]

const formatMonthTickLabel = (value: AxisDomain) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(
    value instanceof Date
      ? value
      : typeof value === 'string' || typeof value === 'number'
        ? new Date(value)
        : new Date(value.valueOf()),
  )
const linePercentFormat = (value: number) => formatPercent(value)

const browserLineTrendSeries: LineSeries[] = [
  {
    label: 'Web',
    data: lineQuarters.map((quarter, index) => ({ x: quarter, y: [62, 71, 69, 78, 74, 81, 77, 85, 80, 88, 83, 86][index] ?? 0 })),
  },
  {
    label: 'Mobile App',
    data: lineQuarters.map((quarter, index) => ({ x: quarter, y: [88, 79, 83, 72, 76, 68, 74, 67, 73, 65, 70, 63][index] ?? 0 })),
  },
  {
    label: 'API',
    data: lineQuarters.map((quarter, index) => ({ x: quarter, y: [54, 58, 73, 61, 79, 66, 82, 70, 76, 69, 84, 72][index] ?? 0 })),
  },
  {
    label: 'Support',
    data: lineQuarters.map((quarter, index) => ({ x: quarter, y: [91, 85, 87, 80, 84, 77, 79, 73, 75, 69, 72, 66][index] ?? 0 })),
  },
]

const browserLineTrendWithGaps: LineSeries[] = [
  {
    label: 'Web',
    data: [
      { x: 'Q1 2023', y: 62 },
      { x: 'Q2 2023', y: 71 },
      { x: 'Q3 2023', y: null },
      { x: 'Q4 2023', y: 78 },
      { x: 'Q1 2024', y: 74 },
      { x: 'Q2 2024', y: null },
      { x: 'Q3 2024', y: 77 },
      { x: 'Q4 2024', y: 85 },
      { x: 'Q1 2025', y: 80 },
      { x: 'Q2 2025', y: null },
      { x: 'Q3 2025', y: 83 },
      { x: 'Q4 2025', y: 86 },
    ],
  },
  {
    label: 'Mobile App',
    data: [
      { x: 'Q1 2023', y: 88 },
      { x: 'Q2 2023', y: null },
      { x: 'Q3 2023', y: 83 },
      { x: 'Q4 2023', y: 72 },
      { x: 'Q1 2024', y: null },
      { x: 'Q2 2024', y: 68 },
      { x: 'Q3 2024', y: 74 },
      { x: 'Q4 2024', y: 67 },
      { x: 'Q1 2025', y: null },
      { x: 'Q2 2025', y: 65 },
      { x: 'Q3 2025', y: 70 },
      { x: 'Q4 2025', y: 63 },
    ],
  },
  {
    label: 'Support',
    data: [
      { x: 'Q1 2023', y: 91 },
      { x: 'Q2 2023', y: 85 },
      { x: 'Q3 2023', y: null },
      { x: 'Q4 2023', y: 80 },
      { x: 'Q1 2024', y: 84 },
      { x: 'Q2 2024', y: 77 },
      { x: 'Q3 2024', y: null },
      { x: 'Q4 2024', y: 73 },
      { x: 'Q1 2025', y: 75 },
      { x: 'Q2 2025', y: 69 },
      { x: 'Q3 2025', y: null },
      { x: 'Q4 2025', y: 66 },
    ],
  },
]

const denseSeriesProfiles = [
  [78, 66, 74, 61, 79, 68, 83, 70, 76, 64, 81, 69],
  [63, 72, 65, 76, 67, 74, 69, 78, 71, 75, 73, 80],
  [85, 82, 88, 80, 84, 79, 86, 77, 83, 76, 87, 74],
  [58, 64, 60, 69, 62, 67, 64, 71, 66, 70, 68, 73],
  [74, 70, 77, 68, 75, 66, 79, 69, 76, 67, 80, 70],
  [69, 75, 71, 78, 73, 76, 70, 79, 72, 77, 74, 81],
  [81, 73, 84, 71, 82, 70, 86, 72, 83, 69, 85, 73],
  [55, 61, 57, 64, 59, 66, 58, 68, 60, 65, 62, 69],
]

const browserLineTrendManySeries: LineSeries[] = [
  'Web',
  'Mobile App',
  'API',
  'Support',
  'Store',
  'Partner',
  'Email',
  'Chatbot'
].map((label, index) => ({
  label,
  data: lineQuarters.map((quarter, quarterIndex) => ({
    x: quarter,
    y: denseSeriesProfiles[index]?.[quarterIndex] ?? 0,
  })),
}))

/**
 * Heatmap Chart(s)
 */

const commitYears = Array.from({ length: 6 }, (_, index) => String(2021 + index))
const commitMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const monthlyCommitsHeatmap: HeatmapCell[] = commitYears.flatMap((year) =>
  commitMonths.map((month) => ({
    x: month,
    y: year,
    value: Math.floor(Math.random() * 251),
  })),
)
const commitMonthTickFormatter = (value: AxisDomain): string => String(value).slice(0, 3)

/**
 * Pie Chart(s)
 */

/**
 * Explicit brand colors override the default palette.
 * Source: https://gs.statcounter.com/browser-market-share/all/worldwide/2025
 */
const browserSlicesBrandColor: PieSlice[] = [
  { label: 'Chrome', value: 65.8, color: { light: '#4e79a7', dark: '#7fb3d3' } },
  { label: 'Safari', value: 18.2, color: { light: '#f28e2b', dark: '#f7b97e' } },
  { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Firefox', value: 2.7, color: { light: '#76b7b2', dark: '#aad5d2' } },
  { label: 'Samsung Internet', value: 2.5, color: { light: '#59a14f', dark: '#96c990' } },
  { label: 'Opera', value: 2.2, color: { light: '#edc948', dark: '#f5df8e' } },
  { label: 'Brave', value: 1.5, color: { light: '#b07aa1', dark: '#d0afc6' } },
  { label: 'Others', value: 2.1, color: { light: '#ff9da7', dark: '#ffc8cd' } },
]

/**
 * No color — falls back to the defaultColors utility palette.
 * Source: https://gs.statcounter.com/browser-market-share/all/worldwide/2025
 */
const browserSlicesNoColor: PieSlice[] = [
  { label: 'Chrome', value: 65.8 },
  { label: 'Safari', value: 18.2 },
  { label: 'Edge', value: 5.0 },
  { label: 'Firefox', value: 2.7 },
  { label: 'Samsung Internet', value: 2.5 },
  { label: 'Opera', value: 2.2 },
  { label: 'Brave', value: 1.5 },
  { label: 'Others', value: 2.1 },
]

const fields = ref<TableField[]>([
  {
    key: "id",
    label: "ID",
    sortable: true
  },
  {
    key: "fruit_employee",
    fields: [
      {
        key: "fruit",
        label: "Fruit",
        sortable: true
      },
      {
        key: "employee",
        label: "Employee",
        sortable: true
      }
    ]
  },
  {
    key: "lastDelivered",
    label: "Last Delivered",
    sortable: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "createdDate",
    label: "Created Date",
    hidden: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "actions",
    label: "Actions"
  }
])

const fields_simple = ref<TableField[]>([
  {
    key: "id",
    label: "ID",
    sortable: true,
    header: true
  },
  {
    key: "fruit",
    label: "Fruit",
    sortable: true
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    align: "right"
  },
  {
    key: "pricePerPound",
    label: "Price Per Pound",
    sortable: true,
    align: "right"
  },
  {
    key: "lastDelivered",
    label: "Last delivered",
    sortable: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "createdDate",
    label: "Created date",
    hidden: true,
    format: (date: Date) => date.toLocaleDateString()
  },
  {
    key: "actions",
    label: "Actions"
  }
])

const items_simple = ref([
  {
    id: 1,
    fruit: "Apple",
    employee: "Jacobim Mugatu",
    amount: "32",
    pricePerPound: "$1.42",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("02/23/2009"),
  },
  {
    id: 2,
    fruit: "Banana",
    pricePerPound: "$0.99",
    amount: "4",
    employee: "Maury Ballstein",
    lastDelivered: new Date("10/01/2020"),
    createdDate: new Date("05/13/2010"),
  },
  {
    id: 3,
    fruit: "Cantaloupe",
    pricePerPound: "$42.68",
    amount: "18",
    employee: "Derek Zoolander",
    lastDelivered: new Date("12/01/2020"),
    createdDate: new Date("01/13/2012"),
  },
  {
    id: 4,
    fruit: "Durian",
    pricePerPound: "$32.98",
    amount: "100",
    employee: "Hansel MacDonald",
    lastDelivered: new Date("02/01/2021"),
    createdDate: new Date("12/09/2013"),
  },
  {
    id: 5,
    fruit: "Elderberry",
    pricePerPound: "$2.93",
    amount: "37",
    employee: "Matilda Jeffries",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("04/10/2017"),
  }
])

interface AdditionalData {
  store: string;
  aisle: string;
  price: string;
}

const items = ref<TableItem[]>([
  {
    id: 1,
    fruit: "Apple",
    employee: "Jacobim Mugatu",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("02/23/2009"),
    additionalData: {
      store: "Giant Eagle",
      aisle: "13",
      price: "$1.00"
    }
  },
  {
    id: 2,
    fruit: "Banana",
    employee: "Maury Ballstein",
    lastDelivered: new Date("10/01/2020"),
    createdDate: new Date("05/13/2010"),
    additionalData: {
      store: "Aldi",
      aisle: "10",
      price: "$1.04"
    }
  },
  {
    id: 3,
    fruit: "Cantaloupe",
    employee: "Derek Zoolander",
    lastDelivered: new Date("12/01/2020"),
    createdDate: new Date("01/13/2012"),
    additionalData: {
      store: "WalMart",
      aisle: "1",
      price: "$0.99"
    }
  },
  {
    id: 4,
    fruit: "Durian",
    employee: "Hansel MacDonald",
    lastDelivered: new Date("02/01/2021"),
    createdDate: new Date("12/09/2013"),
    additionalData: {
      store: "Sam's Club",
      aisle: "3",
      price: "$1.23"
    }
  },
  {
    id: 5,
    fruit: "Elderberry",
    employee: "Matilda Jeffries",
    lastDelivered: new Date("01/01/2019"),
    createdDate: new Date("04/10/2017"),
    additionalData: {
      store: "Foodland",
      aisle: "5",
      price: "$2.00"
    }
  }
])

const edit = (item: TableItem) => {
  console.log(item)
}

const title = ref('Chart title')

const entries = ref([
  { id: 1, title: "Item 1", url: "https://designsystem.sei.cmu.edu", count: 100000 },
  { id: 2, title: "Item 2", url: "https://designsystem.sei.cmu.edu", count: 80000 },
  { id: 3, title: "Item 3", url: "https://designsystem.sei.cmu.edu", count: 4000 },
  { id: 4, title: "Item 4", url: "https://designsystem.sei.cmu.edu", count: 320 },
  { id: 5, title: "Item 5", url: "https://designsystem.sei.cmu.edu", count: 20 },
])

const viewAllUrl = ref('https://designsystem.sei.cmu.edu')

defineOptions({
  name: 'DataVisualizationPage'
})

definePage({
  meta: {
    title: 'Data Visualization'
  }
})

useHead({
  title: 'Data Visualization'
})
</script>
