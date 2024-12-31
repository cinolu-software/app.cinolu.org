'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const EditProgram = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/programs/common/EditProgram")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default EditProgram;