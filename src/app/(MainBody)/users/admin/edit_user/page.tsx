'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const EditUser = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/TabAdmin/UsersList/AddUser")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default EditUser