import type DropdownPlacement from './Dropdown'
import type { AvatarGroupItem } from './AvatarGroup/AvatarGroup.vue'
import type { TagActionType, TagIconAttrs, TagIconSize, TagIconTypes } from './Tag/Tag.vue'
import type { CalendarDate, CalendarMode, CalendarRange } from './Calendar/Calendar.vue'
import type { CheckboxGroupOption, CheckboxGroupOptionValue } from './CheckboxGroup/CheckboxGroup.vue'
import type { ComboBoxSuggestion } from './ComboBox/ComboBox.vue'
import type { DatepickerPlacement } from './Datepicker/Datepicker.vue'
import type { DataTableFilterConfig, DataTableFilterType, DataTableSegments } from './DataTable/DataTable.vue'
import type { FileWithInvalidDefinitions, FileTypes, SvgIconTypes, SvgIcons } from './FileUploader/FileUploader.vue'
import type { FilterByDropdownOption, FilterByDropdownPlacement } from './FilterByDropdown/FilterByDropdown.vue'
import type { FloatingUiPlacement } from './FloatingUi/FloatingUi.vue'
import type { ApplicationSidebarNavItem } from './Application/Application.vue'
import type { MegaMenuItem } from './MegaMenu/MegaMenu.vue'
import type { MobileMenuItem } from './MobileMenu/MobileMenu.vue'
import type { MultiselectOption, MultiselectTag } from './Multiselect/Multiselect.vue'
import type { PaginatorProps } from './Paginator/Paginator.vue'
import type { PaginatorRangeProps } from './PaginatorRange/PaginatorRange.vue'
import type { PopoverPlacement } from './Popover/Popover.vue'
import type { RadioGroupOption, RadioGroupOptionValue } from './RadioGroup/RadioGroup.vue'
import type { SelectOption, SelectOptionValue } from './Select/Select.vue'
import type { SortByDropdownOption, SortByDropdownModel, SortByDropdownPlacement, SortByDropdownType } from './SortByDropdown/SortByDropdown.vue'
import type { TableField, TableItem, TableProps } from './Table/Table.vue'
import type { TabItem } from './Tabs/Tabs.vue'
import type { ToasterToast } from './Toaster/Toaster.vue'
import type { TooltipPlacement } from './Tooltip/Tooltip.vue'
import type { TopFiveChartResult } from './TopFiveChart/TopFiveChart.vue'

export type {
  DropdownPlacement,
  AvatarGroupItem,
  TagActionType,
  TagIconAttrs,
  TagIconSize,
  TagIconTypes,
  CalendarDate,
  CalendarMode,
  CalendarRange,
  CheckboxGroupOption,
  CheckboxGroupOptionValue,
  ComboBoxSuggestion,
  DatepickerPlacement,
  DataTableFilterConfig,
  DataTableFilterType,
  DataTableSegments,
  FileWithInvalidDefinitions,
  FilterByDropdownOption,
  FilterByDropdownPlacement,
  FileTypes,
  FloatingUiPlacement,
  ApplicationSidebarNavItem,
  MegaMenuItem,
  MobileMenuItem,
  MultiselectOption,
  MultiselectTag,
  PaginatorProps,
  PaginatorRangeProps,
  PopoverPlacement,
  RadioGroupOption,
  RadioGroupOptionValue,
  SelectOption,
  SelectOptionValue,
  SortByDropdownOption,
  SortByDropdownModel,
  SortByDropdownPlacement,
  SortByDropdownType,
  SvgIcons,
  SvgIconTypes,
  TableField,
  TableItem,
  TableProps,
  TabItem,
  ToasterToast,
  TooltipPlacement,
  TopFiveChartResult
}

