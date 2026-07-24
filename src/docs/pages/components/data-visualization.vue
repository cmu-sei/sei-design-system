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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            animate
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Vertical)"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Horizontal)"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            show-tooltip
            title="Browser Market Share - Desktop, 2025 (Long Labels)"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Vertical Grouped (Years as Series)"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="stacked"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Vertical Stacked"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            orientation="horizontal"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Horizontal Grouped"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            orientation="horizontal"
            mode="stacked"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Horizontal Stacked"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            :aspect-ratio="16 / 9"
            show-tooltip
            title="Browser Market Share 2025 - 16:9 Aspect Ratio"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            show-tooltip
            title="Browser Market Share 2025 - Custom Color"
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
            :value-format="formatPercent"
            :tooltip-value-format="formatPercent"
            mode="grouped"
            show-tooltip
            show-legend
            title="Browser Market Share by Year - Per-Series Brand Colors"
          />
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <div class="prose prose-blue dark:prose-invert prose-headings:max-w-prose prose-p:max-w-4xl max-w-none p-4 md:p-8">
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
          palette with clear low-to-high contrast in both light and dark themes.
        </p>

        <h3>GitHub-style Contributions Graph: Default Palette</h3>
        <p>
          This synthetic dataset spans one year of contribution-style activity. Weekends are set to
          <code>0</code>, weekdays carry most of the volume, and month labels are anchored to the first day of
          each month.
        </p>

        <div class="not-prose mt-6 overflow-x-auto">
          <SdsHeatmapChart
            :data="baselineHeatmap"
            :x-tick-values="monthTickValues"
            :x-tick-formatter="xTickFormatter"
            :y-tick-values="weekdayShort"
            :y-tick-formatter="yTickFormatter"
            square-cells
            show-tooltip
            show-legend
            title="Daily Contributions by Month and Weekday"
            class="min-w-5xl"
          >
            <template #tooltip="{ data }">
              <p
                v-if="data"
                class="text-xs whitespace-nowrap font-semibold"
              >
                {{ formatContributionTooltip(data) }}
              </p>
            </template>
          </SdsHeatmapChart>
        </div>

        <h3 class="mt-10">
          Contributions: Custom Color Bins
        </h3>
        <p>
          Use the <code>colors</code> prop to override bins with separate light and dark variants. This is
          handy when your product brand colors differ from default chart tokens.
        </p>

        <div class="not-prose mt-6 overflow-x-auto">
          <SdsHeatmapChart
            :data="baselineHeatmap"
            :colors="customBins"
            :x-tick-values="monthTickValues"
            :x-tick-formatter="xTickFormatter"
            :y-tick-values="weekdayShort"
            :y-tick-formatter="yTickFormatter"
            square-cells
            show-tooltip
            show-legend
            title="Daily Contributions with Custom Bins"
            class="min-w-5xl"
          >
            <template #tooltip="{ data }">
              <p
                v-if="data"
                class="text-xs whitespace-nowrap font-semibold"
              >
                {{ formatContributionTooltip(data) }}
              </p>
            </template>
          </SdsHeatmapChart>
        </div>

        <h3 class="mt-10">
          Contributions: Custom Legend Slot
        </h3>
        <p>
          Use the <code>#legend</code> slot to fully control layout while keeping built-in bidirectional
          hover behavior.
        </p>

        <div class="not-prose mt-6 overflow-x-auto">
          <SdsHeatmapChart
            :data="baselineHeatmap"
            :colors="customBins"
            :x-tick-values="monthTickValues"
            :x-tick-formatter="xTickFormatter"
            :y-tick-values="weekdayShort"
            :y-tick-formatter="yTickFormatter"
            square-cells
            show-tooltip
            show-legend
            title="Daily Contributions with Custom Legend Slot"
            class="min-w-5xl"
          >
            <template #tooltip="{ data }">
              <p
                v-if="data"
                class="text-xs whitespace-nowrap font-semibold"
              >
                {{ formatContributionTooltip(data) }}
              </p>
            </template>
            <template #legend="{ items: legendItems, hoveredIndex, updateHoveredIndex }">
              <div class="flex flex-col items-center w-full select-none">
                <div class="flex flex-row items-end justify-center gap-1">
                  <template
                    v-for="(item, i) in legendItems"
                    :key="`custom-legend-bin-${i}`"
                  >
                    <button
                      type="button"
                      class="h-4 w-10 p-0 transition-opacity border border-gray-300 dark:border-gray-600"
                      :class="hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
                      :style="{ backgroundColor: item.color }"
                      :aria-label="`Range ${item.label}`"
                      @mouseenter="updateHoveredIndex(i)"
                      @mouseleave="updateHoveredIndex(null)"
                    />
                  </template>
                </div>
                <div class="flex flex-row items-start justify-center gap-1 mt-1">
                  <template
                    v-for="(item, i) in legendItems"
                    :key="`custom-legend-label-${i}`"
                  >
                    <span class="w-10 text-center text-[11px] text-gray-900 dark:text-gray-100">
                      >= {{ getRangeStart(item) }}
                    </span>
                  </template>
                </div>
              </div>
            </template>
          </SdsHeatmapChart>
        </div>

        <h3 class="mt-10">
          NYC Ride-Share Pickups by Hour and Day
        </h3>
        <p>
          This example uses real NYC TLC trip records from the
          <SdsLink
            :external="true"
            kind="primary"
            type="inline"
            variant="blue"
            href="https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"
          >
            NYC TLC open trip dataset
          </SdsLink>. Values are aggregated from the NYC Open Data table
          <code>u253-aew4</code> (2023 High Volume FHV Trip Data) for <code>2023-02</code>, grouped by
          pickup hour and weekday.
        </p>

        <div class="not-prose mt-6 overflow-x-auto">
          <SdsHeatmapChart
            :data="taxiPickupsHeatmap"
            :colors="taxiPickupsBins"
            :x-tick-values="hourTickValues"
            :x-tick-formatter="hourTickFormatter"
            :y-tick-values="taxiWeekdayShort"
            :y-tick-formatter="taxiYTickFormatter"
            :square-cells="false"
            show-tooltip
            show-legend
            title="NYC Ride-Share Pickups by Hour and Day"
            class="min-w-5xl"
          >
            <template #tooltip="{ data }">
              <p
                v-if="data"
                class="text-xs whitespace-nowrap font-semibold"
              >
                {{ formatTaxiPickupTooltip(data) }}
              </p>
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
              <table class="w-full text-sm border-collapse text-gray-900 dark:text-gray-100">
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
                        class="inline-block h-3 w-3 rounded-md shrink-0"
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
        <h3 class="mt-10">
          Custom tooltip slot
        </h3>
        <p>
          Override the <code>#tooltip</code> slot to customize what appears on hover. The slot receives
          the hovered slice's <code>data</code> object.
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
            title="Browser Market Share - Custom Tooltip"
          >
            <template #tooltip="{ data }">
              <div class="flex items-center gap-2">
                <span
                  class="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  :style="{ backgroundColor: resolveItemColor(data?.color, isDark) }"
                />
                <span class="font-semibold">{{ data?.label }}</span>
                <span class="text-gray-600">{{ data?.value }}%</span>
              </div>
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
import type { HeatmapCell, HeatmapColors } from '@/composables/useHeatmapChart'
import type { PieSlice } from '@/composables/usePieChart'
import type { TableField, TableItem } from '../../../components/Table/Table.vue';
import SdsBarChart from '@/components/BarChart/BarChart.vue'
import SdsHeatmapChart from '@/components/HeatmapChart/HeatmapChart.vue'
import SdsLink from '@/components/Link/Link.vue';
import SdsPieChart from '@/components/PieChart/PieChart.vue';
import { useDarkMode } from '@/composables/useDarkMode';
import { formatPercent, resolveItemColor, sortByProperty } from '@/helpers/charts'
import { heatmapColors, heatmapColorsDark } from '@/helpers/charts/colors'

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
 * Heatmap Chart(s)
 */

