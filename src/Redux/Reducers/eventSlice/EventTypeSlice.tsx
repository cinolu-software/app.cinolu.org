import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { IniialStateEventTypeType, CreateEventType, UpdateEventType, EventType, } from '@/Types/EventsType/eventsTypeType';

const initialState : IniialStateEventTypeType = {
    dataEventType: [],
    status: 'idle',
    error: null,
    isOpenModalCreateEventType: false,
    isOpenModalDeleteEventType: false,
    isOpenModalEditEventType: false,
    selectedEventType: null,
};

const transformProgramsType = (types: EventType[]) => {
    return types.map(type => {
        if(type.id === undefined){
            throw new Error("Event type must have an id");
        }
        return {...type, image : 'programs/types/typeProgram.png'}
    })
}

export const fetchEventsType = createAsyncThunk(
    'events/fetchEventsType',
    async () => {
        const response = await axiosInstance.get<{data : EventType[]}>(`${apiBaseUrl}/event-types`);
        const originalEventType = response.data.data;
        const transformedEvents = transformProgramsType(originalEventType);
        return { data : transformedEvents}
    }
);

export const createEventType = createAsyncThunk(
    'events/createEventType', async (newEventType: CreateEventType, {rejectWithValue}) => {
        try{
          const response = await axiosInstance.post<{data: EventType}>(`${apiBaseUrl}/event-types`, newEventType);
          return response.data.data;
        }
        catch(err : any){
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateEventsType = createAsyncThunk(
    'events/updateEventType',
    async (updatedEventType: UpdateEventType, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch<{data: EventType}>(`${apiBaseUrl}/event-types/${updatedEventType.id}`, updatedEventType);
            return response.data.data;
        }catch(err: any){
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteEventType = createAsyncThunk(
    'events/deleteEventType',
    async (eventTypeId: string, {rejectWithValue}) => {
        try{
            await axiosInstance.delete(`${apiBaseUrl}/event-types/${eventTypeId}`);
            return eventTypeId;
        }catch (err: any){
            return rejectWithValue(err.reponse.data);
        }
    }
);

const EventsTypeSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setModalCreateEventType: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateEventType = action.payload.isOpen;
            state.selectedEventType = null;
        },
        setModalEditEventTypes: (state, action: PayloadAction<{ isOpen: boolean, EventType: EventType | null }>) => {
            state.isOpenModalEditEventType = action.payload.isOpen;
            state.selectedEventType = action.payload.EventType;
        },
        setModalDeleteEventTypes: (state, action: PayloadAction<{ isOpen: boolean, EventType: EventType | null }>) => {
            state.isOpenModalDeleteEventType = action.payload.isOpen;
            state.selectedEventType = action.payload.EventType;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchEventsType.fulfilled, (state, action: PayloadAction<{ data: EventType[] }>) => {
                state.status = 'succeeded';
                state.dataEventType = action.payload.data;
            })
            .addCase(fetchEventsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createEventType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createEventType.fulfilled, (state, action: PayloadAction<EventType>) => {
                state.status = 'succeeded';
                state.dataEventType.push({
                    id: action.payload.id || "",
                    name: action.payload.name || "",
                    description: action.payload.description || "",
                    created_at: action.payload.created_at || "",
                    updated_at: action.payload.updated_at || "",
                    image: "programs/types/typeProgram.png",
                    deleted_at: null
                });
            })
            .addCase(createEventType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateEventsType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateEventsType.fulfilled, (state, action: PayloadAction<EventType>) => {
                state.status = 'succeeded';
                const index = state.dataEventType.findIndex((program: { id: string }) => program.id === action.payload.id);
                if (index !== -1) {
                    state.dataEventType[index] = action.payload;
                }
            })
            .addCase(updateEventsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteEventType.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteEventType.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.dataEventType = state.dataEventType.filter((program: { id: string; }) => program.id !== action.payload);
            })
            .addCase(deleteEventType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const {setModalCreateEventType, setModalEditEventTypes, setModalDeleteEventTypes} = EventsTypeSlice.actions;

export default EventsTypeSlice.reducer