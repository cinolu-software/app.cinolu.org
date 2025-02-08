"use client"

import React, {FunctionComponent, useEffect, useState} from "react";
import AddPostContainer from "@/Components/Applications/blog/blog_add";

const AddPost = () => {

    const [MyAwesomeMap, setClient] = useState<FunctionComponent>();

    useEffect(() => {
        (async () => {
            if(typeof window !== "undefined"){
                const newClient = (await import ('@/Components/Applications/blog/blog_add')).default;
                setClient(()=>newClient);
            }
        })();
    }, []);

    return MyAwesomeMap ? <MyAwesomeMap/> : "";
}

export default AddPost;