'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const ListUsers = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import('@/Components/Applications/TabAdmin/UsersList')).default
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default ListUsers
