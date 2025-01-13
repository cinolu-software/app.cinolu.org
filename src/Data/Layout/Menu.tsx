import {MenuItem} from "@/Types/LayoutTypes";

export const MenuList: MenuItem [] | undefined = [
    {
        id: 1,
        title : "Mon Compte",
        lanClass : "lan-1",
        menucontent : "Compte",
        Items: [
            {
                title: "Compte",
                id: 2,
                icon: "user",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {path: "/users/profile", title: "Profile", type: "link", lanClass: "lan-6"},
                ]
            },
        ],
        requiredRoles: ["admin", "coach", "staff", 'user'],
    },
    {
        id: 2,
        title: "Administration",
        lanClass: "lan-1",
        menucontent: "admin",
        Items: [
            {
                id: 1,
                path: "/dashboard",
                icon: "home",
                type: "link",
                title: "Dashboard",
            },
            {
                title: "Users",
                id: 2,
                icon: "user",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {
                        path: "/users/admin/list",
                        title: "Liste",
                        type: "link",
                        lanClass: "lan-6"
                    },
                    {

                        title: "Coachs",
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            {path: "/users/admin/coachs", title: 'liste', type: 'link'},
                            {path: '/users/admin/coachs/expertises', title: 'Expertises', type: 'link'}
                        ]

                    },
                    {
                        title: "Staff",
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            {path: "/users/admin/staffMembers", title: 'liste', type: 'link'},
                            {path: "/users/admin/staffMembers/positions", title: "Job Title", type: 'link'}
                        ]
                    }
                ]
            },
            {
                title: "Programmes",
                id: 3,
                icon: "builders",
                type: "sub",
                lanClass: "lan-1",
                active: false,
                children: [
                    {
                        path: "/programs",
                        title: "Tous les programmes",
                        type: "link",
                        lanClass: "lan-6",
                    },
                    {
                        title: "Activités",
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            {
                                path: "/project",
                                title: "Toutes les activités",
                                type: "link",
                                lanClass: "lan-6"
                            },
                            {
                                path: "/project/projectTypes",
                                title: "types",
                                type: "link",
                                lanClass: "lan-6"
                            },
                            {path: "/project/projectCategory", title: "catégorie", type: "link", lanClass: "lan-6"},
                        ]
                    },
                    {
                        title: "Evénements",
                        id: 4,
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            {
                                path: "/events",
                                title: "Tous les événements",
                                type: "link",
                                lanClass: "lan-6"
                            },
                            {
                                path: "/events/eventsTypes",
                                title: "Types",
                                type: "link",
                                lanClass: "lan-6"
                            },
                        ]
                    },

                ]
            },
            {
                title: "Partenaires",
                id: 5,
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
                title: "Rapports",
                id: 3,
                icon: "charts",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: '/reports',
            },
            {
                title: "Rôle",
                id: 6,
                icon: "file",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: "/roles",
            },
            {
                title: "Notifications",
                id: 7,
                icon: "chat",
                type: "link",
                lanClass: "lan-1",
                active: false,
                path: '/notifications',
            },
        ],
        requiredRoles: ["admin", "staff"],
    },
    {
        id: 3,
        title: "Coach",
        lanClass: "lan-1",
        menucontent: "coach",
        Items: [

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
