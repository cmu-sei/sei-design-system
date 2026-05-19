<template>
  <sds-section
    id="link"
    type="accented"
    class="my-6"
  >
    <template #title>
      <h2 class="font-semibold uppercase">
        Link
      </h2>
    </template>
    <ul>
      <li>
        <a
          href="#"
          class="link link-primary"
        >Primary Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-secondary"
        >Secondary Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-tertiary"
        >Tertiary Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-success"
        >Success Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-info"
        >Info Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-warning"
        >Warning Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-danger"
        >Danger Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-light"
        >Light Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-dark"
        >Dark Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-primary link-cta"
        >Primary CTA Link</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-primary link-cta link-cta-right"
        >Primary CTA Link (right)</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-primary link-cta link-cta-left"
        >Primary CTA Link (left)</a>
      </li>
      <li>
        <a
          href="#"
          class="link link-primary link-cta link-cta-up"
        >Primary CTA Link (up)</a>
      </li>
    </ul>
  </sds-section>

  <!-- Tabs -->
  <sds-section
    id="tab"
    type="accented"
    class="my-6"
  >
    <template #title>
      <h2 class="font-semibold uppercase">
        Tab
      </h2>
    </template>
    <template #subtitle>
      <p>Pre-defined tab items via a <code>.tab</code> class.</p>
      <p class="my-2">
        Wrap in <code>.tab-group</code> for easy grouping.
      </p>
      <p class="my-2">
        Add <code>.gap-*</code> to <code>.tab-group</code> to add a gap
        between items.
      </p>
      <p class="my-2">
        Variants include: <code>.tab-blue</code> and <code>.tab-red</code>
      </p>
      <p class="mt-2">
        Types include: <code>.tab-underline</code>,
        <code>.tab-pill</code>, <code>.tab-block</code>.
      </p>
      <p class="mt-2">
        Add <code>.active</code> class to create an active look.
      </p>
      <p class="mt-2">
        Add a <code>disabled</code> attribute or <code>.disabled</code> class
        to give a button a disabled look.
      </p>
    </template>
    <section>
      <div class="mb-8 gap-1 tab-group">
        <button class="tab tab-folder tab-red active">
          Tab Item 1
        </button>
        <button class="tab tab-folder tab-red">
          Tab Item 2
        </button>
        <button
          class="tab tab-folder tab-red"
          disabled
        >
          Tab Item 3
        </button>
        <button class="tab tab-folder tab-red">
          Tab Item 4
        </button>
      </div>

      <div class="gap-2 mb-8 tab-group">
        <button class="tab tab-underline tab-red active">
          Tab Item 1
        </button>
        <button class="tab tab-underline tab-red">
          Tab Item 2
        </button>
        <button
          class="tab tab-underline tab-red"
          disabled
        >
          Tab Item 3
        </button>
        <button class="tab tab-underline tab-red">
          Tab Item 4
        </button>
      </div>

      <div class="gap-2 py-1 mb-8 tab-group">
        <button class="tab tab-pill tab-blue active">
          Tab Item 1
        </button>
        <button class="tab tab-pill tab-blue">
          Tab Item 2
        </button>
        <button
          class="tab tab-pill tab-blue"
          disabled
        >
          Tab Item 3
        </button>
        <button class="tab tab-pill tab-blue">
          Tab Item 4
        </button>
      </div>

      <div class="gap-2 py-1 mb-8 tab-group">
        <button class="tab tab-pill tab-red active">
          Tab Item 1
        </button>
        <button class="tab tab-pill tab-red">
          Tab Item 2
        </button>
        <button
          class="tab tab-pill tab-red"
          disabled
        >
          Tab Item 3
        </button>
        <button class="tab tab-pill tab-red">
          Tab Item 4
        </button>
      </div>

      <div class="mb-8 tab-group">
        <button class="tab tab-blue tab-block active">
          Tab Item 1
        </button>
        <button class="tab tab-blue tab-block">
          Tab Item 2
        </button>
        <button
          class="tab tab-blue tab-block"
          disabled
        >
          Tab Item 3
        </button>
        <button class="tab tab-blue tab-block">
          Tab Item 4
        </button>
      </div>
    </section>
  </sds-section>

  <!-- Buttons -->
  <sds-section
    id="button"
    type="accented"
    class="my-6"
  >
    <template #title>
      <h2 class="font-semibold uppercase">
        Button
      </h2>
    </template>
    <template #subtitle>
      <p>Pre-defined buttons via a <code>.btn</code> class.</p>
      <p class="my-2">
        Wrap in <code>.btn-group</code> for easy grouping.
      </p>
      <p class="mt-2">
        Variants include: <code>.btn-secondary</code>, <code>.btn-white</code>,
        <code>.btn-black</code>, <code>.btn-blue</code>,
        <code>.btn-green</code>, <code>.btn-indigo</code>,
        <code>.btn-orange</code>,
        <code>.btn-purple</code>, <code>.btn-red</code>,
        <code>.btn-teal</code>,
        <code>.btn-yellow</code>
      </p>
      <p class="mt-2">
        Add a <code>.btn-outline</code> class to create an ouline type.
      </p>
      <p class="mt-2">
        Add a <code>.btn-block</code> class to create a block button with 100%
        width.
      </p>
      <p class="mt-2">
        Add a <code>disabled</code> attribute or <code>.disabled</code> class
        to give a button a disabled look.
      </p>
      <p class="mt-2">
        Add a <code>.active</code> class to give a button an active look.
      </p>
    </template>

    <section>
      <h3>SEINet examples for btn-group</h3>
      <div class="mb-4">
        <div class="flex gap-2">
          <div
            class="inline-block"
            data-id="sds-action-dropdown"
          >
            <div class="inline-block w-full">
              <button
                id="v-0-0-11"
                type="button"
                class="space-x action-btn action-btn-secondary action-btn-gray action-btn-sm"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Wednesday May 20, 2026<svg
                  viewBox="0 0 640 640"
                  aria-hidden="true"
                  role="img"
                  width="1.2em"
                  height="1.2em"
                  class="inline-block self-center w-4 h-4"
                ><path
                  fill="currentColor"
                  d="M297.4 470.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 402.7L150.6 233.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                /></svg>
              </button>
            </div><!--teleport start--><!--teleport end-->
          </div><div class="ml-auto btn-group">
            <button
              type="button"
              class="action-btn action-btn-secondary action-btn-sm"
              title="Previous Day"
            >
              <span>Prev</span>
            </button><button
              type="button"
              class="action-btn action-btn-secondary action-btn-sm"
              title="Next Day"
            >
              <span>Next</span>
            </button>
          </div>
        </div>

        <p>Second Version:</p>

        <div class="w-full btn-group">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
          >
            <span>Prev</span>
          </button><div
            class="inline-block w-full"
            data-id="sds-dropdown"
          >
            <div class="inline-block w-full">
              <button
                class="btn-sm btn btn-secondary w-full rounded-none"
                type="button"
              >
                Wednesday May 20, 2026
              </button>
            </div><!--teleport start--><!--teleport end-->
          </div><button
            type="button"
            class="btn btn-secondary btn-sm"
          >
            <span>Next</span>
          </button>
        </div>

        <p>Third Version:</p>

        <div class="w-full btn-group">
          <button
            type="button"
            class="action-btn action-btn-secondary action-btn-sm action-btn-blue"
          >
            <span>Prev</span>
          </button><div
            class="inline-block w-full"
            data-id="sds-dropdown"
          >
            <div class="inline-block w-full">
              <button
                class="action-btn-sm action-btn action-btn-secondary action-btn-blue w-full rounded-none items-center justify-center"
                type="button"
              >
                Wednesday May 20, 2026
              </button>
            </div><!--teleport start--><!--teleport end-->
          </div><button
            type="button"
            class="action-btn action-btn-secondary action-btn-sm action-btn-blue"
          >
            <span>Next</span>
          </button>
        </div>
      </div>
      <h3>Button: Without Variant</h3>
      <div class="mb-4 btn-group">
        <button class="btn">
          No Variant
        </button>
      </div>

      <h3 class="mb-4 text-lg">
        Button Group: Single Button
      </h3>
      <div class="mb-4 btn-group">
        <button class="btn btn-secondary">
          Default
        </button>
      </div>

      <h3 class="mb-4 text-lg">
        Button Group: Default Buttons
      </h3>
      <div class="mb-4 btn-group">
        <button class="btn btn-secondary">
          Default
        </button>
        <button class="btn btn-secondary">
          Default
        </button>
        <button class="btn btn-secondary">
          Default
        </button>
        <button class="btn btn-secondary">
          Default
        </button>
      </div>

      <h3 class="mb-4 text-lg">
        Button Group: Outline Buttons
      </h3>
      <div class="mb-4 btn-group">
        <button class="btn btn-secondary btn-outline">
          Default
        </button>
        <button class="btn btn-secondary btn-outline">
          Default
        </button>
        <button class="btn btn-secondary btn-outline">
          Default
        </button>
        <button class="btn btn-secondary btn-outline">
          Default
        </button>
      </div>

      <h3 class="mb-4 text-lg">
        Button Group: Mix-and-match Buttons
      </h3>
      <div class="mb-4 btn-group">
        <button class="btn btn-secondary">
          Default
        </button>
        <button class="btn btn-outline btn-teal">
          Outline Teal
        </button>
        <button class="btn btn-orange">
          Orange
        </button>
        <button class="btn btn-blue">
          Orange
        </button>
        <button class="btn btn-outline btn-red">
          Outline Red
        </button>
      </div>

      <h3 class="mb-4 text-lg">
        Type: Default
      </h3>
      <div class="space-x-2 space-y-2">
        <button class="btn btn-secondary">
          Default
        </button>
        <button class="btn btn-white">
          White
        </button>
        <button class="btn btn-black">
          Black
        </button>
        <button class="btn btn-blue">
          Blue
        </button>
        <button class="btn btn-green">
          Green
        </button>
        <button class="btn btn-indigo">
          Indigo
        </button>
        <button class="btn btn-orange">
          Orange
        </button>
        <button class="btn btn-purple">
          Purple
        </button>
        <button class="btn btn-red">
          Red
        </button>
        <button class="btn btn-teal">
          Teal
        </button>
        <button class="btn btn-yellow">
          Yellow
        </button>
      </div>

      <h3 class="my-4 text-lg">
        Type: Outline
      </h3>
      <div class="space-x-2 space-y-2">
        <button class="btn btn-secondary btn-outline">
          Default
        </button>
        <button class="btn btn-white btn-outline">
          White
        </button>
        <button class="btn btn-black btn-outline">
          Black
        </button>
        <button class="btn btn-blue btn-outline">
          Blue
        </button>
        <button class="btn btn-green btn-outline">
          Green
        </button>
        <button class="btn btn-indigo btn-outline">
          Indigo
        </button>
        <button class="btn btn-orange btn-outline">
          Orange
        </button>
        <button class="btn btn-purple btn-outline">
          Purple
        </button>
        <button class="btn btn-red btn-outline">
          Red
        </button>
        <button class="btn btn-teal btn-outline">
          Teal
        </button>
        <button class="btn btn-yellow btn-outline">
          Yellow
        </button>
      </div>

      <h3 class="my-4 text-lg">
        Type: Default, Disabled attriblte
      </h3>
      <div class="space-x-2 space-y-2">
        <button
          disabled
          class="btn btn-secondary"
        >
          Default
        </button>
        <button
          disabled
          class="btn btn-white"
        >
          White
        </button>
        <button
          disabled
          class="btn btn-black"
        >
          Black
        </button>
        <button
          disabled
          class="btn btn-blue"
        >
          Blue
        </button>
        <button
          disabled
          class="btn btn-green"
        >
          Green
        </button>
        <button
          disabled
          class="btn btn-indigo"
        >
          Indigo
        </button>
        <button
          disabled
          class="btn btn-orange"
        >
          Orange
        </button>
        <button
          disabled
          class="btn btn-purple"
        >
          Purple
        </button>
        <button
          disabled
          class="btn btn-red"
        >
          Red
        </button>
        <button
          disabled
          class="btn btn-teal"
        >
          Teal
        </button>
        <button
          disabled
          class="btn btn-yellow"
        >
          Yellow
        </button>
      </div>

      <h3 class="my-4 text-lg">
        Anchor element, Type: Default, Disabled class, Tabindex -1
      </h3>
      <div class="space-x-2 space-y-2">
        <a
          href="#"
          tabindex="-1"
          class="btn btn-secondary disabled"
        >Default</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-white disabled"
        >White</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-black disabled"
        >Black</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-blue disabled"
        >Blue</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-green disabled"
        >Green</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-indigo disabled"
        >Indigo</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-orange disabled"
        >Orange</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-purple disabled"
        >Purple</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-red disabled"
        >Red</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-teal disabled"
        >Teal</a>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-yellow disabled"
        >Yellow</a>
      </div>

      <h3 class="my-4 text-lg">
        Type: Default, Block
      </h3>
      <div class="space-y-2">
        <button class="btn btn-secondary btn-block">
          Default
        </button>
        <button class="btn btn-white btn-block">
          White
        </button>
        <button class="btn btn-black btn-block">
          Black
        </button>
        <button class="btn btn-blue btn-block">
          Blue
        </button>
        <button class="btn btn-green btn-block">
          Green
        </button>
        <button class="btn btn-indigo btn-block">
          Indigo
        </button>
        <button class="btn btn-orange btn-block">
          Orange
        </button>
        <button class="btn btn-purple btn-block">
          Purple
        </button>
        <button class="btn btn-red btn-block">
          Red
        </button>
        <button class="btn btn-teal btn-block">
          Teal
        </button>
        <button class="btn btn-yellow btn-block">
          Yellow
        </button>
      </div>
    </section>
  </sds-section>

  <!-- Form control -->
  <sds-section
    id="form-control"
    type="accented"
    class="my-6"
  >
    <template #title>
      <h2 class="font-semibold uppercase">
        Form Control
      </h2>
    </template>
    <template #subtitle>
      <p>
        Pre-defined form controls for input, textarea, and select elements via
        a <code>.form-control</code> class.
      </p>
      <p class="mt-2">
        Add a <code>disabled</code> attribute or <code>.disabled</code> class
        for a disabled look.
      </p>
      <p class="mt-2">
        Add a <code>readonly</code> attribute for a button a readonly look.
      </p>
    </template>

    <section>
      <div class="mb-4 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Placeholder text"
        >
        <input
          type="text"
          class="form-control"
          placeholder="Placeholder text"
        >
        <button class="btn btn-primary">
          Button
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Placeholder text"
        >
        <button class="btn btn-danger">
          Button
        </button>
      </div>
      <input
        type="text"
        class="form-control"
        placeholder="Placeholder text"
      >
      <select class="my-4 form-control">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <select
        multiple
        class="my-4 form-control"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <textarea
        class="form-control"
        rows="3"
        placeholder="Placeholder text"
      />

      <h3 class="my-4 text-lg">
        Disabled
      </h3>
      <input
        type="text"
        class="form-control"
        placeholder="Placeholder text"
        disabled
      >
      <select
        disabled
        class="my-4 form-control"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <select
        multiple
        disabled
        class="my-4 form-control"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <textarea
        disabled
        class="form-control"
        rows="3"
        placeholder="Placeholder text"
      />

      <h3 class="my-4 text-lg">
        Read only
      </h3>
      <input
        type="text"
        class="form-control"
        placeholder="Placeholder text"
        readonly
      >
      <select
        readonly
        class="my-4 form-control"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <select
        multiple
        readonly
        class="my-4 form-control"
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <textarea
        readonly
        class="form-control"
        rows="3"
        placeholder="Placeholder text"
      />
    </section>
  </sds-section>
</template>

<script setup lang="ts">
defineOptions({
  name: "CssComponentsSection"
})
</script>
