import SdsActionButton from "./ActionButton";
import SdsActionDropdown from "./ActionDropdown";
import SdsAvatar from "./Avatar";
import SdsAvatarGroup from "./AvatarGroup";
import SdsBadge from "./Badge";
import SdsButton from "./Button";
import SdsCalendar from "./Calendar";
import SdsCheckboxGroup from "./CheckboxGroup";
import SdsClientOnly from "./ClientOnly";
import SdsComboBox from "./ComboBox";
import SdsDatapoint from "./Datapoint";
import SdsDatepicker from "./Datepicker";
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
import SdsIndicator from "./Indicator";
import SdsInput from "./Input";
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
import SdsPanel from "./Panel";
import SdsPopover from "./Popover";
import SdsRadioGroup from "./RadioGroup";
import SdsResizer from "./Resizer";
import SdsScrollArea from "./ScrollArea";
import SdsScrollspy from "./Scrollspy";
import SdsSection from "./Section";
import SdsSeiWordmark from "./SeiWordmark";
import SdsSelect from "./Select";
import SdsSvgIcon from './SvgIcon';
import SdsTabs from "./Tabs";
import SdsTable from "./Table";
import SdsTag from "./Tag";
import SdsTextarea from "./Textarea";
import SdsToast from "./Toast";
import SdsToaster from "./Toaster";
import SdsToggleSwitch from "./ToggleSwitch";
import SdsTooltip from "./Tooltip";
import SdsTopFiveChart from "./TopFiveChart";
const Components = {
    SdsActionButton,
    SdsActionDropdown,
    SdsAvatar,
    SdsAvatarGroup,
    SdsBadge,
    SdsButton,
    SdsCalendar,
    SdsCheckboxGroup,
    SdsClientOnly,
    SdsComboBox,
    SdsDatapoint,
    SdsDatepicker,
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
    SdsPanel,
    SdsPopover,
    SdsRadioGroup,
    SdsResizer,
    SdsScrollArea,
    SdsScrollspy,
    SdsSection,
    SdsSeiWordmark,
    SdsSelect,
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
    install(Vue) {
        Object.keys(Components).forEach((name) => {
            Vue.component(name, Components[name]);
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
export { default as SdsCheckboxGroup } from "./CheckboxGroup";
export { default as SdsClientOnly } from "./ClientOnly";
export { default as SdsComboBox } from "./ComboBox";
export { default as SdsDatapoint } from "./Datapoint";
export { default as SdsDatepicker } from "./Datepicker";
export { default as SdsDropdown } from "./Dropdown";
export { default as SdsDropdownDivider } from "./DropdownDivider";
export { default as SdsDropdownHeader } from "./DropdownHeader";
export { default as SdsDropdownItem } from "./DropdownItem";
export { default as SdsExpandCollapse } from "./ExpandCollapse";
export { default as SdsFileUploader } from "./FileUploader";
export { default as SdsFilterByDropdown } from "./FilterByDropdown";
export { default as SdsFloatingActionButton } from "./FloatingActionButton";
export { default as SdsFloatingUi } from "./FloatingUi";
export { default as SdsFormGroup } from "./FormGroup";
export { default as SdsIndicator } from "./Indicator";
export { default as SdsInput } from "./Input";
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
export { default as SdsPanel } from "./Panel";
export { default as SdsPopover } from "./Popover";
export { default as SdsRadioGroup } from "./RadioGroup";
export { default as SdsResizer } from "./Resizer";
export { default as SdsScrollArea } from "./ScrollArea";
export { default as SdsScrollspy } from "./Scrollspy";
export { default as SdsSection } from "./Section";
export { default as SdsSeiWordmark } from "./SeiWordmark";
export { default as SdsSelect } from "./Select";
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
//# sourceMappingURL=index.js.map