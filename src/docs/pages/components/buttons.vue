<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Action Button
      </h2>
      <div class="flex gap-2 items-center">
        <SdsActionButton
          kind="ghost"
          variant="gray"
          size="md"
          :active="false"
          :block="false"
          :disabled="false"
          :pending="false"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            />
          </svg>
          <span>Update photo</span>
        </SdsActionButton>
        <SdsActionButton
          kind="ghost"
          variant="gray"
          size="md"
          :active="false"
          :block="false"
          :disabled="false"
          :pending="true"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
            />
          </svg>
          <span>Update photo</span>
        </SdsActionButton>
        <SdsActionButton
          kind="secondary"
          variant="gray"
          size="lg"
          :active="false"
          :block="true"
          :disabled="false"
          :pending="false"
        >
          <SdsAvatar
            shape="circle"
            variant="gray"
            size="xs"
            src="https://images.unsplash.com/photo-1548142542-c53707f8b05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80"
          />
          <span>Ali Alvarez</span>
        </SdsActionButton>
        <SdsActionButton
          kind="secondary"
          variant="gray"
          size="lg"
          :active="false"
          :block="true"
          :disabled="false"
          :pending="true"
        >
          <SdsAvatar
            shape="circle"
            variant="gray"
            size="xs"
            src="https://images.unsplash.com/photo-1548142542-c53707f8b05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80"
          />
          <span>Ali Alvarez</span>
        </SdsActionButton>
        <SdsActionButton>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="secondary"
          active
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="ghost"
          disabled
        >
          Action Button
        </SdsActionButton>
      </div>
      <div class="flex gap-2 items-center">
        <SdsActionButton pending>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="secondary"
          active
          pending
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="ghost"
          disabled
          pending
        >
          Action Button
        </SdsActionButton>
      </div>
      <div class="flex gap-2 items-center">
        <SdsActionButton
          kind="ghost"
          variant="gray"
          size="md"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            />
          </svg>
          <span class="sr-only">Edit</span>
        </SdsActionButton>
        <SdsActionButton
          kind="ghost"
          variant="gray"
          size="md"
          pending
        >
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <path
              fill="currentColor"
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            />
          </svg>
          <span class="sr-only">Edit</span>
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="xs"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="xs"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="sm"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="sm"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="md"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="md"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="lg"
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="lg"
        >
          Action Button
        </SdsActionButton>
      </div>
      <div class="flex gap-2 items-center">
        <SdsActionButton
          kind="primary"
          size="xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          <span>Action Button</span>
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
      </div>
      <div class="space-y-2">
        <SdsActionButton
          kind="primary"
          size="lg"
          block
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="lg"
          block
        >
          Action Button
        </SdsActionButton>
        <SdsActionButton
          kind="primary"
          pending
          size="lg"
          block
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
            aria-hidden="true"
            class="w-3 h-3 inline-block"
          >
            <path
              fill="currentColor"
              d="M413.8 447.1L256 448v31.99c0 17.71-14.2 32.01-31.9 32.01c-17.67 0-32.1-14.32-32.1-31.99v-31.99l-158.9-.01c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.003l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31H348.2l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"
            />
          </svg>
          Action Button
        </SdsActionButton>
      </div>
      <h2 class="text-xl">
        Expand Collapse
      </h2>
      <div>
        <p v-if="expandCollapseModel">
          Expanded
        </p>
        <SdsExpandCollapse
          v-model="expandCollapseModel"
          kind="secondary"
          variant="red"
        />
        <SdsExpandCollapse
          v-model="expandCollapseModel"
          expand-label="Custom Expand Label"
          collapse-label="Custom Collapse Label"
        />
      </div>
      <h2 class="text-xl">
        Button
      </h2>
      <div class="space-x-2">
        <SdsButton
          kind="primary"
          size="xs"
          :pending="pending"
          @click="pending = !pending"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="primary"
          variant="red"
          size="sm"
          :pending="pending"
          @click="pending = !pending"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          size="md"
          :pending="pending"
          @click="pending = !pending"
        >
          Button
        </SdsButton>
      </div>
      <div>
        <SdsButton
          kind="secondary"
          size="lg"
          :pending="pending"
          @click="pending = !pending"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          active
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          disabled
        >
          Button
        </SdsButton>
      </div>
      <div class="space-x-2">
        <SdsButton
          kind="primary"
          size="xs"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="primary"
          size="xs"
          pending
        >
          Button
        </SdsButton>
        <SdsButton
          kind="primary"
          variant="red"
          size="sm"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="primary"
          variant="red"
          size="sm"
          pending
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          size="md"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          size="md"
          pending
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          size="lg"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          size="lg"
          pending
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          pending
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          active
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          disabled
        >
          Button
        </SdsButton>
      </div>
      <div class="space-y-2">
        <SdsButton
          kind="secondary"
          pending
          block
        >
          Button
        </SdsButton>
        <SdsButton
          kind="secondary"
          block
        >
          Button
        </SdsButton>
      </div>
      <h3 class="text-lg">
        Plaid Theme
      </h3>
      <div class="bg-white p-4 flex flex-col gap-2 w-fit">
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="primary"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="secondary"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="tertiary"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="ghost"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            disabled
          >
            Button label
          </SdsButton>
        </div>
      </div>
      <div class="bg-white p-4 flex flex-col gap-2 w-fit">
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="primary"
            variant="blue"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="blue"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="blue"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="secondary"
            variant="blue"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="blue"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="blue"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="tertiary"
            variant="blue"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="blue"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="blue"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="ghost"
            variant="blue"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="blue"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="blue"
            disabled
          >
            Button label
          </SdsButton>
        </div>
      </div>
      <div class="bg-white p-4 flex flex-col gap-2 w-fit">
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="primary"
            variant="red"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="red"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="red"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="secondary"
            variant="red"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="red"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="red"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="tertiary"
            variant="red"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="red"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="red"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="ghost"
            variant="red"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="red"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="red"
            disabled
          >
            Button label
          </SdsButton>
        </div>
      </div>
      <div class="bg-blue-500 p-4 flex flex-col gap-2 w-fit">
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="primary"
            variant="white"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="white"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="primary"
            variant="white"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="secondary"
            variant="white"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="white"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="secondary"
            variant="white"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="tertiary"
            variant="white"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="white"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="tertiary"
            variant="white"
            disabled
          >
            Button label
          </SdsButton>
        </div>
        <div class="flex flex-row space-x-2 sds-theme-plaid">
          <SdsButton
            kind="ghost"
            variant="white"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="white"
            :pending="pending"
            @click="pending = !pending"
          >
            Button label
          </SdsButton>
          <SdsButton
            kind="ghost"
            variant="white"
            disabled
          >
            Button label
          </SdsButton>
        </div>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Action Dropdown
      </h2>
      <div class="space-x-4">
        <sds-action-dropdown
          title="Dropdown"
          kind="primary"
          variant="red"
        >
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
          <sds-dropdown-item
            href="#"
            active
          >
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
              variant="red"
            >
              Sign out
            </sds-dropdown-item>
          </form>
        </sds-action-dropdown>
        <sds-action-dropdown
          title="Dropdown"
          type="dark"
        >
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
          <sds-dropdown-item
            href="#"
            active
          >
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
              variant="red"
            >
              Sign out
            </sds-dropdown-item>
          </form>
        </sds-action-dropdown>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Dropdown
      </h2>
      <div class="space-x-4">
        <sds-dropdown
          title="Dropdown"
        >
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
          <sds-dropdown-item
            href="#"
            active
          >
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
              variant="red"
            >
              Sign out
            </sds-dropdown-item>
            <sds-dropdown-item
              tag="button"
              type="submit"
              variant="red"
              active
            >
              Destructive item
            </sds-dropdown-item>
          </form>
        </sds-dropdown>
        <sds-dropdown
          title="Dropdown"
          type="dark"
        >
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
          <sds-dropdown-item
            href="#"
            active
          >
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
              variant="red"
            >
              Sign out
            </sds-dropdown-item>
          </form>
        </sds-dropdown>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Filter By Dropdown
      </h2>
      <div>
        <sds-filter-by-dropdown
          v-model="filterBy.options"
          :title="filterByBtnText"
          enable-filter
          enable-sort-options
          @update:model-value="filtered"
        />
        <p class="mt-4">
          Selected: {{ filterBy.idsText }}
        </p>
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Floating Action Button
      </h2>
      <div>
        <sds-floating-action-button
          v-model="fab.tabs"
          show-indicator
          @open="fab.open"
          @close="fab.close"
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
        Floating Action Button in bottom right corner.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FilterByDropdownOption } from '../../../components/FilterByDropdown/FilterByDropdown.vue';

