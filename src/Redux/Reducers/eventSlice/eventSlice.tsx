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
        responsible: '',
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
        responsible: '',
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

export const createEvent = createAsyncThunk<Event, CreateEvent, {rejectValue: any}>(
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

export const updateAttachmentEventImage = createAsyncThunk<
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
    const {name, location, description, started_at, ended_at, attendees, event_type, types, responsible} = state.CreateFormValue;
    switch(state.numberLevel){
        case 1:
            if(!name || !location || !description || !attendees || !location || !event_type){
                ShowError();
                return false;
            }
            break;
        case 2:
            if(!name || !location || !description || !attendees || !location || !event_type || !started_at || !ended_at){
                ShowError();
                return false;
            }
            break;
        case 3:
            if(!name || !location || !description || !attendees || !location || !event_type || !started_at || !ended_at || types.length === 0){
                ShowError();
                return false;
            }
            break;
        case 4:
            if(!name || !location || !description || !attendees || !location || !event_type || !started_at || !ended_at || types.length === 0 || !responsible){
                ShowError();
                return false;
            }
            break;
    }
    return true;
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
                    responsible: action.payload.event.responsible || '',
                    started_at: action.payload.event.started_at,
                    ended_at: action.payload.event.ended_at,
                    attendees: action.payload.event.attendees,
                    event_type: action.payload.event.event_type || '',
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
        },
        setCreateFomValue: (state, action: PayloadAction<{ field: keyof CreateEvent, value: any }>) => {
            const { field, value } = action.payload;

            if (field === 'types' && typeof value === 'string') {
                state.CreateFormValue.types = JSON.parse(value).map((type: string) => parseInt(type));
            }

            else if (field === 'started_at' || field === 'ended_at') {
                state.CreateFormValue[field] = new Date(value).toISOString().split("T")[0];
            }

            else {
                state.CreateFormValue[field] = value;
            }
        },
        setEditFormValue: (state, action: PayloadAction<{field: keyof UpdateEvent, value: any}>)=>{
            if(action.payload.field === 'types' && typeof action.payload.value === 'string') {
                state.EditFormValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            }else{
                state.EditFormValue[action.payload.field] = action.payload.value;
            }
        },
        setFilterToggle: (state, action: PayloadAction<boolean>)=>{
            state.filterToggle = action.payload;
        },
        setShowFinish: (state, action) => {
            state.showFinish = action.payload;
        },
        handleBackButton: (state) => {
            if (state.numberLevel > 1) {
                state.numberLevel -= 1;
            }
        },
        handleNextButton: (state) => {
            const isValid = validateStep(state);
            if(isValid) {
                if (state.numberLevel < 5) {
                    state.numberLevel += 1;
                }else if(state.numberLevel === 5 ){
                    state.showFinish = true;
                }
            }
        },
        resetFormValue: (state) => {
            state.CreateFormValue = {
                name : '',
                image: '',
                location: '',
                description: '',
                started_at: '',
                ended_at: '',
                attendees: '',
                responsible: '',
                event_type: 'physical',
                online_link: '',
                types: []
            },
            state.numberLevel = 1
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataEvent = action.payload.data;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
                state.dataEvent.push(action.payload);
                state.isOpenModalCreateEvent = false;
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error= 'Failed to create event';
            })
            .addCase(updateEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
                const {id} = action.payload;
                const existingEvent = state.dataEvent.find(event => event.id === id);
                if(existingEvent){
                    existingEvent.name = action.payload.name;
                    existingEvent.image = action.payload.image;
                    existingEvent.location = action.payload.location;
                    existingEvent.description = action.payload.description;
                    existingEvent.started_at = action.payload.started_at;
                    existingEvent.ended_at = action.payload.ended_at;
                    existingEvent.attendees = action.payload.attendees;
                    existingEvent.event_type = action.payload.event_type;
                    existingEvent.online_link = action.payload.online_link;
                    existingEvent.types = action.payload.types;
                }
                state.isOpenModalEditEvent = false;
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to update event';
            })
            .addCase(deleteEvent.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<{id: string}>) => {
                state.dataEvent = state.dataEvent.filter(event => event.id !== action.payload.id);
                state.isOpenModalDeleteEvent = false;
            })
            .addCase(deleteEvent.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to delete event';
            })
            .addCase(updateAttachmentEventImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAttachmentEventImage.fulfilled, (state, action) => {
                const { eventId, imageUrl } = action.payload;
                const existingEvent = state.dataEvent.find(event => event.id === eventId);
                if (existingEvent) {
                    existingEvent.image = imageUrl;
                }
            })
            .addCase(updateAttachmentEventImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to update image';
            })
    }
});

export const {
    setSelectedEvent,
    setModalCreateEvent,
    setModalEditEvent,
    setModalDeleteEvent,
    setNavId,
    setTabId,
    setCreateFomValue,
    setEditFormValue,
    setFilterToggle,
    setShowFinish,
    handleBackButton,
    handleNextButton,
    resetFormValue
} = EventSlice.actions;

export default EventSlice.reducer;



