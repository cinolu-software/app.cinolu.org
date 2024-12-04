
export interface CreateEventType {
    name : string;
    description : string;
}

export interface UpdateEventType extends CreateEventType {
    id: string;
}

export interface EventType {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name : string;
    description : string;
    image?: string;
}

export interface IniialStateEventTypeType {
    dataEventType : EventType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isOpenModalCreateEventType: boolean;
    isOpenModalEditEventType: boolean;
    isOpenModalDeleteEventType: boolean;
    selectedEventType: EventType | null;
}

export interface StaticModalToggleProp {
    staticModalToggle: ()=> void;
}

export interface EventsListTypeTableColumnType extends EventType {}