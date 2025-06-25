'use client';

import React, {FunctionComponent, useEffect, useState} from "react";

const AddEvenement = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/evenement/list/all")).default;
                setClient(() => newClient);
            }
        })();
    }, []);
    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default AddEvenement;