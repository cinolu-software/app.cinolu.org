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
        path: "/hubs/360",
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
              { path: "/programs/programsTypes/innovationCamps", title: "Camp d'innovation", type: "link" },
              { path: "/programs/programsTypes/internships", title: "Stages", type: "link" },
              { path: "/programs/programsTypes/incubations", title: "Incubation", type: "link" },
              { path: "/programs/programsTypes/MentorsPrograms", title: "Mentors programs", type: "link" },
              { path: "/programs/programsTypes/ExpoAndConference", title: "Expo & Conférence", type: "link" },
            ]},
          {path: "/programs/programsStatus", title: "status", type: "link",}
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
              { path: "/projects/general", title: "", type: "link" },
            ]},
          {path: "/projets/projectStatus", title: "status", type: "link",}
        ],
      },
    ],
  }
];
