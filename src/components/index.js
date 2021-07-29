import SdsAutosuggest from "./Autosuggest";
import SdsCalendar from "./Calendar";
import SdsCharacterCounter from "./CharacterCounter"
import SdsDatepicker from "./Datepicker";
import SdsDropdown from "./Dropdown";
import SdsDropdownDivider from "./DropdownDivider";
import SdsDropdownHeader from "./DropdownHeader";
import SdsDropdownItem from "./DropdownItem";
import SdsExternalLink from "./ExternalLink";
import SdsFilterByDropdown from "./FilterByDropdown";
import SdsInput from "./Input"
import SdsLayoutFixedSidebar from "./LayoutFixedSidebar";
import SdsLayoutSeiExternal from "./LayoutSeiExternal";
import SdsLayoutSeiExternalFooter from "./LayoutSeiExternalFooter";
import SdsLayoutSeiExternalHeader from "./LayoutSeiExternalHeader";
import SdsLayoutSeiExternalHeaderContent from "./LayoutSeiExternalHeaderContent";
import SdsLayoutSeiExternalMasthead from "./LayoutSeiExternalMasthead";
import SdsLayoutSeiExternalNav from "./LayoutSeiExternalNav";
import SdsLayoutSeiExternalWordmark from "./LayoutSeiExternalWordmark";
import SdsLayoutStacked from "./LayoutStacked";
import SdsModal from "./Modal";
import SdsMultiselect from "./Multiselect";
import SdsPaginator from "./Paginator";
import SdsRadioGroup from "./RadioGroup";
import SdsScrollspy from "./Scrollspy";
import SdsSearchBox from "./SearchBox";
import SdsSection from "./Section";
import SdsSortableTable from "./SortableTable";
import SdsTextarea from "./Textarea";
import SdsToaster from "./Toaster";
import SdsTopFiveChart from "./TopFiveChart";

const Components = {
  SdsAutosuggest,
  SdsCalendar,
  SdsCharacterCounter,
  SdsDatepicker,
  SdsDropdown,
  SdsDropdownDivider,
  SdsDropdownHeader,
  SdsDropdownItem,
  SdsExternalLink,
  SdsFilterByDropdown,
  SdsInput,
  SdsLayoutFixedSidebar,
  SdsLayoutSeiExternal,
  SdsLayoutSeiExternalFooter,
  SdsLayoutSeiExternalHeader,
  SdsLayoutSeiExternalHeaderContent,
  SdsLayoutSeiExternalMasthead,
  SdsLayoutSeiExternalNav,
  SdsLayoutSeiExternalWordmark,
  SdsLayoutStacked,
  SdsModal,
  SdsMultiselect,
  SdsPaginator,
  SdsRadioGroup,
  SdsScrollspy,
  SdsSearchBox,
  SdsSection,
  SdsSortableTable,
  SdsTextarea,
  SdsToaster,
  SdsTopFiveChart,
};

export default {
  install(Vue) {
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name]);
    });
  },
};

export { default as SdsAutosuggest } from "./Autosuggest";
export { default as SdsCalendar } from "./Calendar";
export { default as SdsCharacterCounter } from "./CharacterCounter"
export { default as SdsDatepicker } from "./Datepicker";
export { default as SdsDropdown } from "./Dropdown";
export { default as SdsDropdownDivider } from "./DropdownDivider";
export { default as SdsDropdownHeader } from "./DropdownHeader";
export { default as SdsDropdownItem } from "./DropdownItem";
export { default as SdsExternalLink } from "./ExternalLink";
export { default as SdsFilterByDropdown } from "./FilterByDropdown";
export { default as SdsInput } from "./Input"
export { default as SdsLayoutFixedSidebar } from "./LayoutFixedSidebar";
export { default as SdsLayoutSeiExternal } from "./LayoutSeiExternal";
export { default as SdsLayoutSeiExternalFooter } from "./LayoutSeiExternalFooter";
export { default as SdsLayoutSeiExternalHeader } from "./LayoutSeiExternalHeader";
export { default as SdsLayoutSeiExternalHeaderContent } from "./LayoutSeiExternalHeaderContent";
export { default as SdsLayoutSeiExternalMasthead } from "./LayoutSeiExternalMasthead";
export { default as SdsLayoutSeiExternalNav } from "./LayoutSeiExternalNav";
export { default as SdsLayoutSeiExternalWordmark } from "./LayoutSeiExternalWordmark";
export { default as SdsLayoutStacked } from "./LayoutStacked";
export { default as SdsModal } from "./Modal";
export { default as SdsMultiselect } from "./Multiselect";
export { default as SdsPaginator } from "./Paginator";
export { default as SdsRadioGroup } from "./RadioGroup";
export { default as SdsScrollspy } from "./Scrollspy";
export { default as SdsSearchBox } from "./SearchBox";
export { default as SdsSection } from "./Section";
export { default as SdsSortableTable } from "./SortableTable";
export { default as SdsTextarea } from "./Textarea";
export { default as SdsToaster } from "./Toaster";
export { default as SdsTopFiveChart } from "./TopFiveChart";