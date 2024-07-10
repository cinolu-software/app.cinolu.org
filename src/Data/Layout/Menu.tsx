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
      },
      { path: "/app/calendar", icon: "calendar", type: "link", title: "Calendar" },
      
    ]
  },
  {
    title: "Hubs",
    lanClass: "lan-1",
    menucontent: "Hub",
    Items: [
      {
        path: "/hubs/f360",
        icon: "learning",
        type: "link",
        title: "F-360"
      }

    ]
  },
  {
    title: "Administration",
    lanClass: "lan-1",
    menucontent: "admin",
    Items: [
      {
        title: "User",
        id: 1,
        icon: "user",
        type: "sub",
        lanClass: "lan-3",
        children: [
          { path: "/users/internetUsers", title: "internetUsers", type: "link", lanClass: "lan-4" },
          { path: "/users/entrepreneurs", title: "entrepreneurs", type: "link", lanClass: "lan-5" },
          { path: "/users/members", title: "membres", type: "link" },
          { path: "/users/coachs", title: "coachs", type: "link" },
          { path: "/users/partners", title: "partenaires", type: "link" },
          { path: "/users/administrators", title: "administrateurs", type: "link" },
        ],
      },
      {
        title: "Programmes",
        id: 2,
        icon: "builders",
        type: "link",
        lanClass: "lan-6",
        active: false,
        path: "/programs",
      },
      {
        title: "Projets",
        id: 3,
        icon: "file",
        type: "link",
        lanClass: "lan-6",
        active: false,
        path: "/projects"

      },
      {
        title: "Rôle",
        id: 3,
        icon: "user",
        type: "link",
        lanClass: "lan-6",
        active: false,
        path: "/roles"

      },
    ],
  }
];
