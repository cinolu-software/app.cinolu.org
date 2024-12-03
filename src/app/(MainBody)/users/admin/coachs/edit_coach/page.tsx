'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const EditCoach = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/TabAdmin/CoachsList/UpdateCoach")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default EditCoach;