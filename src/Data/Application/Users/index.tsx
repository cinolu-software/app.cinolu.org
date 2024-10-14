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
        <UsersListTableName image={"avtar/avatar.jpg"} name={row.name} />
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

export const AddUser = [
  {
    id: 1,
    icon: "user_info",
    title: "Indetités de l'utilisateur",
    detail:"Indetités de l'utilisateur",
  },
  {
    id: 2,
    icon: "user_contact",
    title: "Contact de l'utilisateur",
    detail: "Contact de l'utilisateur"
  },
  {
    id: 3,
    icon: "user_role",
    title: "Rôle de l'utilisateur",
    detail: "Sélectionner le rôle de l'utilisateur"
  },
]

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


