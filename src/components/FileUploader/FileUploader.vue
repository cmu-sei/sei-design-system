<template>
  <div
    data-id="sds-file-uploader"
    class="bg-white border border-dashed border-gray-200 rounded-lg p-3 relative"
  >
    <input
      ref="fileInput"
      v-uid
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :required="required"
      :disabled="disabled"
      class="absolute inset-0 opacity-0 cursor-pointer"
      @change="processFiles"
    >
    <div 
      class="flex flex-col items-center space-y-1 rounded p-4 bg-gray-25"
      :class="{ 'bg-transparent': disabled }"
    >
      <label
        :for="fileInput?.id ?? undefined"
        class="
          action-btn
          action-btn-ghost
          action-btn-blue
          action-btn-sm
          cursor-pointer
          font-semibold
          z-10
        "
        :class="{ 'disabled': disabled }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="my-auto"
          width="12"
          height="13"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 11 13"
          file="none"
        >
          <path 
            fill="currentColor"
            d="M9.5 8.75C9.5 8.35156 9.82812 8 10.25 8C10.6484 8 11 8.35156 11 8.75V10.25C11 11.5156 9.99219 12.5 8.75 12.5H2.75C1.48438 12.5 0.5 11.5156 0.5 10.25V8.75C0.5 8.35156 0.828125 8 1.25 8C1.64844 8 2 8.35156 2 8.75V10.25C2 10.6719 2.32812 11 2.75 11H8.75C9.14844 11 9.5 10.6719 9.5 10.25V8.75ZM5.21094 0.734375C5.49219 0.429688 5.98438 0.429688 6.26562 0.734375L9.26562 3.73438C9.57031 4.01562 9.57031 4.50781 9.26562 4.78906C8.98438 5.09375 8.49219 5.09375 8.21094 4.78906L6.5 3.07812V8C6.5 8.42188 6.14844 8.75 5.75 8.75C5.32812 8.75 5 8.42188 5 8V3.07812L3.26562 4.78906C2.98438 5.09375 2.49219 5.09375 2.21094 4.78906C1.90625 4.50781 1.90625 4.01562 2.21094 3.73438L5.21094 0.734375Z"
          />
        </svg>Upload files</label>
      <p 
        class="text-xs text-center font-semibold text-gray-900 leading-4"
        :class="{ 'opacity-50': disabled }"
      >
        Click to upload or drag and drop files here
      </p>
      <p 
        class="text-xs text-center text-gray-600 leading-4"
        :class="{ 'opacity-50': disabled }"
      >
        {{ helperText ? helperText : `Accepts .pdf, .json, .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx or .csv files under ${filesize} MB.` }}
      </p>
    </div>
    <!-- @slot File list content. @binding files, invalidFiles, removeFile, removeInvalidFile, byteToSize -->
    <slot
      :files="fileList"
      :invalid-files="invalidFileList"
      :remove-file="removeFile"
      :remove-invalid-file="removeInvalidFile"
      :byte-to-size="byteToSize"
    >
      <ul v-if="fileList.length > 0 || invalidFileList.length > 0">
        <li
          v-for="f in fileList"
          :key="f.name + f.size + f.type + f.lastModified"
          class="py-2 border-b only:border-0 last:pb-0 last:border-0"
        >
          <div class="flex">
            <div class="my-auto flex gap-1 grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="w-4 h-4 my-auto text-green-700"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M243.8 339.8c-10.9 10.9-28.7 10.9-39.6 0l-64-64c-10.9-10.9-10.9-28.7 0-39.6c10.9-10.9 28.7-10.9 39.6 0l44.2 44.2l108.2-108.2c10.9-10.9 28.7-10.9 39.6 0c10.9 10.9 10.9 28.7 0 39.6l-128 128zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0s256 114.6 256 256zM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208s208-93.1 208-208S370.9 48 256 48z"
                />
              </svg>
              <span class="my-auto">{{ f.name }}</span>
              <span class="my-auto text-gray-700 text-sm uppercase">({{ byteToSize(f.size) }})</span>
            </div>
            <button
              class="my-auto z-10 link hover:text-red-700 dark:hover:text-red-400"
              @click="removeFile(f)"
            >
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                aria-hidden="true"
              ><path d="M6 18L18 6M6 6l12 12" /></svg>
              <span class="sr-only">Remove file</span>
            </button>
          </div>
        </li>
        <li
          v-for="f in invalidFileList"
          :key="f.name + f.size + f.type + f.lastModified"
          class="py-2 border-b only:border-0 last:pb-0 last:border-0"
        >
          <div class="flex">
            <div class="my-auto flex gap-1 grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="w-4 h-4 my-auto text-red-700"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M175 175c9.4-9.3 24.6-9.3 33.1 0l47 47.1L303 175c9.4-9.3 24.6-9.3 33.1 0c10.2 9.4 10.2 24.6 0 33.1l-46.2 47l46.2 47.9c10.2 9.4 10.2 24.6 0 33.1c-8.5 10.2-23.7 10.2-33.1 0l-47.9-46.2l-47 46.2c-8.5 10.2-23.7 10.2-33.1 0c-9.3-8.5-9.3-23.7 0-33.1l47.1-47.9l-47.1-47c-9.3-8.5-9.3-23.7 0-33.1zm337 81c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0s256 114.6 256 256zM256 48C141.1 48 48 141.1 48 256s93.1 208 208 208s208-93.1 208-208S370.9 48 256 48z"
                />
              </svg>
              <span class="my-auto">{{ f.name }}</span>
              <span class="my-auto text-gray-700 text-sm uppercase">({{ byteToSize(f.size) }})</span>
            </div>
            <button
              class="my-auto z-10 link hover:text-red-700 dark:hover:text-red-400"
              @click="removeInvalidFile(f)"
            >
              <svg
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                aria-hidden="true"
              ><path d="M6 18L18 6M6 6l12 12" /></svg>
              <span class="sr-only">Remove file</span>
            </button>
          </div>
          <p
            v-if="f.invalidType"
            class="text-red-700 text-xs ml-5 mt-1"
          >
            Invalid file type
          </p>
          <p
            v-if="f.invalidSize"
            class="text-red-700 text-xs ml-5 mt-1"
          >
            File size is over {{ filesize }} MB.
          </p>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { Uid } from '@shimyshack/uid'

