"use client";

import React, { FunctionComponent, useEffect, useState } from "react";

const Projets = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/LatterBox")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default Projets;