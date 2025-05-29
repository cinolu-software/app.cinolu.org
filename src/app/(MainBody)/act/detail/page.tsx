'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

export default function Home() {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newClient = (await import("@/Components/Applications/activities/list/common/DetailActivity")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap/> : "";
}