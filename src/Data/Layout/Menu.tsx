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
  },
  {
    title: "Hubs",
    lanClass: "lan-1",
    menucontent: "Hub",
    Items: [
      {
        path: "/hub",
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
          { path: "/dashboard/default_dashboard", title: "internautes", type: "link", lanClass: "lan-4" },
          { path: "/dashboard/project", title: "entrepreneurs", type: "link", lanClass: "lan-5" },
          { path: "/dashboard/ecommerce", title: "membres", type: "link" },
          { path: "/dashboard/ecommerce", title: "coachs", type: "link" },
          { path: "/dashboard/ecommerce", title: "partenaires", type: "link" },
          { path: "/dashboard/ecommerce", title: "administrateurs", type: "link" },
        ],
      },
      {
        title: "Programmes",
        id: 2,
        icon: "builders",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            title: "type",
            type: "sub",
            lanClass: "lan-6",
            active: false,
            children : [
              { path: "/widgets/general", title: "Camp d'innovation", type: "link" },
              { path: "/widgets/chart", title: "Stages", type: "link" },
              { path: "/widgets/chart", title: "Incubation", type: "link" },
              { path: "/widgets/general", title: "Mentors programs", type: "link" },
              { path: "/widgets/chart", title: "Expo & Conférence", type: "link" },
            ]},
          {path: "/", title: "status", type: "link",}
        ],
      },
      {
        title: "Projets",
        id: 3,
        icon: "file",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            title: "type",
            type: "sub",
            lanClass: "lan-6",
            active: false,
            children : [
              { path: "/widgets/general", title: "Camp d'innovation", type: "link" },
              { path: "/widgets/chart", title: "Stages", type: "link" },
              { path: "/widgets/chart", title: "Incubation", type: "link" },
              { path: "/widgets/general", title: "Mentors programs", type: "link" },
              { path: "/widgets/chart", title: "Expo & Conférence", type: "link" },
            ]},
          {path: "/", title: "status", type: "link",}
        ],
      },
    ],
  }
];
