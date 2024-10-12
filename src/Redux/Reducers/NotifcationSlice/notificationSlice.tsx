import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";

interface NotificationPayload {
    title: string;
    message: string;
    recipients: string[];
    attachment?: File | null;
}

interface NotificationResponse {
    data: {
        id: string;
        title: string;
        message: string;
        recipients ?: Array<{ id: string }>;
        sender: { id: string };
        created_at: string;
        updated_at: string;
        is_read: boolean;
        attachment?: any;
    };
}

export const createNotification = createAsyncThunk<NotificationResponse, NotificationPayload>(
    'NotificationBox/sendNotification',
    async ({ title, message, recipients, attachment }, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.post<NotificationResponse>('/notifications', {
                title,
                message,
                recipients
            });

            const notificationData = response.data.data;
            const notificationId = notificationData.id;

            if (attachment && attachment instanceof File) {
                const formData = new FormData();
                formData.append('attachment', attachment);

                await axiosInstance.post(`/notifications/attachment/${notificationId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                console.error("L'attachment n'est pas un fichier valide");
            }


            await axiosInstance.post(`/notifications/send/${notificationId}`);

            return { data: notificationData };


        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Une erreur s'est produite lors de l'envoi de la notification");
        }
    }
);


interface FormValue {
    title: string;
    message: string;
    attachment: File | null;
}

interface NotificationBoxState {
    modal: boolean;
    composeNotification: boolean;
    faIcon: boolean;
    page: boolean;
    interviewNotification: boolean;
    inboxNotification: any[];
    notificationValidation: boolean;
    selectedUser: any | null;
    formValue: FormValue;
    navId: number;
    tabId: number;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationBoxState = {
    modal: false,
    composeNotification: false,
    faIcon: false,
    page: false,
    interviewNotification: false,
    inboxNotification: [],
    notificationValidation: false,
    selectedUser: null,
    formValue: {
        title: "",
        message: "",
        attachment: null,
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
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        handleInterview: (state, action) => {
            state.interviewNotification = action.payload;
        },
        setFormValue: (state, action: { payload: { name: keyof FormValue, value: any } }) => {
            state.formValue[action.payload.name] = action.payload.value;
        },
        setNavId: (state, action) => {
            state.navId = action.payload;
        },
        setTabId: (state, action) => {
            state.tabId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNotification.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setModal,
    handleInterview,
    setComposeNotification,
    setSelectedUser,
    setFormValue,
    setNavId,
    setTabId
} = NotificationBoxSlice.actions;

export default NotificationBoxSlice.reducer;