import { App, Component } from "vue";
import SdsActionButton from "./ActionButton";
import SdsActionDropdown from "./ActionDropdown";
import SdsAvatar from "./Avatar";
import SdsAvatarGroup from "./AvatarGroup";
import SdsBadge from "./Badge";
import SdsButton from "./Button";
import SdsCalendar from "./Calendar";
import SdsCallout from "./Callout";
import SdsCheckboxGroup from "./CheckboxGroup";
import SdsClientOnly from "./ClientOnly";
import SdsComboBox from "./ComboBox";
import SdsDatapoint from "./Datapoint";
import SdsDatepicker from "./Datepicker";
import SdsDataTable from "./DataTable";
import SdsDropdown from "./Dropdown";
import SdsDropdownDivider from "./DropdownDivider";
import SdsDropdownHeader from "./DropdownHeader";
import SdsDropdownItem from "./DropdownItem";
import SdsExpandCollapse from "./ExpandCollapse";
import SdsFileUploader from "./FileUploader";
import SdsFilterByDropdown from "./FilterByDropdown";
import SdsFloatingActionButton from "./FloatingActionButton";
import SdsFloatingUi from "./FloatingUi";
import SdsFormGroup from "./FormGroup";
import SdsIndicator from "./Indicator"
import SdsInput from "./Input"
import SdsApplication from "./Application";
import SdsSimpleApplication from "./SimpleApplication";
import SdsBrochureSite from "./BrochureSite";
import SdsBrochureSiteFooter from "./BrochureSiteFooter";
import SdsBrochureSiteHeader from "./BrochureSiteHeader";
import SdsBrochureSiteHeaderContent from "./BrochureSiteHeaderContent";
import SdsBrochureSiteNav from "./BrochureSiteNav";
import SdsBrochureSiteWordmark from "./BrochureSiteWordmark";
import SdsStructuredPage from "./StructuredPage";
import SdsLink from "./Link";
import SdsLoadingSkeleton from "./LoadingSkeleton";
import SdsLoadingSpinner from "./LoadingSpinner";
import SdsMegaMenu from "./MegaMenu";
import SdsMegaMenuItem from "./MegaMenuItem";
import SdsMobileMenu from "./MobileMenu";
import SdsModal from "./Modal";
import SdsMultiselect from "./Multiselect";
import SdsNavigationItem from "./NavigationItem";
import SdsPaginator from "./Paginator";
import SdsPaginatorRange from "./PaginatorRange";
import SdsPanel from "./Panel";
import SdsPopover from "./Popover";
import SdsRadioGroup from "./RadioGroup";
import SdsResizer from "./Resizer";
import SdsScrollArea from "./ScrollArea";
import SdsScrollspy from "./Scrollspy";
import SdsSection from "./Section";
import SdsSeiWordmark from "./SeiWordmark";
import SdsSelect from "./Select";
import SdsSortByDropdown from './SortByDropdown/SortByDropdown.vue';
import SdsSvgIcon from './SvgIcon'
import SdsTabs from "./Tabs";
import SdsTable from "./Table";
import SdsTag from "./Tag";
import SdsTextarea from "./Textarea";
import SdsToast from "./Toast";
import SdsToaster from "./Toaster";
import SdsToggleSwitch from "./ToggleSwitch";
import SdsTooltip from "./Tooltip";
import SdsTopFiveChart from "./TopFiveChart";

interface ComponentList {
  [index: string]: Component
}

const Components: ComponentList = {
  SdsActionButton,
  SdsActionDropdown,
  SdsAvatar,
  SdsAvatarGroup,
  SdsBadge,
  SdsButton,
  SdsCalendar,
  SdsCallout,
  SdsCheckboxGroup,
  SdsClientOnly,
  SdsComboBox,
  SdsDatapoint,
  SdsDatepicker,
  SdsDataTable,
  SdsDropdown,
  SdsDropdownDivider,
  SdsDropdownHeader,
  SdsDropdownItem,
  SdsExpandCollapse,
  SdsFileUploader,
  SdsFilterByDropdown,
  SdsFloatingActionButton,
  SdsFloatingUi,
  SdsFormGroup,
  SdsIndicator,
  SdsInput,
  SdsApplication,
  SdsSimpleApplication,
  SdsBrochureSite,
  SdsBrochureSiteFooter,
  SdsBrochureSiteHeader,
  SdsBrochureSiteHeaderContent,
  SdsBrochureSiteNav,
  SdsBrochureSiteWordmark,
  SdsStructuredPage,
  SdsLink,
  SdsLoadingSkeleton,
  SdsLoadingSpinner,
  SdsMegaMenu,
  SdsMegaMenuItem,
  SdsMobileMenu,
  SdsModal,
  SdsMultiselect,
  SdsNavigationItem,
  SdsPaginator,
  SdsPaginatorRange,
  SdsPanel,
  SdsPopover,
  SdsRadioGroup,
  SdsResizer,
  SdsScrollArea,
  SdsScrollspy,
  SdsSection,
  SdsSeiWordmark,
  SdsSelect,
  SdsSortByDropdown,
  SdsSvgIcon,
  SdsTabs,
  SdsTable,
  SdsTag,
  SdsTextarea,
  SdsToast,
  SdsToaster,
  SdsToggleSwitch,
  SdsTooltip,
  SdsTopFiveChart,
};

