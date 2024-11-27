import {MenuItem} from "@/Types/LayoutTypes";

export const MenuList: MenuItem [] | undefined = [
    {
        id: 1,
        title : "General",
        lanClass : "lan-1",
        menucontent : "Dashboard",
        Items: [
            {
                path: "/dashboard",
                icon: "home",
                type: "link",
                title: "Dashboard",
            },
        ],
        requiredRoles: ["admin", "coach", "staff"],
    },
    {
        id: 2,
        title: "Administration",
        lanClass: "lan-1",
        menucontent: "admin",
        Items: [
            {
                title: "Users",
                id: 1,
                icon: "user",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/users/admin/list", title: "Liste", type: "link", lanClass: "lan-6"},
                    {path: "/users/admin/coachs", title: "Coachs", type: "link", lanClass: "lan-6"},
                    {path: "/users/admin/staffMembers", title: "Staff", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Programmes",
                id: 2,
                icon: "builders",
                type: "link",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/programs", title: "programmes", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programTypes", title: "types", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programmCategory", title: "catégorie", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Evénements",
                id: 2,
                icon: "calendar",
                type: "link",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/programs", title: "Evénements", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programTypes", title: "Types", type: "link", lanClass: "lan-6"},
                    {path: "/programs/programmCategory", title: "Catégorie" , lanClass: "lan-6"},
                ]
            },
            {
                title: "Partenaires",
                id: 3,
                icon: "bonus-kit",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/partners", title: "Liste", type: "link", lanClass: "lan-6"},
                    {path: "/partnerShip", title: "Type", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Rôle",
                id: 4,
                icon: "file",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: "/roles",
            },
            {
                title: "Notifications",
                id: 5,
                icon: "chat",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: '/notifications',
            },
        ],
        requiredRoles: ["admin"],
    },
    {
        id: 3,
        title: "Coach",
        lanClass: "lan-1",
        menucontent: "coach",
        Items: [
            {
                title: "Coachés",
                id: 1,
                icon: "user",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/users/admin/list", title: "Liste", type: "link", lanClass: "lan-6"},
                ]
            },
            {
                title: "Programmes",
                id: 2,
                icon: "builders",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: ''
            },
            {
                title: "Rapports",
                id: 3,
                icon: "charts",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: ''
            },
            {
                title: "Discutions",
                id: 4,
                icon: "chat",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: '/users/coach'
            },
        ],
        requiredRoles: ["coach"],
    }
];
