'use client'

import React, {FunctionComponent, useEffect, useState,} from 'react'

const Notifications = () => {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/Notifications")).default;
                setClient(() => newClient);
            }
        })();
    }, []);


    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}
export default Notifications
