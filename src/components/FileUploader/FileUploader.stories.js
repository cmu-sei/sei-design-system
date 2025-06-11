import SdsFileUploader from './FileUploader.vue';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Inputs/File Uploader',
  parameters: {
    docs: {
      description: {
        component: 'A file uploader allows users to select one or more files to upload to a specific location.',
      },
    },
  },
  component: SdsFileUploader,
  argTypes: {
  }
};

const Template = (args) => ({
  components: { SdsFileUploader },
  setup() {
    return { args }
  },
  template: `
    <sds-file-uploader v-bind="args" @add="onAdd" @remove="onRemove" @remove-invalid="onRemoveInvalid" />
  `,
  methods: {
    onAdd: action('onAdd'),
    onRemove: action('onRemove'),
    onRemoveInvalid: action('onRemoveInvalid'),
  }
});

export const Default = Template.bind({});
Default.args = {
  accept: ".pdf, .json, .jpg, .jpeg, .png, .webp, .mov, .mp4, .doc, .docx, .xls, .xlsx, .csv",
  helperText: "Use a PDF, JSON, JPG, JPEG, PNG, WebP, MOV, MP4, DOC, DOCX, XLS, XLSX or CSV under 1 MB.",
  allowedFiletypes: [
    'application/pdf',
    'application/json',
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/quicktime',
    'video/mp4',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  filesize: 1,
  maxFilesSize: 3,
  multiple: true
};
