import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InboxNotificationData } from "@/Data/Application/Notifications";
import { InitialStateType } from '@/Types/Notifications/NotificationType';


export const createNotification = createAsyncThunk(
    'NotificationBox/sendNotification',
    async ({ title, message, recipients }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/notifications', {
                title,
                message,
                recipients
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const uploadAttachment = createAsyncThunk(
    'NotificationBox/uploadAttachment',
    async ({ notificationId, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('attachment', file);
            const response = await axios.post(`/notifications/attachment/${notificationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: InitialStateType = {
    modal: false,
    composeNotification: false,
    faIcon: false,
    page: false,
    interviewNotification: false,
    inboxNotification: InboxNotificationData,
    notificationValidation: false,
    selectedUser: null,
    formValue: {
        title: "",
        message: '',
        attachment: ''
    },
    navId: 1,
    tabId: 1,
    loading: false,
    error: null,
};

const NotificationBoxSlice = createSlice({
    name: "NotificationBox",
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        setComposeNotification: (state, action) => {
            state.composeNotification = action.payload;
        },
        handleEnvelope: (state, action) => {
            state.faIcon = action.payload;
        },
        handleInterview: (state, action) => {
            state.interviewNotification = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setFormValue: (state, action) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setNavId: (state, action) => {
            state.navId = action.payload;
        },
        setTabId: (state, action) => {
            state.tabId = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        removeItems: (state, action) => {
            state.inboxNotification = state.inboxNotification?.filter((data) => data.id !== action.payload);
        },
        addToFavorites: (state, action) => {
            state.inboxNotification = state.inboxNotification.map((item) =>
                item.id === action.payload.id ? { ...item, star: true } : item
            );
        },
        removeFromFavorite: (state, action) => {
            state.inboxNotification = state.inboxNotification.map((data) =>
                data.id === action.payload.id ? { ...data, star: false } : data
            );
        },
        setNotificationValidation: (state, action) => {
            state.notificationValidation = action.payload;
        },
        addNewNotifaction: (state, action) => {
            const notificationTemp = {
                id: state.inboxNotification.length + 1,
                star: false,
                image: "14.png",
                color: "primary",
                name: action.payload.userNotification,
                message: action.payload.subject,
                subMessage: "craft beer labore wes anderson cred nesciunt sapiente ea proident...",
                time: '7:50 AM'
            };
            state.inboxNotification = [notificationTemp, ...state.inboxNotification];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNotification.fulfilled, (state, action) => {
                state.loading = false;
                // La notification a été envoyée avec succès
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(uploadAttachment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadAttachment.fulfilled, (state, action) => {
                state.loading = false;
                // Le fichier joint a été envoyé avec succès
            })
            .addCase(uploadAttachment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setModal,
    setTabId,
    setComposeNotification,
    setPage,
    handleEnvelope,
    handleInterview,
    removeItems,
    addToFavorites,
    removeFromFavorite,
    setNotificationValidation,
    addNewNotifaction,
    setSelectedUser,
    setFormValue,
    setNavId
} = NotificationBoxSlice.actions;

export default NotificationBoxSlice.reducer;
