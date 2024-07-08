import { configureStore } from "@reduxjs/toolkit";

import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "@/Redux/Reducers/AuthSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ContactSlice from "./Reducers/ContactSlice";
import ProductSlice from "./Reducers/ProductSlice";

import UserAdminSlice from "./Reducers/userSlice/AdminSlice";
import UserCoachSlice from "./Reducers/userSlice/CoachSlice";
import MembersSlice from "./Reducers/userSlice/MembersSlice";
import PartnersSlice from "./Reducers/userSlice/PartnersSlice";
import InternetUsersSlice from "./Reducers/userSlice/InternetUsersSlice";
import ProjectSlice from "./Reducers/projectSlice/projectSlice";
import CategorySlice from "./Reducers/projectSlice/projectCategorySlice";
import StatusSlice from "./Reducers/projectSlice/projectStatusSlice";


const Store = configureStore({

  reducer : {

    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    letterBox: LetterBoxSlice,
    contact: ContactSlice,
    product: ProductSlice,

    project : ProjectSlice,
    projectCategory: CategorySlice,
    projectStatus: StatusSlice,

    userAdmin: UserAdminSlice,
    userCoach: UserCoachSlice,
    userMembers: MembersSlice,
    partners: PartnersSlice,
    internetUsers: InternetUsersSlice,
    auth: AuthSlice,

  },

  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,}),

});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
