import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import AuthSlice from "@/Redux/Reducers/AuthSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ContactSlice from "./Reducers/ContactSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    letterBox: LetterBoxSlice,
    contact: ContactSlice,
    auth: AuthSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
