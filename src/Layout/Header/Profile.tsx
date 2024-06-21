import { Href, ImagePath, Logout } from "@/Constant";
import {useEffect} from "react";
import { UserProfileData } from "@/Data/Layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "react-feather";
import {checkAuth, selectAuth, logout} from "@/Redux/Reducers/AuthSlice";
import {useDispatch, useSelector} from "react-redux";

export const Profile = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(selectAuth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const LogOutUser = async () => {
        await dispatch(logout());

        router.push("/auth/login");
    };

    console.log(auth)

  return (
    <li className="profile-nav onhover-dropdown px-0 py-0">
      <div className="d-flex profile-media align-items-center">
        <img className="img-30" src={`${ImagePath}/dashboard/profile.png`} alt="" />
        <div className="flex-grow-1">
          <span>Alen Miller</span>
          <p className="mb-0 font-outfit">
            UI Designer<i className="fa fa-angle-down"></i>
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        {UserProfileData.map((item, index) => (
          <li key={index}>
            <Link href={`/${item.link}`}>{item.icon}<span>{item.title} </span></Link>
          </li>
        ))}
        <li onClick={LogOutUser}><Link href={Href} scroll={false} ><LogOut /><span>{Logout} </span></Link></li>
      </ul>
    </li>
  );
};
