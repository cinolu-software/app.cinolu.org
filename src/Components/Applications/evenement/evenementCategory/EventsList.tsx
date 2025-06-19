import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateEventType} from '@/Redux/Reducers/eventSlice/EventTypeSlice'
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const EventsTypesHeader = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalCreateEventType } = useAppSelector((state) => state.eventType);

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter un Type d'événement"
                onClick={() => dispatch(setModalCreateEventType({ isOpen : !isOpenModalCreateEventType}))}
            />
        </div>
    );
};
