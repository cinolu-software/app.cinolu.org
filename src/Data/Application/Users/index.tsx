import React, {useState} from 'react';
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import {UsersListTableColumnType, UserType} from "@/Types/Users/UsersType";
import {setModalDeleteUser, setModalDeleteCoach, setModalDeleteStaffMember, setSelectedCoach, setSelectedUser, setSelectedStaffMember } from "@/Redux/Reducers/userSlice/UserSlice";
import {imageBaseUrl} from "@/services/axios";
import SVG from "@/CommonComponent/SVG";
import {useRouter} from "next/navigation";
import {Spinner} from "reactstrap";

const UsersListTableName : React.FC<{image: string; name: string}> = ({image, name}) => {

  return (
      <div className={'product-names my-2'}>
        <div className={'light-product-box bg-img-cover'}>
          <RatioImage src={`${image}`} alt={'image'} />
        </div>
        <p>
          {name}
        </p>
      </div>
  );

}

const UsersListTableAction : React.FC<{user: UserType}> = ({ user}) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = () => {
    dispatch(setModalDeleteUser({isOpen: true, user}));
  }

  const handleViewDetail = () => {
    setLoadingDetail(true)
    router.push('/users/admin/detail_user');
    dispatch(setSelectedUser({user}));
  }

  const handleModifiedUser = () => {
    setLoadingEdit(true)
    setTimeout(()=>{
      router.push('/users/admin/edit_user');
      setLoadingEdit(false);
    }, 1000)
    dispatch(setSelectedUser({user}))
  }

  return (
      <div className="product-action">
        <div className={'row w-100 justify-content-center'}>
          <div className={'col-4'}>
            <button
                style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                onClick={handleModifiedUser}
            >
              <span>
                {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
              </span>
            </button>
          </div>

          <div className={'col-4'}>
            <button onClick={handleViewDetail} style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
              </span>
            </button>
          </div>

          <div className={'col-4'}>
            <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
              {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
            </button>
          </div>
        </div>
      </div>
  )
}

const CoachListTableAction : React.FC<{user: UserType}> = ({ user}) => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = () => {
    dispatch(setModalDeleteCoach({isOpen: true, user}));
  }

  const handleViewDetail = () => {
    setLoadingDetail(true)
    dispatch(setSelectedCoach({coach: user}))
    router.push('/users/admin/coachs/detail_coach');
  }

  const handleModifiedCoach = () => {
    setLoadingEdit(true)
    setTimeout(()=>{
      router.push('/users/admin/coachs/edit_coach');
      setLoadingEdit(false);
    }, 1000)
    dispatch(setSelectedCoach({coach: user}))
  }

  return (
      <div className="product-action">
        <div className={'row w-100 justify-content-center'}>
          <div className={'col-4'}>
            <button
                style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                onClick={handleModifiedCoach}
            >
              <span>
                {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
              </span>
            </button>
          </div>

          <div className={'col-4'}>
            <button onClick={handleViewDetail}
                    style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
              </span>
            </button>
          </div>

          <div className={'col-4'}>
            <button
                style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                onClick={handleDelete}
            >
              {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
            </button>
          </div>
        </div>
      </div>
  )
}


const StaffMemberListTableAction: React.FC<{ user: UserType }> = ({user}) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = () => {
    dispatch(setModalDeleteUser({isOpen: true, user}));
  }

  const handleViewDetail = () => {
    setLoadingDetail(true)
    router.push('/users/admin/staffMembers/detail_staffMembers');
    dispatch(setSelectedStaffMember({staffMember: user}));
  }

  const handleModifiedUser = () => {
    setLoadingEdit(true)
    setTimeout(()=>{
      router.push('/users/admin/staffMembers/edit_staffMembers');
      setLoadingEdit(false);
    }, 1000)
    dispatch(setSelectedStaffMember({staffMember: user}))
  }


  return (
      <div className="product-action">
        <div className={'row w-100 justify-content-center'}>
          <div className={'col-4'}>
            <button
                style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                onClick={handleModifiedUser}
            >
              <span>
                {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
              </span>
            </button>
          </div>
          <div className={'col-4'}>
            <button onClick={handleViewDetail}
                    style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
              </span>
            </button>
          </div>
          <div className={'col-4'}>
            <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                    onClick={handleDelete}>
              {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
            </button>
          </div>
        </div>
      </div>
  )
}


export const UsersListTableDataColumn = [
  {
    name: "Nom",
    cell: (row: UsersListTableColumnType) => (
        <UsersListTableName
            image={
                    row?.profile ?
                        `${imageBaseUrl}/profiles/${row?.profile}` :
                          row?.google_image
                            ? row.google_image
                            : "/assets/images/avtar/avatar.jpg"
            }
            name={row.name}/>
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
    name: "Actions",
    cell: (row: UsersListTableColumnType) => (
        <UsersListTableAction user={row}/>
    ),
    grow: 2
  }
];

export const CoatchListTableDataColumn = [
  {
    name: "Nom",
    cell: (row: UsersListTableColumnType) => (
        <UsersListTableName
            image={
              row?.profile ?
                  `${imageBaseUrl}/profiles/${row?.profile}` :
                  row?.google_image
                      ? row.google_image
                      : "/assets/images/avtar/avatar.jpg"
            }
            name={row.name}/>
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
    name: "Actions",
    cell: (row: UsersListTableColumnType) => (
        <CoachListTableAction user={row}/>
    ),
    grow: 2
  }
];

export const StaffMemberListTableDataColumn = [
  {
    name: "Nom",
    cell: (row: UsersListTableColumnType) => (
        <UsersListTableName
            image={
              row?.profile ?
                  `${imageBaseUrl}/profiles/${row?.profile}` :
                  row?.google_image
                      ? row.google_image
                      : "/assets/images/avtar/avatar.jpg"
            }
            name={row.name}/>
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
    name: "Actions",
    cell: (row: UsersListTableColumnType) => (
        <StaffMemberListTableAction user={row}/>
    ),
    grow: 2
  }
];

export const AddUser = [
  {
    id: 1,
    icon: "user_contact",
    title: "Utilisateur",
    detail: "Utilisateur"
  },
  {
    id: 2,
    icon: "user_role",
    title: "Rôle de l'utilisateur",
    detail: "Sélectionner le rôle de l'utilisateur"
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


