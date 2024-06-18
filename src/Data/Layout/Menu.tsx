import { MenuItem } from "@/Types/LayoutTypes";

export const MenuList: MenuItem [] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    menucontent: "Dashboard",
    Items: [
      {
        path: "/dashboard",
        icon: "home",
        type: "link",
        title: "Dashboard"
      }
    ]
  }
];
