import React,{useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchChatApiData, fetchChatMemberApiData} from "@/Redux/Reducers/ChatSlice/ChatRoomSlice";
import UserChat from "@/Components/Applications/chat/chat_room/UserChat";
import LeftSideBar from "@/Components/Applications/chat/chat_room/LeftSideBar";
import { setUsersJoined } from '@/Redux/Reducers/ChatSlice/ChatRoomSlice';
import { connectSocket, disconnectSocket, socket  } from "@/services/axios";
import Cookies from "js-cookie";
import { UserType } from '@/Types/Users/UsersType';


const ChatRoomComponent = () => {
    
    const [token, setToken] = useState<string>();
    const [message, setMessage] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const {usersJoined} = useAppSelector(state => state.chat)

    useEffect(()=>{
        const user = JSON.parse(Cookies.get('cinolu_token') || '{}') as UserType;
        setToken(user.chat_token);
    }, [])

    useEffect(()=>{
        if (token){
            connectSocket(token);
        }
        if(socket){
            socket.on("loadMessages", (msgs)=>setMessage(msgs));
            socket.on('userJoined', (user)=>{
                dispatch(setUsersJoined(user))
            });
        }

        return () => {
            disconnectSocket();
        }
        
    }, [token]);

    useEffect(() => {
        dispatch(fetchChatMemberApiData());
        dispatch(fetchChatApiData());
    }, []);

    useEffect(()=>{
        console.log('usersJoined', usersJoined);
    }, [usersJoined])

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