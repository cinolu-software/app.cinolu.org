import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {CreateEvent, UpdateEvent, Event, InitialStateEvent,fetchEventsResponse } from "@/Types/Events";
import {RootState} from "@/Redux/Store";
import {ShowError} from "@/utils/MultiStepForm.service";

const initialState: InitialStateEvent = {
    dataEvent: [],
    status: 'idle',
    error: null,
    isOpenModalCreateEvent: false,
    isOpenModalDeleteEvent: false,
    isOpenModalEditEvent: false,
    filterToggle: false,
    selectedEvent: null,
    navId: 1,
    tabId: 1,
    CreateFormValue: {
        name : '',
        image: '',
        location: '',
        description: '',
        started_at: '',
        ended_at: '',
        attendees: '',
        event_type: 'physical',
        online_link: '',
        types: []
    },
    EditFormValue: {
        name : '',
        image: '',
        location: '',
        description: '',
        started_at: '',
        ended_at: '',
        attendees: '',
        event_type: 'physical',
        online_link: '',
        types: []
    },
    numberLevel: 1,
    showFinish: false
}

export const fetchEvents = createAsyncThunk('events/fetchEvents', async ()=> {
    const response = await axiosInstance.get<{data : fetchEventsResponse}>(`${apiBaseUrl}/events`);
    return {data: response.data.data.events}
});

export const createProgram = createAsyncThunk<Event, CreateEvent, {rejectValue: any}>(
    'events/createEvent' , async (newEvent, thunkAPI) => {
        try{
            const response = await axiosInstance.post<{data: Event}>(`${apiBaseUrl}/events`, newEvent);
            return response.data.data
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updateEvent =  createAsyncThunk<Event, {eventId: string, updatedEvent: UpdateEvent}, {rejectValue:any}>(
    'events/updateEvent', async ({eventId, updatedEvent}, thunkAPI) => {
        try{
            const response = await axiosInstance.patch<{data: Event}>(`${apiBaseUrl}/events/${eventId}`, updatedEvent);
            return response.data.data;
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const deleteEvent = createAsyncThunk<{id: string}, string, {rejectValue: any}>(
    'events/deleteEvent',
    async (eventId, thunkAPI) => {
        try{
            await axiosInstance.delete(`${apiBaseUrl}/events/${eventId}`);
            return {id: eventId}
        }catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const updateAttachmentProgramImage = createAsyncThunk<
    { eventId: string ; imageUrl: string }, { eventId: string; imageFile: File }, { rejectValue: any }>(
    'events/updateAttachmentEventImage',
    async ({ eventId, imageFile }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('thumb', imageFile);
            const response = await axiosInstance.post<{ data: { image: string } }>(
                `${apiBaseUrl}/events/image/${eventId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return { eventId, imageUrl: response.data.data.image };
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

const validateStep = (state: InitialStateEvent) =>{

}

const EventSlice = createSlice({
    name: 'events',
    initialState,
    reducers : {
        setSelectedEvent: (state, action: PayloadAction<{event: Event | null}>)=> {
            state.selectedEvent = action.payload.event;
            if(action.payload.event) {
                state.EditFormValue = {
                    name: action.payload.event.name,
                    image: action.payload.event.image || '',
                    location: action.payload.event.location,
                    description: action.payload.event.description,
                    started_at: action.payload.event.started_at,
                    ended_at: action.payload.event.ended_at,
                    attendees: action.payload.event.attendees,
                    event_type: action.payload.event.event_type,
                    online_link: action.payload.event.online_link || '',
                    types: action.payload.event.types.map(type => type.id)
                }
            }
        },
        setModalCreateEvent: (state, action: PayloadAction<{isOpen: boolean}>) =>{
            state.isOpenModalCreateEvent = action.payload.isOpen;
        },
        setModalEditEvent: (state, action: PayloadAction<{isOpen: boolean, event: Event | null}>) =>{
            state.isOpenModalEditEvent = action.payload.isOpen;
            state.selectedEvent = action.payload.event;
        },
        setModalDeleteEvent: (state, action: PayloadAction<{isOpen: boolean, event: Event | null}>) =>{
            state.isOpenModalDeleteEvent = action.payload.isOpen;
            state.selectedEvent = action.payload.event;
        },
        setNavId: (state, action: PayloadAction<number>)=>{
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>)=>{
            state.tabId = action.payload;
        }
    }
})



