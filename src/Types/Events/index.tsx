import {EventType} from "@/Types/EventsType/eventsTypeType";
import {ChangeEvent} from "react";

export interface Event {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    name: string;
    image: string | null;
    location: string;
    description: string;
    started_at: string;
    ended_at: string;
    attendees: string;
    event_type: "" |"physical" | "online";
    online_link: string | null;
    types: EventType[];
    responsible?: string;
}

export interface CreateEvent {
    name: string;
    image?: string | null;
    responsible: string;
    location: string;
    description: string;
    started_at: string;
    ended_at: string;
    attendees: string;
    event_type: "physical" | "online" | "";
    online_link: string | null;
    types: string[];
}

export interface UpdateEvent extends CreateEvent {}

export interface fetchEventsResponse {
    events: Event[]
}

export interface InitialStateEvent  {
    dataEvent : Event[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateEvent: boolean;
    isOpenModalEditEvent: boolean;
    isOpenModalDeleteEvent: boolean;
    filterToggle: boolean;
    selectedEvent: Event | null;
    navId: number;
    tabId: number;
    CreateFormValue: CreateEvent;
    EditFormValue: UpdateEvent;
    numberLevel: number;
    showFinish: boolean;
}

export interface StepperHorizontalPropsType {
    level: number;
}

export interface NumberingWizardPropsType {
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    level?: number;
}

export interface FormEditorsProps {
    description: string | undefined;
    onChangeDescription: (value: string) => void;
}

export interface StepPropsType {
    createFormValue: CreateEvent
}

