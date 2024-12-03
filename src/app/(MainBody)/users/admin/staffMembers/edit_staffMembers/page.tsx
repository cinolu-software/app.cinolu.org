'use client';

import React, {FunctionComponent, useEffect, useState} from 'react';

const EditStaffMembers = () => {
    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if (typeof navigator !== "undefined") {
                const newClient = (await import("@/Components/Applications/TabAdmin/StaffMembersList/UpdateStaffMembers")).default;
                setClient(() => newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap /> : "";
}

export default EditStaffMembers;