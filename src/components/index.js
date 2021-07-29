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

export { default as SdsAutosuggest } from "./Autosuggest/Autosuggest.vue";
export { default as SdsCalendar } from "./Calendar/Calendar.vue";
export { default as SdsCharacterCounter } from "./CharacterCounter/CharacterCounter.vue"
export { default as SdsDatepicker } from "./Datepicker/Datepicker.vue";
export { default as SdsDropdown } from "./Dropdown/Dropdown.vue";
export { default as SdsDropdownDivider } from "./DropdownDivider/DropdownDivider.vue";
export { default as SdsDropdownHeader } from "./DropdownHeader/DropdownHeader.vue";
export { default as SdsDropdownItem } from "./DropdownItem/DropdownItem.vue";
export { default as SdsExternalLink } from "./ExternalLink/ExternalLink.vue";
export { default as SdsFilterByDropdown } from "./FilterByDropdown/FilterByDropdown.vue";
export { default as SdsInput } from "./Input/Input.vue"
export { default as SdsLayoutFixedSidebar } from "./LayoutFixedSidebar/LayoutFixedSidebar.vue";
export { default as SdsLayoutSeiExternal } from "./LayoutSeiExternal/LayoutSeiExternal.vue";
export { default as SdsLayoutSeiExternalFooter } from "./LayoutSeiExternalFooter/LayoutSeiExternalFooter.vue";
export { default as SdsLayoutSeiExternalHeader } from "./LayoutSeiExternalHeader/LayoutSeiExternalHeader.vue";
export { default as SdsLayoutSeiExternalHeaderContent } from "./LayoutSeiExternalHeaderContent/LayoutSeiExternalHeaderContent.vue";
export { default as SdsLayoutSeiExternalMasthead } from "./LayoutSeiExternalMasthead/LayoutSeiExternalMasthead.vue";
export { default as SdsLayoutSeiExternalNav } from "./LayoutSeiExternalNav/LayoutSeiExternalNav.vue";
export { default as SdsLayoutSeiExternalWordmark } from "./LayoutSeiExternalWordmark/LayoutSeiExternalWordmark.vue";
export { default as SdsLayoutStacked } from "./LayoutStacked/LayoutStacked.vue";
export { default as SdsModal } from "./Modal/Modal.vue";
export { default as SdsMultiselect } from "./Multiselect/Multiselect.vue";
export { default as SdsPaginator } from "./Paginator/Paginator.vue";
export { default as SdsRadioGroup } from "./RadioGroup/RadioGroup.vue";
export { default as SdsScrollspy } from "./Scrollspy/Scrollspy.vue";
export { default as SdsSearchBox } from "./SearchBox/SearchBox.vue";
export { default as SdsSection } from "./Section/Section.vue";
export { default as SdsSortableTable } from "./SortableTable/SortableTable.vue";
export { default as SdsTextarea } from "./Textarea/Textarea.vue";
export { default as SdsToaster } from "./Toaster/Toaster.vue";
export { default as SdsTopFiveChart } from "./TopFiveChart/TopFiveChart.vue";