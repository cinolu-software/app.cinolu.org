import React from "react";
import AddButton from "@/CommonComponent/AddButton";

export const EventsHeader = () => {

    return (
        <div>
            <AddButton link={'/events/eventsAdd'} name={'Ajouter un Evénement'} />
        </div>
    );
};

