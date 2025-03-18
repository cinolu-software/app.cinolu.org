import React,{useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import UserChat from "@/Components/Applications/chat/chat_room/UserChat";
import LeftSideBar from "@/Components/Applications/chat/chat_room/LeftSideBar";
import { setUsersJoined, setMessage } from '@/Redux/Reducers/ChatSlice/ChatRoomSlice';
import { connectSocket, disconnectSocket, socket  } from "@/services/axios";
import Cookies from "js-cookie";
import { UserType } from '@/Types/Users/UsersType';


const ChatRoomComponent = () => {
    
    const [token, setToken] = useState<string>();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const user = JSON.parse(Cookies.get('cinolu_token') || '{}') as UserType;
        setToken(user.chat_token);
    }, []);

    useEffect(()=>{
        if (token){
            connectSocket(token);
        }
        if(socket){
            socket.on("loadMessages", (msgs)=>{
                dispatch(setMessage(msgs.reverse()))
            });

            socket.on('userJoined', (user)=>{
                dispatch(setUsersJoined(user));
            });   
        }
        return () => {
            disconnectSocket();
        }
        
    }, [token]);


    return (
        <Container fluid>
            <Row className="g-0">
                <LeftSideBar />
                <UserChat />
            </Row>
        </Container>
    );
}

export default ChatRoomComponent;