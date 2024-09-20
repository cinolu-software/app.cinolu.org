import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "@/Redux/Reducers/AuthSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ContactSlice from "./Reducers/ContactSlice";
import ProductSlice from "./Reducers/ProductSlice";
import ProjectSlice from "./Reducers/projectSlice/projectSlice";
import CategorySlice from "./Reducers/projectSlice/projectCategorySlice";
import StatusSlice from "./Reducers/projectSlice/projectStatusSlice";
import RoleSlice from "./Reducers/AdminOptions/roleSlice/RoleSlice";
import projectCategorySlice from "./Reducers/projectSlice/projectCategorySlice";
import UsersSlice from "./Reducers/userSlice/UserSlice";
import ProgramSlice from "./Reducers/programsSlice/programsSlice";
import ProgramsTypeSlice from "./Reducers/programsSlice/programsTypeSlice";
import FilterSlice from "./Reducers/FilterSlice";
import CartSlice from "./Reducers/CartSlice";
import AddProductSlice from "./Reducers/AddProductSlice";
import OtherSlice from "@/Redux/Reducers/otherSlice/otherSlice";
import NotificationSlice from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import StaffSlice from "@/Redux/Reducers/StaffSlice/StaffSlice";

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
    categories: projectCategorySlice,
    programs: ProgramSlice,
    programsType: ProgramsTypeSlice,
    users : UsersSlice,
    role: RoleSlice,
    filterData: FilterSlice,
    cartData: CartSlice,
    auth: AuthSlice,
    addProduct: AddProductSlice,
    staff: StaffSlice,

    otherProgram : OtherSlice,
    notifications: NotificationSlice,
  },
  

  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false,}),
  
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
