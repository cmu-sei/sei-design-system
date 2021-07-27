import SdsAutosuggest from "./Autosuggest/Autosuggest.vue";
import SdsCalendar from "./Calendar/Calendar.vue";
import SdsCharacterCounter from "./CharacterCounter/CharacterCounter.vue"
import SdsDatepicker from "./Datepicker/Datepicker.vue";
import SdsDropdown from "./Dropdown/Dropdown.vue";
import SdsDropdownDivider from "./DropdownDivider/DropdownDivider.vue";
import SdsDropdownHeader from "./DropdownHeader/DropdownHeader.vue";
import SdsDropdownItem from "./DropdownItem/DropdownItem.vue";
import SdsExternalLink from "./ExternalLink/ExternalLink.vue";
import SdsFilterByDropdown from "./FilterByDropdown/FilterByDropdown.vue";
import SdsInput from "./Input/Input.vue"
import SdsLayoutFixedSidebar from "./LayoutFixedSidebar/LayoutFixedSidebar.vue";
import SdsLayoutSeiExternal from "./LayoutSeiExternal/LayoutSeiExternal.vue";
import SdsLayoutSeiExternalFooter from "./LayoutSeiExternalFooter/LayoutSeiExternalFooter.vue";
import SdsLayoutSeiExternalHeader from "./LayoutSeiExternalHeader/LayoutSeiExternalHeader.vue";
import SdsLayoutSeiExternalHeaderContent from "./LayoutSeiExternalHeaderContent/LayoutSeiExternalHeaderContent.vue";
import SdsLayoutSeiExternalMasthead from "./LayoutSeiExternalMasthead/LayoutSeiExternalMasthead.vue";
import SdsLayoutSeiExternalNav from "./LayoutSeiExternalNav/LayoutSeiExternalNav.vue";
import SdsLayoutSeiExternalWordmark from "./LayoutSeiExternalWordmark/LayoutSeiExternalWordmark.vue";
import SdsLayoutStacked from "./LayoutStacked/LayoutStacked.vue";
import SdsModal from "./Modal/Modal.vue";
import SdsMultiselect from "./Multiselect/Multiselect.vue";
import SdsPaginator from "./Paginator/Paginator.vue";
import SdsRadioGroup from "./RadioGroup/RadioGroup.vue";
import SdsScrollspy from "./Scrollspy/Scrollspy.vue";
import SdsSearchBox from "./SearchBox/SearchBox.vue";
import SdsSection from "./Section/Section.vue";
import SdsSortableTable from "./SortableTable/SortableTable.vue";
import SdsTextarea from "./Textarea/Textarea.vue";
import SdsToaster from "./Toaster/Toaster.vue";
import SdsTopFiveChart from "./TopFiveChart/TopFiveChart.vue";

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