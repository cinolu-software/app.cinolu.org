import {MenuItem} from "@/Types/LayoutTypes";

export const MenuList: MenuItem [] | undefined = [
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
                        title: "Personnel",
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
                        title: "TProgrammes",
                        type: "link",
                        lanClass: "lan-6",
                    },
                    {
                        title: "Projets",
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            { path: "/projects/list", title: "Tous les Projets", type: "link", lanClass: "lan-6"},
                            { path: "/projects/list/published", title: "Projets publiés", type: "link", lanClass: "lan-6"},
                            { path: "/projects/list/unPublished", title: "Projets non publiés", type: "link", lanClass: "lan-6"},
                            {path: "/projects/category", title: "catégorie", type: "link", lanClass: "lan-6"},
                        ]
                    },
                    {
                        title: "Event",
                        id: 4,
                        type: "sub",
                        lanClass: "lan-6",
                        children: [
                            {
                                path: "/evenement/list",
                                title: "Tevenements",
                                type: "link",
                                lanClass: "lan-6"
                            },
                            {
                                path: "/evenement/category",
                                title: "Catégorie",
                                type: "link",
                                lanClass: "lan-6"
                            },
                        ]
                    },
                ]
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
        ],
        requiredRoles: ["admin", "staff"],
    },
];