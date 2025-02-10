"use client"

import React, {FunctionComponent, useEffect, useState} from "react";

const BlogDetail = () => {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined"){
                const newClient = (await import ('@/Components/Applications/blog/blog_detail')).default;
                setClient(()=>newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap/> : "";
}

export default BlogDetail;