interface ContributionCell extends HeatmapCell {
	dateLabel: string
	weekdayFull: string
}

interface ContributionDataset {
	cells: ContributionCell[]
	monthTickValues: string[]
	monthLabelByWeek: Record<string, string>
}

interface TaxiPickupCell extends HeatmapCell {
	hourLabel: string
	weekdayFull: string
}

interface LegendBinItem {
	label: string
	range?: [number, number]
}

const demoYear = 2025
const weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weekdayFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const taxiWeekdayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const taxiWeekdayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const taxiHourKeys = Array.from({ length: 24 }, (_, hour) => `H${String(hour).padStart(2, '0')}`)

function startOfWeekSunday(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfWeekSaturday(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + (6 - d.getDay()))
  d.setHours(0, 0, 0, 0)
  return d
}

function formatTooltipDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function getWeekKey(index: number): string {
  return `W${String(index + 1).padStart(2, '0')}`
}

function getContributionValue(date: Date, yearStart: Date): number {
  const weekday = date.getDay()
  if (weekday === 0 || weekday === 6) return 0

  const dayOfYear = Math.floor((date.getTime() - yearStart.getTime()) / (24 * 60 * 60 * 1000)) + 1
  const monthIndex = date.getMonth()
  const seasonality = Math.sin((monthIndex / 12) * Math.PI * 2 - 0.8) + 1.2
  const weekdayWeight = [0, 0.95, 1.08, 1.22, 1.14, 1, 0][weekday] ?? 1
  const trend = dayOfYear / 365
  const burst = dayOfYear % 19 === 0 ? -12 : 0

  return Math.max(0, Math.round(5 + seasonality * 11 + weekdayWeight * 12 + trend * 6 + burst))
}

