import React,{useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import {useAppDispatch} from "@/Redux/Hooks";
import {fetchChatApiData, fetchChatMemberApiData} from "@/Redux/Reducers/ChatSlice/ChatRoomSlice";
import UserChat from "@/Components/Applications/chat/chat_room/UserChat";
import LeftSideBar from "@/Components/Applications/chat/chat_room/LeftSideBar";


const ChatRoomComponent = () => {
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChatMemberApiData());
        dispatch(fetchChatApiData());
    }, []);

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