export type FileWithInvalidDefinitions = File & { invalidType?: boolean, invalidSize?: boolean }

const emit = defineEmits(['add', 'remove', 'remove-invalid', 'update:model-value'])

defineOptions({
  name: 'SdsFileUploader',
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * An array of files. This prop is optional.
   * 
   * This syncs with the internal fileList and invalidFileList
   * to give developers more control over files.
   * 
   * Each file has `name`, `type`, `size`, `lastModified` properties.
   * 
   * You can check a file's validity using its `invalidType`
   * and `invalidSize` boolean properties. They are only
   * present if the file is invalid
   */
  modelValue: { type: Array as PropType<File[]>, default: () => [] },
  /**
   * Determines the form name to use for the upload input field.
   */
  name: { type: String, default: 'sdsFileUploader' },
  /**
   * Determines whether the user can upload more than one file.
   */
  multiple: { type: Boolean, default: false },
  /**
   * Determines if the file upload field is required.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines the accepted file formats used on the upload input field.
   */
  accept: { type: String, default: undefined },
  /**
   * Determines the file types used for validation.
   */
  allowedFiletypes: { type: Array, default: () => [] },
  /**
   * Determines the maximum allowed filesize in megabytes for each uploaded file.
   */
  filesize: { type: Number, default: 10 },
  /**
   * Determines the helper text used to describe the upload field.
   */
  helperText: { type: String, default: undefined },
  /**
   * Determines if the file upload field is disabled
   */
  disabled: { type: Boolean, default: false }
})

const fileInput = ref<null | HTMLInputElement>(null)
const fileList = ref<File[]>([])
const invalidFileList = ref<FileWithInvalidDefinitions[]>([])

const removeFile = (file: File) => {
  if (!fileInput.value) return

  const dt = new DataTransfer()
  fileList.value = fileList.value.filter((i) => !(
    i.name === file.name &&
    i.lastModified === file.lastModified &&
    i.size === file.size &&
    i.type === file.type
  ))
  fileList.value.forEach((i) => {
    dt.items.add(i)
  })
  fileInput.value.files = dt.files

  /**
   * Emitted when a valid file is removed.
   */
  emit('remove', { files: fileList.value, invalidFiles: invalidFileList.value })
  emit('update:model-value', [...fileList.value, ...invalidFileList.value])
}

