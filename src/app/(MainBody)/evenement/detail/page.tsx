'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

export default function DetailEvenement() {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newClient = (await import("@/Components/Applications/evenement/list/Common/DetailEvenement")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap/> : "";
}