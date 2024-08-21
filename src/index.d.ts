import type DropdownPlacement from './components/Dropdown'
import type { CalendarDate, CalendarMode, CalendarRange } from './components/Calendar/Calendar.vue'
import type { CheckboxGroupOption, CheckboxGroupOptionValue } from './components/CheckboxGroup/CheckboxGroup.vue'
import type { ComboBoxSuggestion } from './components/ComboBox/ComboBox.vue'
import type { DatepickerPlacement } from './components/Datepicker/Datepicker.vue'
import type { FileWithInvalidDefinitions } from './components/FileUploader/FileUploader.vue'
import type { FilterByDropdownOption, FilterByDropdownPlacement } from './components/FilterByDropdown/FilterByDropdown.vue'
import type { FloatingUiPlacement } from './components/FloatingUi/FloatingUi.vue'
import type { LayoutAppSidebarNavItem } from './components/LayoutApp/LayoutApp.vue'
import type { MegaMenuItem } from './components/MegaMenu/MegaMenu.vue'
import type { MobileMenuItem } from './components/MobileMenu/MobileMenu.vue'
import type { MultiselectOption, MultiselectTag } from './components/Multiselect/Multiselect.vue'
import type { PopoverPlacement } from './components/Popover/Popover.vue'
import type { RadioGroupOption, RadioGroupOptionValue } from './components/RadioGroup/RadioGroup.vue'
import type { SelectOption, SelectOptionValue } from './components/Select/Select.vue'
import type { TableField, TableItem } from './components/Table/Table.vue'
import type { TabItem } from './components/Tabs/Tabs.vue'
import type { ToasterToast } from './components/Toaster/Toaster.vue'
import type { TooltipPlacement } from './components/Tooltip/Tooltip.vue'
import type { TopFiveChartResult } from './components/TopFiveChart/TopFiveChart.vue'

type GenericFunctionType = (...arg: any) => void

export type { 
  GenericFunctionType,
  DropdownPlacement,
  CalendarDate,
  CalendarMode,
  CalendarRange,
  CheckboxGroupOption,
  CheckboxGroupOptionValue,
  ComboBoxSuggestion,
  DatepickerPlacement,
  FileWithInvalidDefinitions,
  FilterByDropdownOption,
  FilterByDropdownPlacement,
  FloatingUiPlacement,
  LayoutAppSidebarNavItem,
  MegaMenuItem,
  MobileMenuItem,
  MultiselectOption,
  MultiselectTag,
  PopoverPlacement,
  RadioGroupOption,
  RadioGroupOptionValue,
  SelectOption,
  SelectOptionValue,
  TableField,
  TableItem,
  TabItem,
  ToasterToast,
  TooltipPlacement,
  TopFiveChartResult
}