export default {
  install(Vue: App) {
    Object.keys(Components).forEach((name) => {
      Vue.component(name as string, Components[name]);
    });
  },
};

export { default as SdsActionButton } from "./ActionButton";
export { default as SdsActionDropdown } from "./ActionDropdown";
export { default as SdsAvatar } from "./Avatar";
export { default as SdsAvatarGroup } from "./AvatarGroup";
export { default as SdsBadge } from "./Badge";
export { default as SdsButton } from "./Button";
export { default as SdsCalendar } from "./Calendar";
export { default as SdsCallout } from "./Callout";
export { default as SdsCheckboxGroup } from "./CheckboxGroup";
export { default as SdsClientOnly } from "./ClientOnly";
export { default as SdsComboBox } from "./ComboBox";
export { default as SdsDatapoint } from "./Datapoint";
export { default as SdsDatepicker } from "./Datepicker";
export { default as SdsDataTable } from "./DataTable";
export { default as SdsDropdown } from "./Dropdown";
export { default as SdsDropdownDivider } from "./DropdownDivider";
export { default as SdsDropdownHeader } from "./DropdownHeader";
export { default as SdsDropdownItem } from "./DropdownItem";
export { default as SdsExpandCollapse } from "./ExpandCollapse";
export { default as SdsFileUploader } from "./FileUploader";
export { default as SdsFilterByDropdown } from "./FilterByDropdown";
export { default as SdsFloatingActionButton } from "./FloatingActionButton"
export { default as SdsFloatingUi } from "./FloatingUi"
export { default as SdsFormGroup } from "./FormGroup"
export { default as SdsIndicator } from "./Indicator"
export { default as SdsInput } from "./Input"
export { default as SdsApplication } from "./Application";
export { default as SdsSimpleApplication } from "./SimpleApplication";
export { default as SdsBrochureSite } from "./BrochureSite";
export { default as SdsBrochureSiteFooter } from "./BrochureSiteFooter";
export { default as SdsBrochureSiteHeader } from "./BrochureSiteHeader";
export { default as SdsBrochureSiteHeaderContent } from "./BrochureSiteHeaderContent";
export { default as SdsBrochureSiteNav } from "./BrochureSiteNav";
export { default as SdsBrochureSiteWordmark } from "./BrochureSiteWordmark";
export { default as SdsStructuredPage } from "./StructuredPage";
export { default as SdsLink } from "./Link";
export { default as SdsLoadingSkeleton } from "./LoadingSkeleton";
export { default as SdsLoadingSpinner } from "./LoadingSpinner";
export { default as SdsMegaMenu } from "./MegaMenu";
export { default as SdsMegaMenuItem } from "./MegaMenuItem";
export { default as SdsMobileMenu } from "./MobileMenu";
export { default as SdsModal } from "./Modal";
export { default as SdsMultiselect } from "./Multiselect";
export { default as SdsNavigationItem } from "./NavigationItem";
export { default as SdsPaginator } from "./Paginator";
export { default as SdsPaginatorRange } from "./PaginatorRange";
export { default as SdsPanel} from "./Panel";
export { default as SdsPopover } from "./Popover";
export { default as SdsRadioGroup } from "./RadioGroup";
export { default as SdsResizer } from "./Resizer";
export { default as SdsScrollArea } from "./ScrollArea";
export { default as SdsScrollspy } from "./Scrollspy";
export { default as SdsSection } from "./Section";
export { default as SdsSeiWordmark } from "./SeiWordmark";
export { default as SdsSelect } from "./Select";
export { default as SdsSortByDropdown } from "./SortByDropdown";
export { default as SdsSvgIcon } from "./SvgIcon";
export { default as SdsTabs } from "./Tabs";
export { default as SdsTable } from "./Table";
export { default as SdsTag } from "./Tag";
export { default as SdsTextarea } from "./Textarea";
export { default as SdsToast } from "./Toast";
export { default as SdsToaster } from "./Toaster";
export { default as SdsToggleSwitch } from "./ToggleSwitch";
export { default as SdsTooltip } from "./Tooltip";
export { default as SdsTopFiveChart } from "./TopFiveChart";

// Export composables for consumers
export * from '../composables';
