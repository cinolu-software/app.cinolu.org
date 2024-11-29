import { Href, Logout, ImagePath } from "@/Constant";
import { useEffect } from "react";
import { UserProfileData } from "@/Data/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import { logout, getProfile } from "@/Redux/Reducers/AuthSlice";
import { imageBaseUrl } from "@/services/axios";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        try {
            dispatch(getProfile());
        } catch (e) {
            router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
        }
    }, [dispatch]);

    const LogOutUser = async () => {
        await dispatch(logout());
        router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string);
    };

    return (
        <li className="profile-nav onhover-dropdown px-0 py-0">
            <div className="d-flex profile-media align-items-center">
                <img
                    className="profile-img"
                    src={
                        user?.profile
                            ? `${imageBaseUrl}/profiles/${user.profile}`
                            : user?.google_image
                                ? user.google_image
                                : `${ImagePath}/avtar/avatar.jpg`
                    }
                    alt="profile utilisateur"
                />
                <div className="flex-grow-1">
                    <span>{user ? user.name : "Utilisateur"}</span>
                    <p className="mb-0 font-outfit">
                        {user?.roles && Array.isArray(user.roles) ? (
                            user.roles.map((role, index) => (
                                <span key={index} className="me-1">
                                    {role}
                                </span>
                            ))
                        ) : (
                            <span>Aucun rôle</span>
                        )}
                        <i className="ms-2 fa fa-angle-down"></i>
                    </p>
                </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
                {UserProfileData.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${item.link}`}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
                <li onClick={LogOutUser}>
                    <Link href={Href} scroll={false}>
                        <LogOut />
                        <span>{Logout}</span>
                    </Link>
                </li>
            </ul>
        </li>
    );
};

export default Profile;


