import { nextTick } from 'vue'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './FileUploader.vue'

// Helper function to create mock files
const createMockFile = (name = 'test.txt', size = 1024, type = 'text/plain', lastModified = Date.now()) => {
  const file = new File(['content'], name, { type, lastModified })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('FileUploader', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    // Mock URL.createObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-object-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    vi.restoreAllMocks()
  })

  describe('Rendering & Props', () => {
    it('should render component with default props and show upload area', () => {
      wrapper = mount(Component)
      expect(wrapper.find('[data-id="sds-file-uploader"]').exists()).toBe(true)
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('Click to upload or drag and drop a file here')
    })

    it('should display correct upload text for single file mode', () => {
      wrapper = mount(Component, { props: { multiple: false } })
      expect(wrapper.text()).toContain('Upload file')
      expect(wrapper.text()).toContain('Click to upload or drag and drop a file here')
    })

    it('should display correct upload text for multiple file mode', () => {
      wrapper = mount(Component, { props: { multiple: true } })
      expect(wrapper.text()).toContain('Upload files')
      expect(wrapper.text()).toContain('Click to upload or drag and drop files here')
    })

    it('should apply custom name attribute to file input when provided', () => {
      wrapper = mount(Component, { props: { name: 'customFileInput' } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('name')).toBe('customFileInput')
    })

    it('should set accept attribute on file input when provided', () => {
      wrapper = mount(Component, { props: { accept: '.pdf,.jpg' } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('accept')).toBe('.pdf,.jpg')
    })

    it('should render custom helper text when helperText prop is provided', () => {
      const customText = 'Upload your custom files here'
      wrapper = mount(Component, { props: { helperText: customText } })
      expect(wrapper.text()).toContain(customText)
    })

    it('should show default helper text when no helperText prop is provided', () => {
      wrapper = mount(Component)
      expect(wrapper.text()).toContain('Accepts .pdf, .json, .jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx or .csv files under 10 MB.')
    })
  })

  describe('Model Value & Events', () => {
    it('should sync with v-model and update fileList when model changes', async () => {
      const modelValue = [createMockFile('initial.txt', 1024)]
      wrapper = mount(Component, { 
        props: { modelValue: modelValue as never[] }
      })
      
      await nextTick()
      expect(wrapper.text()).toContain('initial.txt')
    })

    it('should emit update:modelValue when files are processed', async () => {
      wrapper = mount(Component)
      
      const mockFile = createMockFile('test.txt', 1024)
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      }
      
      await wrapper.vm.processFiles(mockEvent)
      await nextTick()
      
      const updateEvents = wrapper.emitted('update:modelValue')
      expect(updateEvents).toBeTruthy()
    })

    it('should emit add event when files are processed', async () => {
      wrapper = mount(Component)
      
      const mockFile = createMockFile('test.txt', 1024)
      const mockEvent = {
        target: {
          files: [mockFile]
        }
      }
      
      await wrapper.vm.processFiles(mockEvent)
      await nextTick()
      
      const addEvents = wrapper.emitted('add')
      expect(addEvents).toBeTruthy()
      expect(addEvents[0][0]).toHaveProperty('files')
      expect(addEvents[0][0]).toHaveProperty('invalidFiles')
    })
  })

  describe('File Validation', () => {
    it('should validate file types correctly', async () => {
      wrapper = mount(Component, { 
        props: { allowedFiletypes: ['text/plain'] } 
      })
      
      // Valid file type
      const validFile = createMockFile('valid.txt', 1024, 'text/plain')
      await wrapper.vm.processFiles({ target: { files: [validFile] } })
      await nextTick()
      expect(wrapper.text()).toContain('valid.txt')
      
      // Invalid file type
      const invalidFile = createMockFile('invalid.exe', 1024, 'application/exe')
      await wrapper.vm.processFiles({ target: { files: [invalidFile] } })
      await nextTick()
      expect(wrapper.text()).toContain('Invalid file type')
    })

    it('should validate file size correctly', async () => {
      wrapper = mount(Component, { props: { filesize: 1 } }) // 1MB limit
      
      const largeFile = createMockFile('large.txt', 2 * 1024 * 1024) // 2MB
      await wrapper.vm.processFiles({ target: { files: [largeFile] } })
      await nextTick()
      
      expect(wrapper.text()).toContain('File size exceeds the 1 MB limit.')
    })

    it('should validate total files size correctly', async () => {
      wrapper = mount(Component, { 
        props: { multiple: true, maxFilesSize: 1, filesize: 1 } 
      })
      
      // Add first file
      const file1 = createMockFile('file1.txt', 0.6 * 1024 * 1024) // 0.6MB
      await wrapper.vm.processFiles({ target: { files: [file1] } })
      
      // Add second file that exceeds total limit
      const file2 = createMockFile('file2.txt', 0.6 * 1024 * 1024) // 0.6MB
      await wrapper.vm.processFiles({ target: { files: [file2] } })
      await nextTick()
      
      expect(wrapper.text()).toContain('Total file size exceeds the 1 MB limit.')
    })
  })

  describe('File Management', () => {
    it('should remove valid files correctly', async () => {
      wrapper = mount(Component)
      
      const file = createMockFile('test.txt', 1024)
      await wrapper.vm.processFiles({ target: { files: [file] } })
      await nextTick()
      
      expect(wrapper.text()).toContain('test.txt')
      
      // Remove the file
      await wrapper.vm.removeFile(file)
      await nextTick()
      
      expect(wrapper.emitted('remove')).toBeTruthy()
      expect(wrapper.text()).not.toContain('test.txt')
    })

    it('should remove invalid files correctly', async () => {
      wrapper = mount(Component, { props: { filesize: 1 } })
      
      const largeFile = createMockFile('large.txt', 2 * 1024 * 1024)
      await wrapper.vm.processFiles({ target: { files: [largeFile] } })
      await nextTick()
      
      expect(wrapper.text()).toContain('large.txt')
      
      // Remove the invalid file
      await wrapper.vm.removeInvalidFile(largeFile)
      await nextTick()
      
      expect(wrapper.emitted('remove-invalid')).toBeTruthy()
      expect(wrapper.text()).not.toContain('large.txt')
    })
  })

  describe('Utility Functions', () => {
    it('should convert bytes to human readable format using byteToSize helper', () => {
      wrapper = mount(Component)
      const vm = wrapper.vm
      
      expect(vm.byteToSize(1024)).toBe('1 kb')
      expect(vm.byteToSize(1048576)).toBe('1 mb')
      expect(vm.byteToSize(0)).toBe('n/a')
      expect(vm.byteToSize(1000000000000000)).toBe('n/a') // exceeds limit
    })

    it('should determine correct file type icons using isFileType helper', () => {
      wrapper = mount(Component)
      const vm = wrapper.vm
      
      expect(vm.isFileType('application/pdf')).toBe('pdf')
      expect(vm.isFileType('application/msword')).toBe('doc')
      expect(vm.isFileType('text/csv')).toBe('csv')
      expect(vm.isFileType('application/unknown')).toBe('generic')
    })

    it('should generate image URLs for valid image files using uploadedImgSrc helper', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['image/jpeg'] } })
      const vm = wrapper.vm
      const imageFile = createMockFile('photo.jpg', 1024, 'image/jpeg')
      
      const result = vm.uploadedImgSrc(imageFile, ['image/jpeg'])
      expect(result).toBe('mock-object-url')
      
      const nonImageFile = createMockFile('doc.pdf', 1024, 'application/pdf')
      const nonImageResult = vm.uploadedImgSrc(nonImageFile, ['application/pdf'])
      expect(nonImageResult).toBeUndefined()
    })
  })

  describe('Props and Configuration', () => {
    it('should handle multiple files when multiple prop is true', async () => {
      wrapper = mount(Component, { props: { multiple: true } })
      
      const file1 = createMockFile('file1.txt', 1024)
      const file2 = createMockFile('file2.txt', 1024)
      
      await wrapper.vm.processFiles({ target: { files: [file1, file2] } })
      await nextTick()
      
      expect(wrapper.text()).toContain('file1.txt')
      expect(wrapper.text()).toContain('file2.txt')
    })

    it('should handle required attribute correctly', () => {
      wrapper = mount(Component, { props: { required: true } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('required')).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty file selection gracefully', async () => {
      wrapper = mount(Component)
      
      const mockEvent = { target: { files: [] } }
      await wrapper.vm.processFiles(mockEvent)
      
      // Should not throw error
      expect(wrapper.find('[data-id="sds-file-uploader"]').exists()).toBe(true)
    })

    it('should prevent duplicate files from being added', async () => {
      wrapper = mount(Component, { props: { multiple: true } })
      const file = createMockFile('test.txt', 1024, 'text/plain', 123456789)
      
      // Add file twice
      await wrapper.vm.processFiles({ target: { files: [file] } })
      await wrapper.vm.processFiles({ target: { files: [file] } })
      await nextTick()
      
      // Should only appear once in the file list
      const fileCount = wrapper.vm.fileList.filter((f: File) => f.name === 'test.txt').length
      expect(fileCount).toBe(1)
    })

    it('should calculate file sizes correctly in megabytes', () => {
      wrapper = mount(Component)
      const file = createMockFile('test.txt', 2 * 1024 * 1024) // 2MB
      
      const sizeInMB = wrapper.vm.processFileSize(file)
      expect(sizeInMB).toBeCloseTo(2, 3)
    })
  })

  describe('Accessibility', () => {
    it('should have proper screen reader support for remove buttons', async () => {
      wrapper = mount(Component)
      
      const file = createMockFile('test.txt', 1024)
      await wrapper.vm.processFiles({ target: { files: [file] } })
      await nextTick()
      
      const srText = wrapper.find('.sr-only')
      expect(srText.exists()).toBe(true)
      expect(srText.text()).toBe('Remove file')
    })

    it('should have proper label association', () => {
      wrapper = mount(Component)
      const label = wrapper.find('label')
      const input = wrapper.find('input[type="file"]')
      
      expect(label.exists()).toBe(true)
      expect(input.exists()).toBe(true)
      expect(label.attributes('for')).toBe(input.attributes('id'))
    })
  })

  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      wrapper = mount(Component, {
        directives: {
          'uid': {
            created(el: HTMLElement) {
              el.setAttribute('id', 'unique-id')
            }
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})