import {Fragment, useEffect, useState} from "react";
import {useAppSelector} from "@/Redux/Hooks";
import {MenuList} from "@/Data/Layout/Menu";
import {MenuItem} from "@/Types/LayoutTypes";
import Menulist from "./Menulist";
import {useTranslation} from "react-i18next";

const SidebarMenuList = () => {

  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const {user} = useAppSelector(state => state.auth)
  const { t } = useTranslation("common");
  const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
      setUserRoles(user?.roles?.map((role:string) => role) || []);
    }, [user]);


  const hasAccess = (requiredRoles?: string[]) => {
    if (!requiredRoles) return true;
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const visibleMenuList = MenuList?.filter((menuItem) => hasAccess(menuItem.requiredRoles));

  const shouldHideMenu = (mainMenu: MenuItem) => {
    return mainMenu?.Items?.map((data) => data.title).every((titles) => pinedMenu.includes(titles || ""));
  };

  return (
      <>
        {
        visibleMenuList &&
            visibleMenuList.map((mainMenu: MenuItem, index) => (
                <Fragment key={index}>
                  <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>
                    <div>
                      <h6 className={mainMenu.lanClass ? mainMenu.lanClass : ""}>{t(mainMenu.title)}</h6>
                    </div>
                  </li>
                  <Menulist menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
                </Fragment>
            ))
        }
      </>
  );
};
export default SidebarMenuList;
