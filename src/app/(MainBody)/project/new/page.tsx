'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const AddProjectNew = () => {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/projects/common/AddProjectNew")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";

}

export default AddProjectNew