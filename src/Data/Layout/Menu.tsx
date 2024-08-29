import {MenuItem} from "@/Types/LayoutTypes";

export const MenuList: MenuItem [] | undefined = [
    {
        title : "General",
        lanClass : "lan-1",
        menucontent : "Dashboard",
        Items: [
            {
                path: "/dashboard",
                icon: "home",
                type: "link",
                title: "Dashboard"
            },
            // {path: "/app/calendar", icon: "calendar", type: "link", title: "Calendar"},
        ]
    },
    // {
    //     title: "Hubs",
    //     lanClass: "lan-1",
    //     menucontent: "Hub",
    //     Items: [
    //         {
    //             path: "/hubs/f360",
    //             icon: "learning",
    //             type: "link",
    //             title: "F-360"
    //         }
    //
    //     ]
    // },
    {
        title: "Administration",
        lanClass: "lan-1",
        menucontent: "admin",
        Items: [
            {
                title: "User",
                id: 1,
                icon: "user",
                type: "link",
                lanClass: "lan-3",
                path: "/users",
            },
            {
                title: "Programmes",
                id: 2,
                icon: "builders",
                type: "sub",
                lanClass: "lan-6",
                active: false,
                children: [
                    {path: "/programs/other", title: "other", type: "link", lanClass: "lan-5"},
                    {path: "/programs", title: "programmes", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programTypes", title: "types de programmes", type: "link", lanClass: "lan-6"},
                ]
            },
            // {
            //     title: "Projets",
            //     id: 3,
            //     icon: "file",
            //     type: "sub",
            //     lanClass: "lan-6",
            //     active: false,
            //     children: [
            //         {path: "/projects", title: "Projects", type: "link", lanClass: "lan-4"},
            //         {path: "/projects/status", title: "Status", type: "link", lanClass: "lan-5"},
            //         {path: "/projects/category", title: "Catégorie", type: "link", lanClass: "lan-5"},
            //     ]
            // },
            {
                title: "Rôle",
                id: 3,
                icon: "file",
                type: "link",
                lanClass: "lan-6",
                active: false,
                path: "/roles"
            },
        ],
    }
];
