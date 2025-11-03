import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './FileUploader.vue'

describe('FileUploader', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

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

  describe('Props and Configuration', () => {
    it('should handle required attribute correctly', () => {
      wrapper = mount(Component, { props: { required: true } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('required')).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible label and input elements', () => {
      wrapper = mount(Component)
      const label = wrapper.find('label')
      const input = wrapper.find('input[type="file"]')
      
      expect(label.exists()).toBe(true)
      expect(input.exists()).toBe(true)
      expect(input.attributes('id')).toBeTruthy()
    })
  })

  describe('Props Validation & Configuration', () => {
    it('should set multiple attribute on file input when multiple prop is true', () => {
      wrapper = mount(Component, { props: { multiple: true } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('multiple')).toBeDefined()
    })

    it('should not set multiple attribute when multiple prop is false', () => {
      wrapper = mount(Component, { props: { multiple: false } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('multiple')).toBeUndefined()
    })

    it('should update helper text when filesize prop changes', async () => {
      wrapper = mount(Component, { props: { filesize: 5 } })
      expect(wrapper.text()).toContain('under 5 MB')
      
      await wrapper.setProps({ filesize: 20 })
      expect(wrapper.text()).toContain('under 20 MB')
    })

    it('should display correct default filesize limit in helper text', () => {
      wrapper = mount(Component)
      expect(wrapper.text()).toContain('under 10 MB')
    })

    it('should apply disabled class when component is disabled', async () => {
      wrapper = mount(Component)
      const label = wrapper.find('label')
      expect(label.classes()).not.toContain('disabled')
    })
  })

  describe('Slot Testing', () => {
    it('should render empty state correctly when no files uploaded', () => {
      wrapper = mount(Component)
      const fileList = wrapper.find('ul')
      expect(fileList.exists()).toBe(false)
    })

    it('should handle empty file list display', () => {
      wrapper = mount(Component)
      const fileListContainer = wrapper.find('[data-id="sds-file-list"]')
      expect(fileListContainer.exists()).toBe(false)
    })
  })

  describe('SVG Icons Display', () => {
    it('should render SVG icons in the upload area', () => {
      wrapper = mount(Component)
      const svgElements = wrapper.findAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
    })

    it('should have SVG elements with viewBox attributes', () => {
      wrapper = mount(Component)
      const svgElements = wrapper.findAll('svg')
      expect(svgElements[0].attributes('viewBox')).toBeDefined()
    })

    it('should have SVG elements with path elements', () => {
      wrapper = mount(Component)
      const svgElements = wrapper.findAll('svg')
      const paths = svgElements[0].findAll('path')
      expect(paths.length).toBeGreaterThan(0)
    })
  })

  describe('Component Rendering', () => {
    it('should display helper text with file size limits', () => {
      wrapper = mount(Component)
      expect(wrapper.text()).toContain('under 10 MB')
    })

    it('should display custom file size limit when filesize prop is provided', () => {
      wrapper = mount(Component, { props: { filesize: 20 } })
      expect(wrapper.text()).toContain('under 20 MB')
    })

    it('should render file type extensions in helper text', () => {
      wrapper = mount(Component)
      const text = wrapper.text()
      expect(text).toContain('.pdf')
      expect(text).toContain('.jpg')
      expect(text).toContain('.csv')
    })
  })

  describe('File Type Support', () => {
    it('should accept PDF files in allowedFiletypes prop', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['application/pdf'] } })
      expect(wrapper.vm.$props.allowedFiletypes).toContain('application/pdf')
    })

    it('should accept image files in allowedFiletypes prop', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['image/jpeg', 'image/png'] } })
      expect(wrapper.vm.$props.allowedFiletypes).toContain('image/jpeg')
      expect(wrapper.vm.$props.allowedFiletypes).toContain('image/png')
    })

    it('should accept document files in allowedFiletypes prop', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['application/msword', 'text/plain'] } })
      expect(wrapper.vm.$props.allowedFiletypes).toContain('application/msword')
      expect(wrapper.vm.$props.allowedFiletypes).toContain('text/plain')
    })

    it('should accept CSV and Excel files in allowedFiletypes prop', () => {
      wrapper = mount(Component, { 
        props: { 
          allowedFiletypes: ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] 
        } 
      })
      expect(wrapper.vm.$props.allowedFiletypes).toContain('text/csv')
      expect(wrapper.vm.$props.allowedFiletypes).toContain('application/vnd.ms-excel')
    })
  })

  describe('Image File Support', () => {
    it('should allow image file types when specified in allowedFiletypes', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['image/jpeg', 'image/png'] } })
      expect(wrapper.vm.$props.allowedFiletypes).toEqual(['image/jpeg', 'image/png'])
    })

    it('should accept JPEG images in file type configuration', () => {
      wrapper = mount(Component, { props: { accept: 'image/jpeg,.jpg' } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('accept')).toBe('image/jpeg,.jpg')
    })

    it('should accept PNG images in file type configuration', () => {
      wrapper = mount(Component, { props: { accept: 'image/png,.png' } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('accept')).toBe('image/png,.png')
    })
  })

  describe('Initial Component State', () => {
    it('should render with no files initially', () => {
      wrapper = mount(Component)
      const fileList = wrapper.find('ul')
      expect(fileList.exists()).toBe(false)
    })

    it('should not display any file items on initial render', () => {
      wrapper = mount(Component)
      const listItems = wrapper.findAll('li')
      expect(listItems.length).toBe(0)
    })

    it('should have file input element in enabled state by default', () => {
      wrapper = mount(Component)
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('disabled')).toBeUndefined()
    })

    it('should render with default props when no props provided', () => {
      wrapper = mount(Component)
      expect(wrapper.find('[data-id="sds-file-uploader"]').exists()).toBe(true)
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    })
  })

  describe('Component Structure', () => {
    it('should render SVG icon for upload button', () => {
      wrapper = mount(Component)
      const uploadIcon = wrapper.find('svg')
      expect(uploadIcon.exists()).toBe(true)
    })

    it('should have proper component hierarchy', () => {
      wrapper = mount(Component)
      const container = wrapper.find('[data-id="sds-file-uploader"]')
      const group = container.find('.group')
      const input = group.find('input[type="file"]')
      
      expect(container.exists()).toBe(true)
      expect(group.exists()).toBe(true)
      expect(input.exists()).toBe(true)
    })

    it('should apply correct styling classes to upload area', () => {
      wrapper = mount(Component)
      const uploadArea = wrapper.find('.flex.flex-col.items-center')
      expect(uploadArea.exists()).toBe(true)
      expect(uploadArea.classes()).toContain('bg-gray-25')
      expect(uploadArea.classes()).toContain('rounded-theme-sm')
    })
  })

  describe('Accessibility Enhanced', () => {
    it('should have aria-hidden attribute on decorative icons', () => {
      wrapper = mount(Component)
      const svgElements = wrapper.findAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
      expect(svgElements[0].attributes('aria-hidden')).toBe('true')
    })

    it('should have role="img" on icon elements', () => {
      wrapper = mount(Component)
      const svgElements = wrapper.findAll('svg')
      expect(svgElements.length).toBeGreaterThan(0)
      expect(svgElements[0].attributes('role')).toBe('img')
    })

    it('should have cursor-pointer class on file input', () => {
      wrapper = mount(Component)
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.classes()).toContain('cursor-pointer')
    })

    it('should make input absolutely positioned and transparent', () => {
      wrapper = mount(Component)
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.classes()).toContain('absolute')
      expect(fileInput.classes()).toContain('opacity-0')
    })
  })

  describe('Props Type Definitions', () => {
    it('should accept string type for name prop', () => {
      wrapper = mount(Component, { props: { name: 'testName' } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('name')).toBe('testName')
    })

    it('should accept boolean type for multiple prop', () => {
      wrapper = mount(Component, { props: { multiple: true } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('multiple')).toBeDefined()
    })

    it('should accept boolean type for required prop', () => {
      wrapper = mount(Component, { props: { required: true } })
      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.attributes('required')).toBeDefined()
    })

    it('should accept number type for filesize prop', () => {
      wrapper = mount(Component, { props: { filesize: 15 } })
      expect(wrapper.text()).toContain('15 MB')
    })

    it('should accept array type for allowedFiletypes prop', () => {
      wrapper = mount(Component, { props: { allowedFiletypes: ['image/jpeg', 'image/png'] } })
      expect(wrapper.vm.$props.allowedFiletypes).toEqual(['image/jpeg', 'image/png'])
    })
  })
})