import {InboxNotificationData} from "@/Data/Application/Notifications";
import {InitialStateType} from '@/Types/Notifications/NotificationType';
import {createSlice} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    modal : false,
    composeNotification : false,
    faIcon : false,
    page : false,
    interviewNotification : false,
    inboxNotification : InboxNotificationData,
    notificationValidation : false,
    selectedUser: null
};

const NotificationBoxSlice = createSlice({
    name: "NotificationBox",
    initialState,
    reducers: {
        setModal: (state, action) =>{
            state.modal=action.payload
        },
        setComposeNotification: (state, action)=>{
            state.composeNotification = action.payload
        },
        handleEnvelope : (state, action) => {
            state.faIcon = action.payload
        },
        handleInterview: (state, action) => {
            state.interviewNotification = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        }
        ,
        setPage : (state, action) => {
            state.page = action.payload
        },
        removeItems: (state, action) => {
            state.inboxNotification = state.inboxNotification?.filter((data) => data.id !== action.payload);
        },
        addToFavorites : (state, action) => {
            if(action.payload.star === false){
                state.inboxNotification = state.inboxNotification.map((item)=>(item.id === action.payload.id) ? {...item, star: true} : item)
            }else{
                state.inboxNotification = state.inboxNotification.map((item)=>(item.id === action.payload.id) ? { ...item, star: false} : item)
            }
        },
        removeFromFavorite : (state, action) => {
            state.inboxNotification = state.inboxNotification.map((data) => (data.id === action.payload.id ? { ...data, star: false} : data));
        },
        setNotificationValidation: (state, action) => {
            state.notificationValidation = action.payload
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
    }
})

export const { setModal, setComposeNotification, setPage, handleEnvelope, handleInterview, removeItems, addToFavorites, removeFromFavorite, setNotificationValidation, addNewNotifaction, setSelectedUser } = NotificationBoxSlice.actions;

export default NotificationBoxSlice.reducer