const removeInvalidFile = (file: File) => {
  invalidFileList.value = invalidFileList.value.filter((i) => !(
    i.name === file.name &&
    i.lastModified === file.lastModified &&
    i.size === file.size &&
    i.type === file.type
  ))

  /**
   * Emitted when an invalid file is removed.
   */
  emit('remove-invalid', { files: fileList.value, invalidFiles: invalidFileList.value })
  emit('update:model-value', [...fileList.value, ...invalidFileList.value])
}

const findFile = (file: File) => {
  return fileList.value.find((i) => (
    i.name === file.name &&
    i.lastModified === file.lastModified &&
    i.size === file.size &&
    i.type === file.type
  ))
}

const processFiles = (event: Event) => {
  if (!event.target) return
  const files = (event.target as HTMLInputElement).files as FileList
  Array.from(files).forEach((file) => {
    const existingFile = findFile(file as File)
    if (!existingFile) {
      processSingleFile(file as File)
    }
  })

  /**
   * Emitted when a file or files have been added.
   */
  emit('add', { files: fileList.value, invalidFiles: invalidFileList.value })
  emit('update:model-value', [...fileList.value, ...invalidFileList.value])
}

const processSingleFile = (file: File) => {
  if (!fileInput.value) return

  const dt = new DataTransfer()
  const filesize = parseFloat(((file.size / 1024) / 1024).toFixed(4)) // MB
  const filetype = file.type
  const filetypeCheckSuccessful = (props.allowedFiletypes.length > 0 && props.allowedFiletypes.includes(filetype)) || props.allowedFiletypes.length < 1
  
  if (props.multiple) {
    fileList.value.forEach((i) => {
      dt.items.add(i)
    })
  }

  if (filesize <= props.filesize && filetypeCheckSuccessful) {
    dt.items.add(file)
    fileInput.value.files = dt.files
    fileList.value = Array.from(fileInput.value.files) || []
    if (!props.multiple) {
      invalidFileList.value = []
    }
  } else if (filesize > props.filesize) {
    if (props.multiple) {
      (file as FileWithInvalidDefinitions).invalidSize = true
      invalidFileList.value.push(file)
      invalidFileList.value = invalidFileList.value.filter((file, index, self) =>
        index === self.findIndex((i) => (
          i.name === file.name &&
          i.lastModified === file.lastModified &&
          i.size === file.size &&
          i.type === file.type
        ))
      )
    } else {
      fileList.value = []
      fileInput.value.files = dt.files;
      (file as FileWithInvalidDefinitions).invalidSize = true
      invalidFileList.value = [file]
    }
  } else if (!filetypeCheckSuccessful) {
    if (props.multiple) {
      (file as FileWithInvalidDefinitions).invalidType = true
      invalidFileList.value.push(file)
      invalidFileList.value = invalidFileList.value.filter((file, index, self) =>
        index === self.findIndex((i) => (
          i.name === file.name &&
          i.lastModified === file.lastModified &&
          i.size === file.size &&
          i.type === file.type
        ))
      )
    } else {
      fileList.value = []
      fileInput.value.files = dt.files;
      (file as FileWithInvalidDefinitions).invalidType = true
      invalidFileList.value = [file]
    }
  }
}

const byteToSize = (bytes: number): string => {
  const sizes = ['b', 'kb', 'mb', 'gb', 'tb']
  if (bytes <= 0 || bytes > 999999999999999) { return 'n/a' }
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10)
  if (i === 0) { return `${bytes}${sizes[i]}` }
  return `${Math.ceil(bytes / 1024 ** i)} ${sizes[i]}`
}

watch(() => props.modelValue, value => {
  if (!fileInput.value) return
  const dt = new DataTransfer()
  value.forEach(file => dt.items.add(file))
  fileInput.value.files = dt.files
  fileList.value = []
  invalidFileList.value = []
  Array.from(dt.files).forEach(file => {
    processSingleFile(file)
  })
}, { immediate: true, deep: true })
</script>