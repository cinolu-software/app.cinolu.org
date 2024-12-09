'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const Profile = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import('@/Components/Applications/Profile')).default
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default Profile;