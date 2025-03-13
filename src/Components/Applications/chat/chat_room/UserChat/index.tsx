import { useState, useEffect } from "react";
import {Card, Col} from "reactstrap";
import RightChatHeader from "./RightChatHeader";
import RightChatBody from "./RightChatBody";
import Cookies from "js-cookie";
import { User } from "@/Types/AuthType";
import { connectSocket, disconnectSocket, socket  } from "@/services/axios";

const UserChat = () => {

    const [token, setToken] = useState<string>();
    const [message, setMessage] = useState<string[]>([]);

    useEffect(()=>{
        const user = JSON.parse(Cookies.get('cinolu_token') || '{}') as User;
        setToken(user.chat_token);
    }, [])

    useEffect(()=>{
        if (token){
            connectSocket(token);
        }
        if(socket){
            socket.on("loadMessages", (msgs)=>setMessage(msgs));
        }

        return () => {
            disconnectSocket();
        }
        
    }, [token]);


    return (
        <Col xxl="9" xl="8" md="7" className="box-col-7">
            <Card className="right-sidebar-chat pt-5">
                {/* <RightChatHeader /> */}
                <RightChatBody />
            </Card>
        </Col>
    )
}

export default UserChat