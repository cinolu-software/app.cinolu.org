import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "@/Redux/Reducers/AuthSlice";
import RoleSlice from "./Reducers/AdminOptions/roleSlice/RoleSlice";
import UsersSlice from "./Reducers/userSlice/UserSlice";
import ProgramSlice from "./Reducers/programsSlice/programsSlice";
import ProgramsTypeSlice from "./Reducers/programsSlice/programsTypeSlice";
import FilterSlice from "./Reducers/FilterSlice";
import OtherSlice from "@/Redux/Reducers/otherSlice/otherSlice";
import NotificationSlice from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import PartnerShipSlice from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import PartnerSlice from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import ProgramCategorySlice from "@/Redux/Reducers/programsSlice/ProgramsCategory"
import ProgramPhaseSlice from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";
import EventsTypeSlice from "@/Redux/Reducers/eventSlice/EventTypeSlice";
import EventSlice from "@/Redux/Reducers/eventSlice/eventSlice";
import ExpertiseSlice from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import PositionSlice from "@/Redux/Reducers/userSlice/PositionSlice";

const Store = configureStore({

  reducer : {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    programs: ProgramSlice,
    programsType: ProgramsTypeSlice,
    users : UsersSlice,
    role: RoleSlice,
    filterData: FilterSlice,
    auth: AuthSlice,
    partnerShip: PartnerShipSlice,
    partner: PartnerSlice,
    otherProgram : OtherSlice,
    notifications: NotificationSlice,
    programCategory: ProgramCategorySlice,
    programPhase: ProgramPhaseSlice,
    eventType: EventsTypeSlice,
    event: EventSlice,
    expertise : ExpertiseSlice,
    position: PositionSlice,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,}),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
