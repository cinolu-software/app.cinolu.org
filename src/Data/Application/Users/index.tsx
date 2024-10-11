import React from 'react';
import {Button} from 'reactstrap';
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useDispatch} from "react-redux";
import {UsersListTableColumnType, UserType} from "@/Types/Users/UsersType";
import {setModalEditUser, setModalDeleteUser} from "@/Redux/Reducers/userSlice/UserSlice";


const UsersListTableName: React.FC<{image: string; name: string}> = ({image, name}) => {
  return (
      <div className={'product-names my-2'}>
        <div className={'light-product-box bg-img-cover'}>
          <RatioImage src={`${ImagePath}/${image}`} alt={'image'} />
        </div>
        <p>{name}</p>
      </div>
  )
}

const UsersListTableAction: React.FC<{user: UserType}> = ({ user}) => {

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setModalEditUser({isOpen: true, user}));
  }

  const handleDelete = () => {
    dispatch(setModalDeleteUser({isOpen: true, user}));
  }

  return (
      <div className={'product-action'}>
        <Button color={'primary'} className={'me-2'} onClick={handleEdit}>Modifier</Button>
        <Button color={'danger'} onClick={handleDelete}>Supprimer</Button>
      </div>
  )
}

export const UsersListTableDataColumn = [
  {
    name: "Nom",
    cell: (row: UsersListTableColumnType)=> (
        <UsersListTableName image={"default_program_image.png"} name={row.name} />
    ),
    sortable: true,
    grow: 2
  },
    {
        name: "Email",
        selector: (row: UsersListTableColumnType) => row.email,
        sortable: true,
        grow: 2
    },
    {
        name: "Rôle",
        selector: (row: UsersListTableColumnType) => row?.role,
        sortable: true,
        grow: 1
    },
  {
    name: "Actions",
    cell: (row: UsersListTableColumnType) => (
        <UsersListTableAction user={row}/>
    ),
    grow: 2
  }
]



// export const UserListTableColumn = [
//   {
//     name: "Nom",
//     selector: (row: UserType) => row.name,
//     sortable: true,
//   },
//   {
//     name: "Email",
//     selector: (row: UserType) => row.email,
//     sortable: true,
//   },
//   {
//     name: "Rôle",
//     selector: (row: UserType) => row.role,
//     sortable: true,
//   },
//   {
//     name: "Actions",
//     cell: (row: UserType) => (
//         <div>
//           <button className="btn btn-primary me-2">Modifier</button>
//           <button className="btn btn-danger">Supprimer</button>
//         </div>
//     ),
//   },
// ]

export const UserProfileData = [
  {
    iconClass: "envelope",
    text: "Email",
    spanText: "Marekjecno@yahoo.com",
  },
  {
    iconClass: "calendar",
    text: "BOD",
    spanText: "02 January 1988",
  },
];

export const UserAddressData = [
  {
    iconClass: "phone",
    text: "   Contact Us",
    spanText: "India +91 123-456-7890",
  },
  {
    iconClass: "location-arrow",
    text: "   Location",
    spanText: "69 Near Schoool Demo Home",
  },
];

export const UserSocialData = [
  {
    link: "https://www.facebook.com/",
    icon: "facebook",
  },
  {
    link: "https://accounts.google.com/",
    icon: "google-plus",
  },
  {
    link: "https://twitter.com/",
    icon: "twitter",
  },
  {
    link: "https://www.instagram.com/",
    icon: "instagram",
  },
  {
    link: "https://rss.app/",
    icon: "rss",
  },
];

export const SocialData = [
  {
    count: 25869,
    text: "Follower",
    class: "text-md-end border-right",
  },
  {
    count: 659887,
    text: "Following",
    class: "text-md-start",
  },
];

export const CommonUserData = [
  {
    listClass: "border-right pe-3",
    icon: "heart",
    text: "  Like",
    count: 2659,
  },
  {
    listClass: "ms-2",
    icon: "comment",
    text: "  Comment",
    count: 569,
  },
];

export const AddProjectAndUpload = [
  {
    date: "28 May 2023",
    status: "Completed",
    statusClass: "bg-success",
    price: "$56,908",
  },
  {
    date: "12 June 2023",
    status: "On going",
    statusClass: "bg-danger",
    price: "$45,087",
  },
  {
    date: "12 July 2023",
    status: "Pending",
    statusClass: "bg-warning",
    price: "$60,123",
  },
  {
    date: "14 June 2023",
    status: "Pending",
    statusClass: "bg-warning",
    price: "$70,435",
  },
  {
    date: "25 June 2023",
    status: "Completed",
    statusClass: "bg-success",
    price: "$15,987",
  },
];

export const UserCardData = [
  {
    id: 1,
    card_bg: "user-card/1.jpg",
    avatar: "avtar/2.jpg",
    name: "Brooklyn Simmons",
    userProfile: "@brookly.simmons",
    follower: "1908",
    following: "34.04",
    totalPost: "897",
  },
  {
    id: 2,
    card_bg: "user-card/2.jpg",
    avatar: "avtar/3.jpg",
    name: "Mark Jecno",
    userProfile: "@mark.jeco",
    follower: "875",
    following: "12.0",
    totalPost: "1400",
  },
  {
    id: 3,
    card_bg: "user-card/3.jpg",
    avatar: "avtar/11.jpg",
    name: "Dev John",
    userProfile: "@john.dev",
    follower: "1274",
    following: "15.0",
    totalPost: "1874",
  },
  {
    id: 4,
    card_bg: "user-card/7.jpg",
    avatar: "avtar/16.jpg",
    name: "Johan Deo",
    userProfile: "@deo.johan",
    follower: "500",
    following: "8.0",
    totalPost: "570",
  },
  {
    id: 5,
    card_bg: "user-card/5.jpg",
    avatar: "avtar/7.jpg",
    name: "Douglas Reichel",
    userProfile: "@reichel.douglas",
    follower: "460",
    following: "2",
    totalPost: "350",
  },
  {
    id: 6,
    card_bg: "user-card/6.jpg",
    avatar: "avtar/4.jpg",
    name: "Lisa lillian",
    userProfile: "@lisa.lillian",
    follower: "547",
    following: "3.5",
    totalPost: "822",
  },
  {
    id: 7,
    card_bg: "user-card/1.jpg",
    avatar: "user/1.jpg",
    name: "Olivia rose",
    userProfile: "@rose.olivia",
    follower: "868",
    following: "1",
    totalPost: "742",
  },
  {
    id: 8,
    card_bg: "user-card/1.jpg",
    avatar: "user/2.png",
    name: "Sarah Karen",
    userProfile: "@karen.sarah",
    follower: "972",
    following: "2.5",
    totalPost: "864",
  },
];

export const UserSocialDataList = [
  {
    link: "https://www.facebook.com/",
    iconClassName: "fa-facebook",
  },
  {
    link: "https://www.google.com/",
    iconClassName: "fa-google-plus",
  },
  {
    link: "https://www.twitter.com/",
    iconClassName: "fa-twitter",
  },
  {
    link: "https://www.instagram.com/",
    iconClassName: "fa-instagram",
  },
  {
    link: "https://dashboard.rss.com/auth/sign-in/",
    iconClassName: "fa-rss",
  },
];