function buildContributionDataset(year: number): ContributionDataset {
  const yearStart = new Date(year, 0, 1)
  const yearEnd = new Date(year, 11, 31)
  const gridStart = startOfWeekSunday(yearStart)
  const gridEnd = endOfWeekSaturday(yearEnd)

  const cells: ContributionCell[] = []
  const monthTickValues: string[] = []
  const monthLabelByWeek: Record<string, string> = {}

  let weekIndex = 0
  for (let weekStart = new Date(gridStart); weekStart <= gridEnd; weekStart.setDate(weekStart.getDate() + 7)) {
    const weekKey = getWeekKey(weekIndex)
    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + dayIndex)

      const inYear = date.getFullYear() === year
      if (inYear && date.getDate() === 1) {
        monthTickValues.push(weekKey)
        monthLabelByWeek[weekKey] = monthLabels[date.getMonth()] ?? ''
      }

      cells.push({
        x: weekKey,
        y: weekdayShort[dayIndex] ?? 'Sun',
        value: inYear ? getContributionValue(date, yearStart) : 0,
        dateLabel: formatTooltipDate(date),
        weekdayFull: weekdayFull[dayIndex] ?? 'Sunday'
      })
    }
    weekIndex += 1
  }

  return { cells, monthTickValues, monthLabelByWeek }
}

function formatHourLabel(hour: number): string {
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12
  return `${normalizedHour}:00 ${suffix}`
}

const taxiPickupsByDayHour: Record<string, number[]> = {
  Mon: [
    70543, 40644, 27867, 22892, 29513, 42540, 71105, 106138, 129753, 111151, 96493, 91438,
    93572, 97182, 106882, 110252, 113306, 125956, 134117, 123662, 113840, 107291, 96915,
    77738
  ],
  Tue: [
    51085, 27922, 19257, 16924, 24463, 40877, 75202, 120084, 150780, 128400, 104595, 96331,
    96530, 100883, 111484, 116738, 123546, 142042, 153740, 144662, 135578, 128582, 119990,
    95559
  ],
  Wed: [
    60553, 34396, 22475, 18922, 25887, 41196, 73467, 118935, 149330, 127547, 103596, 95445,
    96557, 97428, 112647, 122064, 126028, 142178, 152460, 143836, 134547, 130878, 120068,
    96137
  ],
  Thu: [
    61596, 35868, 24016, 20662, 28281, 42957, 76638, 123253, 150338, 126613, 105522, 99363,
    100603, 105119, 118755, 129294, 134656, 150818, 163258, 156809, 144673, 140861, 135843,
    114820
  ],
  Fri: [
    80609, 51787, 35413, 28169, 33432, 45512, 76487, 122314, 148040, 131344, 113509, 109038,
    115446, 126602, 134762, 140197, 150725, 175077, 196472, 205223, 188444, 177906, 185364,
    183246
  ],
  Sat: [
    157361, 121231, 92575, 69131, 52644, 41522, 52871, 66786, 86336, 106639, 119921, 129927,
    136351, 140859, 140692, 142199, 149527, 167530, 192005, 201746, 186515, 178861, 190049,
    192768
  ],
  Sun: [
    171340, 138066, 106739, 80775, 60858, 42710, 48657, 56534, 66360, 84715, 105393, 116021,
    120204, 123957, 125732, 125045, 128832, 137898, 148851, 130575, 117127, 119998, 123186,
    106997
  ]
}

