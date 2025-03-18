import {ImagePath} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";

import {Badge} from "reactstrap";
import {AllMemberType} from "@/Types/ChatType";
import SearchNotFoundClass from "@/Components/Applications/chat/chat_room/LeftSideBar/SearchNotFoundClass";
import { imageBaseUrl } from "@/services/axios";


const ChatUserProfile = () => {

    const { usersJoined } = useAppSelector((state) => state.chat);

    return (
        <>
            {
                usersJoined && usersJoined.length > 0 ? (
                    <ul className="chats-user overflow-y-auto">
                        {
                            usersJoined.map((user)=>(
                                <li className={`common-space`}>
                                    <div className="chat-time">
                                        <div className="active-profile">
                                            <img 
                                                className="img-fluid rounded-circle" 
                                                src={
                                                    user?.profile
                                                        ? `${imageBaseUrl}/profiles/${user.profile}`
                                                        : user?.google_image
                                                            ? user.google_image
                                                            : `${ImagePath}/avtar/avatar.jpg`
                                                }
                                                alt="profile utilisateur"
                                            />
                                            <div className="status bg-success" />
                                        </div>
                                        <div>
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )

                
             : (
                    <SearchNotFoundClass word="Contact" />
                )
            }
        </>
    );
};

export default ChatUserProfile;