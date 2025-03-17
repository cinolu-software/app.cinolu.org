import {ImagePath} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {changeChat, createNewChatAsync} from "@/Redux/Reducers/ChatSlice/ChatRoomSlice";
import {Badge} from "reactstrap";
import {AllMemberType} from "@/Types/ChatType";
import SearchNotFoundClass from "@/Components/Applications/chat/chat_room/LeftSideBar/SearchNotFoundClass";
import { imageBaseUrl } from "@/services/axios";


const ChatUserProfile = () => {

    const { members, selectedUser, currentUser, chats, usersJoined } = useAppSelector((state) => state.chat);

    var activeChat = 0;

    if (selectedUser != null) activeChat = selectedUser.id;

    const dispatch = useAppDispatch();



    return (
        <>
            {
                // members && members.length > 0 ? (
                //     <ul className="chats-user overflow-y-auto">
                //         {
                //             // members
                //             //     .filter((x: AllMemberType) => x.id !== currentUser?.id)
                //             //     .map((item: AllMemberType, id: number) => (
                //             //         <li className={`common-space ${activeChat === item.id ? "active" : ""}`} key={id} onClick={() => changeChatClick(item.id)}>
                //             //             <div className="chat-time">
                //             //                 <div className="active-profile">
                //             //                     <img className="img-fluid rounded-circle" src={`${ImagePath}/${item.image}`} alt="user" />
                //             //                     <div className={`status bg-${item.online}`} />
                //             //                 </div>
                //             //                 <div>
                //             //                     <span>{item.name}</span>
                //             //                     <p>{item.status}</p>
                //             //                 </div>
                //             //             </div>
                //             //             <div>
                //             //                 <p>{item.time} </p>
                //             //                 {item.badge && (<Badge color="transparent" className="badge-light-success">15</Badge>)}
                //             //             </div>
                //             //         </li>
                //             //     ))
                //         }
                //         {/* <li className={`common-space`}>
                //             <div className="chat-time">
                //                 <div className="active-profile">
                //                     <img className="img-fluid rounded-circle" src={`${ImagePath}/${item.image}`} alt="user" />
                //                     <div className={`status bg-${item.online}`} />
                //                 </div>
                //                 <div>
                //                     <span>{item.name}</span>
                //                     <p>{item.status}</p>
                //                 </div>
                //             </div>
                //             <div>
                //                 <p>{item.time} </p>
                //                 {item.badge && (<Badge color="transparent" className="badge-light-success">15</Badge>)}
                //             </div>
                                    
                //         </li> */}
                //     </ul>

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
            )}
        </>
    );
};

export default ChatUserProfile;