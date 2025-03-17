export const ContactWrapperData = [
    {
        mainLetter: "A",
        contactData: [
            {
                image: "avtar/14.png",
                name: "Andres Williamson",
                phoneNumber: "191-900-5689",
                imageUser: undefined
            },
        ],
    },
    // {
    //     mainLetter: "B",
    //     contactData: [
    //         {
    //             image: "blog/blog-3.jpg",
    //             name: "Britlin Weed",
    //             phoneNumber: "698-781-5581",
    //         },
    //         {
    //             imageUser: "BD",
    //             color: "info",
    //             name: "Brendra Dixit",
    //             phoneNumber: "589-789-2563",
    //         },
    //     ],
    // },
    // {
    //     mainLetter: "C",
    //     contactData: [
    //         {
    //             image: "blog/14.png",
    //             name: "Cody Fisher",
    //             phoneNumber: "983-333-4545",
    //         },
    //         {
    //             imageUser: "CE",
    //             color: "success",
    //             name: "Clifford Evans",
    //             phoneNumber: "321-456-7878",
    //         },
    //         {
    //             imageUser: "CW",
    //             color: "warning",
    //             name: "Cameron Williamson",
    //             phoneNumber: "369-852-7417",
    //         },
    //     ],
    // },
    // {
    //     mainLetter: "D",
    //     contactData: [
    //         {
    //             image: "blog/12.png",
    //             name: "Darlene Robertson",
    //             phoneNumber: "231-279-1001",
    //         },
    //         {
    //             image: "user/3.png",
    //             name: "Dianne Russell",
    //             phoneNumber: "569-789-1002",
    //         },
    //         {
    //             image: "user/6.jpg",
    //             name: "Darrell Steward",
    //             phoneNumber: "200-300-1030",
    //         },
    //     ],
    // },
    // {
    //     mainLetter: "E",
    //     contactData: [
    //         {
    //             image: "user/1.jpg",
    //             name: "Emily Collins",
    //             phoneNumber: "100-555-7032",
    //         },
    //     ],
    // },
    // {
    //     mainLetter: "F",
    //     contactData: [
    //         {
    //             image: "user/2.jpg",
    //             name: "Fiona Cooper",
    //             phoneNumber: "362-778-1919",
    //         },
    //         {
    //             imageUser: "FG",
    //             color: "danger",
    //             name: "Freya Grayson",
    //             phoneNumber: "589-789-2563",
    //         },
    //     ],
    // },
    // {
    //     mainLetter: "G",
    //     contactData: [
    //         {
    //             imageUser: "GE",
    //             color: "warning",
    //             name: "Gabriel Evans",
    //             phoneNumber: "963-147-5024",
    //         },
    //     ],
    // },
];

export const ChatApiData = [
    {
        id: 1,
        users: [0, 1],
        lastMessageTime: "18:20",
        messages: [
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "Hey, I'm looking to redesign my website. Can you help me? 😄",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Absolutely! I'd be happy to assist you.",
            },
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "I want a clean and modern look with a focus on user experience.",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Great! Do you have any specific color schemes in mind?",
            },
        ],
    },
    {
        id: 2,
        users: [0, 4],
        lastMessageTime: "10:20",
        messages: [
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "Hey, I'm looking to redesign my website. Can you help me? 😄",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Absolutely! I'd be happy to assist you.",
            },
        ],
    },
    {
        id: 3,
        users: [0, 6],
        lastMessageTime: "18:20",
        messages: [
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "Hey, I'm looking to redesign my website. Can you help me? 😄",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Absolutely! I'd be happy to assist you.",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Great! Do you have any specific color schemes in mind?",
            },
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "I'm thinking of using a combination of blues and grays.",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Excellent choice! Those colors can definitely create a professional.",
            },
        ],
    },
    {
        id: 4,
        users: [0, 9],
        lastMessageTime: "18:20",
        messages: [
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "Hey, I'm looking to redesign my website. Can you help me? 😄",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Absolutely! I'd be happy to assist you.",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "What kind of design aesthetic are you aiming for?",
            },
            {
                sender: 0,
                class: "left",
                time: "01:14 PM",
                text: "I want a clean and modern look with a focus on user experience.",
            },
            {
                sender: 1,
                class: "right",
                time: "12:14 PM",
                text: "Great! Do you have any specific color schemes in mind?",
            },
        ],
    },
];

export const ChatMemberApiData = [
    {
        id: 0,
        name: "Lyu Chang",
        image: "avtar/1.jpg",
        status: "I'm busy",
        online: "success",
        lastSeenDate: "0",
        time: "7:30 PM",
        reply: "fa fa-reply font-danger",
        badge: true,
    },
    {
        id: 1,
        name: "Berry Numbi",
        image: "avtar/1.jpg",
        status: "Hey, How are you?",
        online: "success",
        lastSeenDate: "0",
        time: "7:30 PM",
        reply: "fa fa-reply font-danger",
        badge: true,
    },
    {
        id: 2,
        name: "Rodriguez Monga",
        image: "avtar/16.jpg",
        status: "Thanks for reply",
        lastSeenDate: "Last seen yesterday 20:07",
        online: "success",
        time: "7:30 PM",
        reply: "fa fa-reply font-danger",
    },
    {
        id: 3,
        name: "Joyce Mishika",
        image: "avtar/19.jpg",
        status: "Hey, What's up?",
        lastSeenDate: "Last seen today 15:24",
        online: "success",
        time: "1:10 PM",
        reply: "fa fa-reply font-success",
    },
    {
        id: 4,
        name: "Josué Vangu",
        image: "avtar/2.jpg",
        status: "I'm ready",
        lastSeenDate: "Last seen today 13:24",
        online: "success",
        time: "13:10 PM",
        reply: "fa fa-reply font-success",
    },
    {
        id: 5,
        name: "Megan Madia",
        image: "avtar/4.jpg",
        status: "Hey, How are you?",
        lastSeenDate: "1:30 PM",
        online: "success",
        time: "1:30 PM",
        reply: "fa fa-reply font-success",
    },
    {
        id: 6,
        name: "Lydia Saku",
        image: "avtar/3.jpg",
        status: "What's going on?",
        lastSeenDate: "Last seen today 12:10",
        online: "warning",
        time: "2:10 PM",
        reply: "fa fa-reply font-success",
    },
    {
        id: 7,
        name: "Martin Webb",
        image: "avtar/5.jpg",
        status: "What's up?",
        lastSeenDate: "Last seen today 22:24",
        online: "success",
        time: "1:50 AM",
        reply: "fa fa-reply font-danger",
    },
    {
        id: 8,
        name: "Floyd Miles",
        image: "avtar/10.jpg",
        status: "Are you sure?",
        lastSeenDate: "Last seen today 00:24",
        online: "warning",
        time: "5:14 PM",
        reply: "fa fa-reply font-success",
    },
    {
        id: 9,
        name: "Anne Black",
        image: "avtar/7.jpg",
        status: "Thanks",
        lastSeenDate: "Last seen yesterday 06:47",
        online: "warning",
        time: "1:50 PM",
        reply: "fa fa-reply font-danger",
    },
];

export const GroupChatHeader = ["avtar/16.jpg", "avtar/4.jpg", "avtar/7.jpg", "avtar/11.jpg", "avtar/4.jpg", "blog/comment.jpg", "avtar/7.jpg"];