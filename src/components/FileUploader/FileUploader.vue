<template>
  <div
    data-id="sds-file-uploader"
    class="bg-white dark:bg-black border border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-3"
  >
    <div class="group relative">
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
        :class="{ 'pointer-events-none': disabled }"
        @change="processFiles"
      >
      <div 
        class="
            flex
            flex-col
            items-center
            space-y-1
            rounded
            p-4
            bg-gray-25
            dark:bg-gray-900
            group-hover:bg-gray-50
            dark:group-hover:bg-gray-800
          "
        :class="[disabled ? 'bg-transparent group-hover:bg-transparent' : '']"
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
          <SdsSvgIcon
            aria-hidden="true"
            class="my-auto"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :height="icons['arrow-up-from-bracket'].height"
            :path="icons['arrow-up-from-bracket'].path"
            :view-box="icons['arrow-up-from-bracket'].viewBox"
            :width="icons['arrow-up-from-bracket'].width"
          />Upload files</label>
        <p 
          class="text-xs text-center font-semibold text-gray-900 dark:text-white leading-4"
          :class="{ 'opacity-50': disabled }"
        >
          Click to upload or drag and drop files here
        </p>
        <p 
          class="text-xs text-center text-gray-600 dark:text-gray-400 leading-4"
          :class="{ 'opacity-50': disabled }"
        >
          {{ helperText ? helperText : `Accepts .pdf, .json, .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx or .csv files under ${filesize} MB.` }}
        </p>
      </div>
    </div>
    <!-- @slot File list content. @binding files, invalidFiles, removeFile, removeInvalidFile, byteToSize -->
    <slot
      :files="fileList"
      :invalid-files="invalidFileList"
      :remove-file="removeFile"
      :remove-invalid-file="removeInvalidFile"
      :byte-to-size="byteToSize"
    >
      <ul
        v-if="fileList.length > 0 || invalidFileList.length > 0"
        class="flex flex-col space-y-2 mt-2"
      >
        <li
          v-for="(f, i) in fileList"
          :key="f.name + f.size + f.type + f.lastModified"
        >
          <div
            class="
              bg-white 
              dark:bg-black 
              hover:dark:bg-gray-900
              border 
              border-gray-100 
              hover:border-gray-200
              dark:border-gray-800
              hover:dark:border-gray-700
              rounded 
              flex 
              flex-none 
              items-center 
              self-stretch 
              gap-2 
              p-2 
              shadow-none 
              hover:shadow-lg
            "
          >
            <div
              v-if="
                maxFilesSize && totalFilesSize > maxFilesSize && i === fileList.length - 1
              "
              class="flex flex-none justify-center items-center w-10 h-10 p-2 bg-red-25 dark:bg-red-900 rounded"
            >
              <SdsSvgIcon
                aria-hidden="true"
                class="text-red-600 dark:text-red-300"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons.error.height"
                :path="icons.error.path"
                :view-box="icons.error.viewBox"
                :width="icons.error.width"
              />
            </div>
            <div 
              v-else-if="uploadedImgSrc(f, allowedFiletypes)"
              class="flex flex-none w-10 h-10"
            >
              <img
                class="max-h-10 w-full my-auto object-cover"
                height="auto"
                width="auto"
                :alt="f.name"
                :src="uploadedImgSrc(f, allowedFiletypes)"
              >
            </div>
            <div
              v-else 
              class="flex flex-none justify-center items-center w-10 h-10 p-2 bg-gray-25 dark:bg-gray-900 rounded"
            >
              <SdsSvgIcon
                aria-hidden="true"
                class="text-gray-600 dark:text-gray-400"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons[isFileType(f.type)].height"
                :path="icons[isFileType(f.type)].path"
                :view-box="icons[isFileType(f.type)].viewBox"
                :width="icons[isFileType(f.type)].width"
              />
            </div>
            <div class="flex flex-col w-full">
              <span class="leading-6 truncate">{{ f.name }}</span>
              <span
                v-if="
                  maxFilesSize && totalFilesSize > maxFilesSize && i === fileList.length - 1
                "
                class="text-xs text-red-600 dark:text-red-300 leading-4"
              >{{ `Total file size exceeds the ${maxFilesSize} MB limit. Remove or reduce files.` }}</span>
            </div>
            <!-- @slot Custom file content. @binding f (File) -->
            <slot 
              name="file"
              :type="f"
            />
            <SdsActionButton
              kind="ghost"
              variant="red"
              size="md"
              class="z-10 ml-auto"
              @click="removeFile(f)"
            >
              <SdsSvgIcon
                aria-hidden="true"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons['trash-can'].height"
                :path="icons['trash-can'].path"
                :view-box="icons['trash-can'].viewBox"
                :width="icons['trash-can'].width"
              />
              <span class="sr-only">Remove file</span>
            </SdsActionButton>
          </div>
        </li>
        <li
          v-for="f, in invalidFileList"
          :key="f.name + f.size + f.type + f.lastModified"
        >
          <div 
            class="
              bg-white 
              dark:bg-black 
              border 
              border-gray-100 
              hover:border-gray-200
              dark:border-gray-800
              hover:dark:border-gray-700
              rounded 
              flex 
              flex-none 
              items-center 
              self-stretch 
              gap-2 
              p-2 
              shadow-none 
              hover:shadow-lg
            "
          >
            <div class="flex flex-none justify-center items-center w-10 h-10 p-2 bg-red-25 dark:bg-red-900 rounded">
              <SdsSvgIcon
                aria-hidden="true"
                class="text-red-600 dark:text-red-300"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons.error.height"
                :path="icons.error.path"
                :view-box="icons.error.viewBox"
                :width="icons.error.width"
              />
            </div>
            <div class="flex flex-col w-full">
              <span class="leading-6 truncate">{{ f.name }}</span>
              <span class="text-xs text-red-600 dark:text-red-300 leading-4">
                <template v-if="f.invalidType">Invalid file type</template>
                <template v-else-if="f.invalidSize">{{ `File size exceeds the ${filesize} MB limit.` }}</template>
              </span>
            </div>
            <!-- @slot Custom (invalid) file content. @binding f (File) -->
            <slot 
              name="invalidFile"
              :type="f"
            />
            <SdsActionButton
              kind="ghost"
              variant="red"
              size="md"
              class="z-10 ml-auto"
              @click="removeInvalidFile(f)"
            >
              <SdsSvgIcon
                aria-hidden="true"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons['trash-can'].height"
                :path="icons['trash-can'].path"
                :view-box="icons['trash-can'].viewBox"
                :width="icons['trash-can'].width"
              />
              <span class="sr-only">Remove file</span>
            </SdsActionButton>
          </div>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { Uid } from '@shimyshack/uid'
