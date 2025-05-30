import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "@/Redux/Reducers/AuthSlice";
import RoleSlice from "./Reducers/AdminOptions/roleSlice/RoleSlice";
import UsersSlice from "./Reducers/userSlice/UserSlice";
import ProjectSlice from "@/Redux/Reducers/projectSlice/projectSlice";
import ProjectTypeSlice from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import FilterSlice from "./Reducers/FilterSlice";
import OtherSlice from "@/Redux/Reducers/otherSlice/otherSlice";
import NotificationSlice from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import PartnerShipSlice from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import PartnerSlice from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import ProjectCategorySlice from "@/Redux/Reducers/projectSlice/ProjectCategory"
import ProjectPhaseSlice from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";
import EventsTypeSlice from "@/Redux/Reducers/eventSlice/EventTypeSlice";
import EventSlice from "@/Redux/Reducers/eventSlice/eventSlice";
import ExpertiseSlice from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import PositionSlice from "@/Redux/Reducers/userSlice/PositionSlice";
import ProgramSlice from "@/Redux/Reducers/programSlice/programSlice";
import ProjectDocumentSlice from "@/Redux/Reducers/projectSlice/ProjectDocumentSlice";
import PhaseApplicationSlice from "@/Redux/Reducers/projectSlice/ProjectApplicationSlice";
import PostCategorySlice from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import PostSlice from "@/Redux/Reducers/BlogSlice/postSlice";
import ChatRoomSlice from "@/Redux/Reducers/ChatSlice/ChatRoomSlice";
import ActivitySlice from "@/Redux/Reducers/ActivitySlice";
import EvenementSlice from "@/Redux/Reducers/evenement"



const Store = configureStore({

  reducer : {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    project: ProjectSlice,
    projectType: ProjectTypeSlice,
    users : UsersSlice,
    role: RoleSlice,
    filterData: FilterSlice,
    auth: AuthSlice,
    partnerShip: PartnerShipSlice,
    partner: PartnerSlice,
    otherProgram : OtherSlice,
    notifications: NotificationSlice,
    projectCategory: ProjectCategorySlice,
    projectPhase: ProjectPhaseSlice,
    eventType: EventsTypeSlice,
    event: EventSlice,
    expertise : ExpertiseSlice,
    position: PositionSlice,
    program: ProgramSlice,
    projectDocument: ProjectDocumentSlice,
    PhaseApplication: PhaseApplicationSlice,
    postCategory: PostCategorySlice,
    post: PostSlice,
    chat: ChatRoomSlice,
    activity: ActivitySlice,
    evenement: EvenementSlice
  },

  middleware : getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,}),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