const expandCollapseModel = ref(false)

const pending = ref(true)

const filterBy = reactive({
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
  idsText: null as string | null
})

const filterBySelectedOptions = computed(() => {
  return filterBy.options.filter((i) => i.selected);
})

const filterByBtnText = computed(() => {
  return filterBySelectedOptions.value.length > 0
    ? "One or more options selected"
    : "No options are selected";
})

const filtered = (options: FilterByDropdownOption[]) => {
  filterBy.idsText = options
    .filter((i: FilterByDropdownOption) => i.selected)
    .map((i: FilterByDropdownOption) => i.id)
    .join(", ");
}

const fab = reactive({
  tabs: [
    { key: "tab1", tabName: "Tab 1 is the title", title: "Active Tab 1", active: true },
    { key: "tab2", tabName: "Tab 2", title: "Active Tab 2", active: false, iconSrc: "https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png" },
    { key: "tab3", tabName: "Tab 3", title: "Active Tab 3", active: false },
    { key: "tab4", tabName: "Tab 4", title: "Active Tab 4", active: false }
  ],
  open() {
    console.log("open");
  },
  close() {
    console.log("close");
  },
})

defineOptions({
  name: 'ButtonsPage'
})

definePage({
  meta: {
    title: 'Buttons'
  }
})

useHead({
  title: 'Buttons'
})
</script>