import SdsActionButton from '../ActionButton';
import SdsSvgIcon from '../SvgIcon';

export type FileWithInvalidDefinitions = File & { invalidType?: boolean, invalidSize?: boolean }
export type FileTypes = 'csv' | 'doc' | 'pdf'
export type SvgIconTypes = FileTypes | 'arrow-up-from-bracket' | 'error' | 'generic' | 'trash-can'
export type SvgIcons = Record<SvgIconTypes, { height: number; path: string; viewBox: string; width: number; }>

const emit = defineEmits(['add', 'remove', 'remove-invalid', 'total-files-size', 'update:model-value'])

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
  allowedFiletypes: { type: Array as PropType<string[]>, default: () => [] },
  /**
   * Determines the maximum allowed filesize in megabytes for each uploaded file.
   */
  filesize: { type: Number, default: 10 },
  /**
   * Determines the maximum allowed size for all uploaded files in megabytes.
   */
   maxFilesSize: { type: Number, default: undefined },
  /**
   * Determines the helper text used to describe the upload field.
   */
  helperText: { type: String, default: undefined }
})

const fileInput = ref<null | HTMLInputElement>(null)
const fileList = ref<File[]>([])
const icons = ref<SvgIcons>({
  'arrow-up-from-bracket': {
    height: 13,
    path: 'M9.5 8.75C9.5 8.35156 9.82812 8 10.25 8C10.6484 8 11 8.35156 11 8.75V10.25C11 11.5156 9.99219 12.5 8.75 12.5H2.75C1.48438 12.5 0.5 11.5156 0.5 10.25V8.75C0.5 8.35156 0.828125 8 1.25 8C1.64844 8 2 8.35156 2 8.75V10.25C2 10.6719 2.32812 11 2.75 11H8.75C9.14844 11 9.5 10.6719 9.5 10.25V8.75ZM5.21094 0.734375C5.49219 0.429688 5.98438 0.429688 6.26562 0.734375L9.26562 3.73438C9.57031 4.01562 9.57031 4.50781 9.26562 4.78906C8.98438 5.09375 8.49219 5.09375 8.21094 4.78906L6.5 3.07812V8C6.5 8.42188 6.14844 8.75 5.75 8.75C5.32812 8.75 5 8.42188 5 8V3.07812L3.26562 4.78906C2.98438 5.09375 2.49219 5.09375 2.21094 4.78906C1.90625 4.50781 1.90625 4.01562 2.21094 3.73438L5.21094 0.734375Z',
    viewBox: '0 0 11 13',
    width: 11
  },
  csv: {
    height: 21,
    path: 'M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zM176 256l0 48-64 0 0-48 64 0zm-64 80l64 0 0 48-64 0 0-48zm96 0l64 0 0 48-64 0 0-48zm-16 80l16 0 64 0c17.7 0 32-14.3 32-32l0-48 0-16 0-16 0-48c0-17.7-14.3-32-32-32l-64 0-16 0-16 0-64 0c-17.7 0-32 14.3-32 32l0 48 0 16 0 16 0 48c0 17.7 14.3 32 32 32l64 0 16 0zm16-112l0-48 64 0 0 48-64 0z',
    viewBox: '0 0 384 512',
    width: 16
  },
  doc: {
    height: 24,
    path: 'M18.7578 7.42187C19.2266 7.89062 19.5 8.51562 19.5 9.17969V20C19.5 21.4062 18.3672 22.5 17 22.5H7C5.59375 22.5 4.5 21.4062 4.5 20L4.5 5C4.5 3.63281 5.59375 2.5 7 2.5L12.8203 2.5C13.4844 2.5 14.1094 2.77344 14.5781 3.24219L18.7578 7.42187ZM13.25 3.86719V8.125C13.25 8.47656 13.5234 8.75 13.875 8.75H18.1328C18.0938 8.59375 18.0156 8.4375 17.8594 8.28125L13.7188 4.14062C13.5625 3.98437 13.4062 3.90625 13.25 3.86719ZM18.25 20V10H13.875C12.8203 10 12 9.17969 12 8.125V3.75L7 3.75C6.29688 3.75 5.75 4.33594 5.75 5L5.75 20C5.75 20.7031 6.29688 21.25 7 21.25H17C17.6641 21.25 18.25 20.7031 18.25 20ZM8.25 13.125C8.25 12.8125 8.52344 12.5 8.875 12.5H15.125C15.4375 12.5 15.75 12.8125 15.75 13.125C15.75 13.4766 15.4375 13.75 15.125 13.75H8.875C8.52344 13.75 8.25 13.4766 8.25 13.125ZM15.125 15C15.4375 15 15.75 15.3125 15.75 15.625C15.75 15.9766 15.4375 16.25 15.125 16.25H8.875C8.52344 16.25 8.25 15.9766 8.25 15.625C8.25 15.3125 8.52344 15 8.875 15H15.125ZM15.125 17.5C15.4375 17.5 15.75 17.8125 15.75 18.125C15.75 18.4766 15.4375 18.75 15.125 18.75H8.875C8.52344 18.75 8.25 18.4766 8.25 18.125C8.25 17.8125 8.52344 17.5 8.875 17.5H15.125Z',
    viewBox: '0 0 24 24',
    width: 24
  },
  error: {
    height: 21,
    path: 'M10 0.5C15.5078 0.5 20 4.99219 20 10.5C20 16.0469 15.5078 20.5 10 20.5C4.45313 20.5 0 16.0469 0 10.5C0 4.99219 4.45312 0.5 10 0.5ZM10 19.25C14.8047 19.25 18.75 15.3438 18.75 10.5C18.75 5.69531 14.8047 1.75 10 1.75C5.15625 1.75 1.25 5.69531 1.25 10.5C1.25 15.3438 5.15625 19.25 10 19.25ZM10 12.375C9.64844 12.375 9.375 12.1016 9.375 11.75V5.5C9.375 5.1875 9.64844 4.875 10 4.875C10.3125 4.875 10.625 5.1875 10.625 5.5V11.75C10.625 12.1016 10.3125 12.375 10 12.375ZM10 13.9375C10.5078 13.9375 10.9375 14.3672 10.9375 14.875C10.9375 15.4219 10.5078 15.8125 10 15.8125C9.45312 15.8125 9.0625 15.4219 9.0625 14.875C9.0625 14.3672 9.45312 13.9375 10 13.9375Z',
    viewBox: '0 0 20 21',
    width: 20
  },
  generic: {
    height: 21,
    path: 'M0.5 3C0.5 1.63281 1.59375 0.5 3 0.5L9.09375 0.5C9.5625 0.5 10.0703 0.734375 10.4219 1.08594L14.9141 5.57812C15.2656 5.92969 15.5 6.4375 15.5 6.90625V18C15.5 19.4062 14.3672 20.5 13 20.5H3C1.59375 20.5 0.5 19.4062 0.5 18L0.5 3ZM14.25 8H9.875C8.82031 8 8 7.17969 8 6.125V1.75L3 1.75C2.29688 1.75 1.75 2.33594 1.75 3L1.75 18C1.75 18.7031 2.29688 19.25 3 19.25H13C13.6641 19.25 14.25 18.7031 14.25 18V8ZM14.0547 6.47656L9.52344 1.94531C9.44531 1.86719 9.32812 1.82812 9.25 1.78906V6.125C9.25 6.47656 9.52344 6.75 9.875 6.75H14.2109C14.1719 6.67188 14.1328 6.55469 14.0547 6.47656Z',
    viewBox: '0 0 16 21',
    width: 16
  },
  pdf: {
    height: 21,
    path: 'M15.5 18C15.5 19.4062 14.3672 20.5 13 20.5H3C1.59375 20.5 0.5 19.4062 0.5 18H1.75C1.75 18.7031 2.29688 19.25 3 19.25H13C13.6641 19.25 14.25 18.7031 14.25 18H15.5ZM9.875 8C8.82031 8 8 7.17969 8 6.125V1.75L3 1.75C2.29688 1.75 1.75 2.33594 1.75 3V9.25H0.5V3C0.5 1.63281 1.59375 0.5 3 0.5L9.09375 0.5C9.5625 0.5 10.0703 0.734375 10.4219 1.08594L14.9141 5.57812C15.2656 5.92969 15.5 6.4375 15.5 6.90625V9.25H14.25V8H9.875ZM14.0547 6.47656L9.52344 1.94531C9.44531 1.86719 9.32812 1.82812 9.25 1.78906V6.125C9.25 6.47656 9.52344 6.75 9.875 6.75H14.2109C14.1719 6.67188 14.1328 6.55469 14.0547 6.47656ZM3.9375 10.5C5.10938 10.5 6.125 11.5156 6.125 12.6875C6.125 13.8984 5.10938 14.875 3.9375 14.875H3.625V16.125C3.625 16.4766 3.3125 16.75 3 16.75C2.64844 16.75 2.375 16.4766 2.375 16.125L2.375 11.125C2.375 10.8125 2.64844 10.5 3 10.5H3.9375ZM4.875 12.6875C4.875 12.1797 4.44531 11.75 3.9375 11.75H3.625V13.625H3.9375C4.44531 13.625 4.875 13.2344 4.875 12.6875ZM6.75 11.125C6.75 10.8125 7.02344 10.5 7.375 10.5H8.3125C9.32812 10.5 10.1875 11.3594 10.1875 12.375V14.875C10.1875 15.9297 9.32812 16.75 8.3125 16.75H7.375C7.02344 16.75 6.75 16.4766 6.75 16.125V11.125ZM8 15.5H8.3125C8.625 15.5 8.9375 15.2266 8.9375 14.875V12.375C8.9375 12.0625 8.625 11.75 8.3125 11.75H8V15.5ZM13.625 10.5C13.9375 10.5 14.25 10.8125 14.25 11.125C14.25 11.4766 13.9375 11.75 13.625 11.75H12.375V13H13.625C13.9375 13 14.25 13.3125 14.25 13.625C14.25 13.9766 13.9375 14.25 13.625 14.25H12.375V16.125C12.375 16.4766 12.0625 16.75 11.75 16.75C11.3984 16.75 11.125 16.4766 11.125 16.125V11.125C11.125 10.8125 11.3984 10.5 11.75 10.5H13.625Z',
    viewBox: '0 0 16 21',
    width: 16
  },
  'trash-can': {
    height: 12,
    path: 'M3.91406 0.921875C4.03125 0.664062 4.28906 0.5 4.57031 0.5H7.40625C7.6875 0.5 7.94531 0.664062 8.0625 0.921875L8.25 1.25H10.5C10.8984 1.25 11.25 1.60156 11.25 2C11.25 2.42188 10.8984 2.75 10.5 2.75H1.5C1.07812 2.75 0.75 2.42188 0.75 2C0.75 1.60156 1.07812 1.25 1.5 1.25H3.75L3.91406 0.921875ZM1.47656 3.5H10.5V11C10.5 11.8438 9.82031 12.5 9 12.5H2.97656C2.15625 12.5 1.47656 11.8438 1.47656 11V3.5ZM3.35156 5.375V10.625C3.35156 10.8359 3.53906 11 3.72656 11C3.9375 11 4.10156 10.8359 4.10156 10.625V5.375C4.10156 5.1875 3.9375 5 3.72656 5C3.53906 5 3.35156 5.1875 3.35156 5.375ZM5.60156 5.375V10.625C5.60156 10.8359 5.78906 11 5.97656 11C6.1875 11 6.375 10.8359 6.375 10.625V5.375C6.375 5.1875 6.1875 5 5.97656 5C5.78906 5 5.60156 5.1875 5.60156 5.375ZM7.875 5.375V10.625C7.875 10.8359 8.03906 11 8.25 11C8.4375 11 8.625 10.8359 8.625 10.625V5.375C8.625 5.1875 8.4375 5 8.25 5C8.03906 5 7.875 5.1875 7.875 5.375Z',
    viewBox: '0 0 12 13',
    width: 13
  }
})
const invalidFileList = ref<FileWithInvalidDefinitions[]>([])
const totalFilesSize = ref(0)

