import { App, Component } from "vue";
import SdsAutosuggest from "./Autosuggest";
import SdsAvatar from "./Avatar";
import SdsBadge from "./Badge";
import SdsButton from "./Button";
import SdsCalendar from "./Calendar";
import SdsCheckboxGroup from "./CheckboxGroup";
import SdsClientOnly from "./ClientOnly";
import SdsDatapoint from "./Datapoint";
import SdsDatepicker from "./Datepicker";
import SdsDropdown from "./Dropdown";
import SdsDropdownDivider from "./DropdownDivider";
import SdsDropdownHeader from "./DropdownHeader";
import SdsDropdownItem from "./DropdownItem";
import SdsFileUploader from "./FileUploader";
import SdsFilterByDropdown from "./FilterByDropdown";
import SdsFloatingActionButton from "./FloatingActionButton";
import SdsFloatingUi from "./FloatingUi";
import SdsIndicator from "./Indicator"
import SdsInput from "./Input"
import SdsLayoutApp from "./LayoutApp";
import SdsLayoutAppSimple from "./LayoutAppSimple";
import SdsLayoutSeiExternal from "./LayoutSeiExternal";
import SdsLayoutSeiExternalFooter from "./LayoutSeiExternalFooter";
import SdsLayoutSeiExternalHeader from "./LayoutSeiExternalHeader";
import SdsLayoutSeiExternalHeaderContent from "./LayoutSeiExternalHeaderContent";
import SdsLayoutSeiExternalMasthead from "./LayoutSeiExternalMasthead";
import SdsLayoutSeiExternalNav from "./LayoutSeiExternalNav";
import SdsLayoutSeiExternalWordmark from "./LayoutSeiExternalWordmark";
import SdsLayoutStacked from "./LayoutStacked";
import SdsLink from "./Link";
import SdsLoadingBox from "./LoadingBox";
import SdsLoadingSpinner from "./LoadingSpinner";
import SdsMegaMenu from "./MegaMenu";
import SdsMegaMenuItem from "./MegaMenuItem";
import SdsModal from "./Modal";
import SdsMultiselect from "./Multiselect";
import SdsPaginator from "./Paginator";
import SdsPopover from "./Popover";
import SdsRadioGroup from "./RadioGroup";
import SdsScrollArea from "./ScrollArea";
import SdsScrollspy from "./Scrollspy";
import SdsSearchBox from "./SearchBox";
import SdsSection from "./Section";
import SdsSelect from "./Select";
import SdsTabs from "./Tabs";
import SdsTable from "./Table";
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
  SdsAutosuggest,
  SdsAvatar,
  SdsBadge,
  SdsButton,
  SdsCalendar,
  SdsCheckboxGroup,
  SdsClientOnly,
  SdsDatapoint,
  SdsDatepicker,
  SdsDropdown,
  SdsDropdownDivider,
  SdsDropdownHeader,
  SdsDropdownItem,
  SdsFileUploader,
  SdsFilterByDropdown,
  SdsFloatingActionButton,
  SdsFloatingUi,
  SdsIndicator,
  SdsInput,
  SdsLayoutApp,
  SdsLayoutAppSimple,
  SdsLayoutSeiExternal,
  SdsLayoutSeiExternalFooter,
  SdsLayoutSeiExternalHeader,
  SdsLayoutSeiExternalHeaderContent,
  SdsLayoutSeiExternalMasthead,
  SdsLayoutSeiExternalNav,
  SdsLayoutSeiExternalWordmark,
  SdsLayoutStacked,
  SdsLink,
  SdsLoadingBox,
  SdsLoadingSpinner,
  SdsMegaMenu,
  SdsMegaMenuItem,
  SdsModal,
  SdsMultiselect,
  SdsPaginator,
  SdsPopover,
  SdsRadioGroup,
  SdsScrollArea,
  SdsScrollspy,
  SdsSearchBox,
  SdsSection,
  SdsSelect,
  SdsTabs,
  SdsTable,
  SdsTextarea,
  SdsToast,
  SdsToaster,
  SdsToggleSwitch,
  SdsTooltip,
  SdsTopFiveChart,
};

export default {
  install(Vue: App) {
    Object.keys(Components).forEach((name: any) => {
      Vue.component(name, Components[name]);
    });
  },
};

export { default as SdsAutosuggest } from "./Autosuggest";
export { default as SdsAvatar } from "./Avatar";
export { default as SdsBadge } from "./Badge";
export { default as SdsButton } from "./Button";
export { default as SdsCalendar } from "./Calendar";
export { default as SdsCheckboxGroup } from "./CheckboxGroup";
export { default as SdsClientOnly } from "./ClientOnly";
export { default as SdsDatapoint } from "./Datapoint";
export { default as SdsDatepicker } from "./Datepicker";
export { default as SdsDropdown } from "./Dropdown";
export { default as SdsDropdownDivider } from "./DropdownDivider";
export { default as SdsDropdownHeader } from "./DropdownHeader";
export { default as SdsDropdownItem } from "./DropdownItem";
export { default as SdsFileUploader } from "./FileUploader";
export { default as SdsFilterByDropdown } from "./FilterByDropdown";
export { default as SdsFloatingActionButton } from "./FloatingActionButton"
export { default as SdsFloatingUi } from "./FloatingUi"
export { default as SdsIndicator } from "./Indicator"
export { default as SdsInput } from "./Input"
export { default as SdsLayoutApp } from "./LayoutApp";
export { default as SdsLayoutAppSimple } from "./LayoutAppSimple";
export { default as SdsLayoutSeiExternal } from "./LayoutSeiExternal";
export { default as SdsLayoutSeiExternalFooter } from "./LayoutSeiExternalFooter";
export { default as SdsLayoutSeiExternalHeader } from "./LayoutSeiExternalHeader";
export { default as SdsLayoutSeiExternalHeaderContent } from "./LayoutSeiExternalHeaderContent";
export { default as SdsLayoutSeiExternalMasthead } from "./LayoutSeiExternalMasthead";
export { default as SdsLayoutSeiExternalNav } from "./LayoutSeiExternalNav";
export { default as SdsLayoutSeiExternalWordmark } from "./LayoutSeiExternalWordmark";
export { default as SdsLayoutStacked } from "./LayoutStacked";
export { default as SdsLink } from "./Link";
export { default as SdsLoadingBox } from "./LoadingBox";
export { default as SdsLoadingSpinner } from "./LoadingSpinner";
export { default as SdsMegaMenu } from "./MegaMenu";
export { default as SdsMegaMenuItem } from "./MegaMenuItem";
export { default as SdsModal } from "./Modal";
export { default as SdsMultiselect } from "./Multiselect";
export { default as SdsPaginator } from "./Paginator";
export { default as SdsPopover } from "./Popover";
export { default as SdsRadioGroup } from "./RadioGroup";
export { default as SdsScrollArea } from "./ScrollArea";
export { default as SdsScrollspy } from "./Scrollspy";
export { default as SdsSearchBox } from "./SearchBox";
export { default as SdsSection } from "./Section";
export { default as SdsSelect } from "./Select";
export { default as SdsTabs } from "./Tabs";
export { default as SdsTable } from "./Table";
export { default as SdsTextarea } from "./Textarea";
export { default as SdsToast } from "./Toast";
export { default as SdsToaster } from "./Toaster";
export { default as SdsToggleSwitch } from "./ToggleSwitch";
export { default as SdsTooltip } from "./Tooltip";
export { default as SdsTopFiveChart } from "./TopFiveChart";
