import SVG from "@/CommonComponent/SVG";
import { ImagePath } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { handleResponsiveToggle, setToggleSidebar } from "@/Redux/Reducers/LayoutSlice";
import Link from "next/link";
import {useRouter} from "next/navigation";


export const LogoWrapper = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  const { toggleSidebar } = useAppSelector((state) => state.layout);

  const goBackToLoginPage = () => {
    router.push(process.env.NEXT_PUBLIC_HOST_CLIENT as string)
  }

  return (
    <>
      <div className="logo-wrapper">
        <button className={'btn btn-link'} onClick={goBackToLoginPage}>
          <img className="img-fluid" src={`${ImagePath}/logo/logo_light.png`} alt="" />
        </button>
        <div className="back-btn" onClick={() => dispatch(handleResponsiveToggle())}>
          <i className="fa fa-angle-left"></i>
        </div>
        <div className="toggle-sidebar" onClick={()=>dispatch(setToggleSidebar(!toggleSidebar))} defaultChecked>
          <SVG className={`${sidebarIconType}-icon sidebar-toggle status_toggle middle`} iconId={`${sidebarIconType === "fill" ? "fill-" : "" }toggle-icon`} />
        </div>
      </div>
      <div className="logo-icon-wrapper">
        <Link href={`/sample_page`}>
          <img className="img-fluid" src={`${ImagePath}/logo/logo-icon.png`} alt="" />
        </Link>
      </div>
    </>
  );
};