const disabled = computed(() => {
  if (props.maxFilesSize && totalFilesSize.value > props.maxFilesSize) {
    return true
  }
  return false
})

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

  const filesize = processFileSize(file)
  totalFilesSize.value = totalFilesSize.value - filesize <= 0 ? 0 : totalFilesSize.value - filesize

  /**
   * Emitted when a valid file is removed.
   */
  emit('remove', { files: fileList.value, invalidFiles: invalidFileList.value })
  emit('update:model-value', [...fileList.value, ...invalidFileList.value])
  emit('total-files-size', totalFilesSize)
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
  emit('total-files-size', totalFilesSize)
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
  emit('total-files-size', totalFilesSize)
}

const processSingleFile = (file: File) => {
  if (!fileInput.value) return

  const dt = new DataTransfer()
  const filesize = processFileSize(file)
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
    totalFilesSize.value += filesize
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

const processFileSize = (file: File) => parseFloat(((file.size / 1024) / 1024).toFixed(4)) // MB

const byteToSize = (bytes: number): string => {
  const sizes = ['b', 'kb', 'mb', 'gb', 'tb']
  if (bytes <= 0 || bytes > 999999999999999) { return 'n/a' }
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10)
  if (i === 0) { return `${bytes}${sizes[i]}` }
  return `${Math.ceil(bytes / 1024 ** i)} ${sizes[i]}`
}

const isFileType = (fileType: string): FileTypes | 'generic' => {
  switch (fileType) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'text/plain':
      return 'doc'
    case 'application/pdf':
      return 'pdf'
    case 'text/csv':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'csv'
    default:
      return 'generic'
  }
}

const uploadedImgSrc = (file: File, allowedFiletypes: string[]) => {
  if (file) {
    if ('type' in file) {
      if (allowedFiletypes.includes(file.type)) {
        if (file.type.split('/')[0] === 'image') {
          return URL.createObjectURL(file)
        } else {
          return undefined
        }
      }
    }
  }
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