function buildTaxiPickupDatasetFromRealData(): TaxiPickupCell[] {
  const cells: TaxiPickupCell[] = []

  for (let dayIndex = 0; dayIndex < taxiWeekdayShort.length; dayIndex += 1) {
    const dayKey = taxiWeekdayShort[dayIndex] ?? 'Mon'
    const dayValues = taxiPickupsByDayHour[dayKey] ?? []
    for (let hour = 0; hour < 24; hour += 1) {
      cells.push({
        x: taxiHourKeys[hour] ?? 'H00',
        y: dayKey,
        value: dayValues[hour] ?? 0,
        hourLabel: formatHourLabel(hour),
        weekdayFull: taxiWeekdayFull[dayIndex] ?? 'Monday'
      })
    }
  }

  return cells
}

const contributionDataset = buildContributionDataset(demoYear)
const baselineHeatmap: ContributionCell[] = contributionDataset.cells
const monthTickValues = contributionDataset.monthTickValues
const monthLabelByWeek = contributionDataset.monthLabelByWeek

const xTickFormatter = (value: AxisDomain): string => monthLabelByWeek[String(value)] ?? ''
const yTickFormatter = (value: AxisDomain): string => String(value)
const hourTickValues = taxiHourKeys.filter((_, index) => index % 2 === 0)
const hourTickFormatter = (value: AxisDomain): string => `${String(value).slice(1)}:00`
const taxiYTickFormatter = (value: AxisDomain): string => String(value)

const customBins: HeatmapColors = {
  light: ['#fff7ec', '#fee8c8', '#fdbb84', '#fc8d59', '#d7301f'],
  dark: ['#4a2a17', '#72401f', '#a45a22', '#d7782e', '#f39b54']
}

const taxiPickupsHeatmap = buildTaxiPickupDatasetFromRealData()
const taxiPickupsBins: HeatmapColors = {
  light: heatmapColors.slice(0, 5),
  dark: heatmapColorsDark.slice(0, 5),
}

function formatRangeValue(value: number): string {
  if (Number.isInteger(value)) return String(value)
  const abs = Math.abs(value)
  const fractionDigits = abs >= 10 ? 1 : 2
  return value
    .toFixed(fractionDigits)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1')
}

function getRangeStart(item: LegendBinItem): string {
  return item.range ? formatRangeValue(item.range[0]) : item.label.split(' - ')[0] ?? item.label
}

function formatContributionTooltip(data: HeatmapCell | null | undefined): string {
  if (!data) return ''
  const contributionData = data as ContributionCell
  return `${contributionData.value} contributions on ${contributionData.weekdayFull}, ${contributionData.dateLabel}`
}

function formatTaxiPickupTooltip(data: HeatmapCell | null | undefined): string {
  if (!data) return ''
  const taxiData = data as TaxiPickupCell
  return `${taxiData.value.toLocaleString()} pickups on ${taxiData.weekdayFull} at ${taxiData.hourLabel} (Feb 2023)`
}

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

const isDark = useDarkMode()

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
  { id: 1, title: "Item 1", url: "https://designsystem.sei.cmu.edu", count: 100 },
  { id: 2, title: "Item 2", url: "https://designsystem.sei.cmu.edu", count: 80 },
  { id: 3, title: "Item 3", url: "https://designsystem.sei.cmu.edu", count: 40 },
  { id: 4, title: "Item 4", url: "https://designsystem.sei.cmu.edu", count: 32 },
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
