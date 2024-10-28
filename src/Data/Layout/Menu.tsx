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
        ]
    },
    {
        title: "Administration",
        lanClass: "lan-1",
        menucontent: "admin",
        Items: [
            {
                title: "Users",
                id: 1,
                icon: "user",
                type: "sub",
                lanClass: "lan-3",
                active: false,
                children: [
                    {path: "/users/list", title: "Liste", type: "link", lanClass: "lan-5"},
                    {path: "/users/coachs", title: "Coachs", type: "link", lanClass: "lan-6"},
                    {path: "/users/staffMembers", title: "Staff", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Programmes",
                id: 2,
                icon: "builders",
                type: "link",
                lanClass: "lan-6",
                active: false,
                children: [
                    // {path: "/programs/other", title: "other", type: "link", lanClass: "lan-5"},
                    {path: "/programs", title: "programmes", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programTypes", title: "types de programmes", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Partenaires",
                id: 2,
                icon: "bonus-kit",
                type: "sub",
                lanClass: "lan-6",
                active: false,
                children: [
                    {path: "/partners", title: "Liste", type: "link", lanClass: "lan-6"},
                    {path: "/partnerShip", title: "Type", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Rôle",
                id: 3,
                icon: "file",
                type: "link",
                lanClass: "lan-6",
                active: false,
                path: "/roles"
            },
            {
                title: "Notifications",
                id: 4,
                icon: "chat",
                type: "link",
                lanClass: "lan-6",
                active: false,
                path: '/notifications'
            },
        ],
    }
];
