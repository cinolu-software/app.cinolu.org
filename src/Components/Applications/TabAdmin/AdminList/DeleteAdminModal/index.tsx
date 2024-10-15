import React from 'react';
import {ImagePath} from '@/Constant';
import {Button, Card, CardBody, Col} from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalDeleteUser, deleteUser} from "@/Redux/Reducers/userSlice/UserSlice";
import { toast, Flip} from 'react-toastify';

const DeleteAdminModal = () => {
    const dispatch = useAppDispatch();
    const {isOpenModalDeleteUser, selectedUser, usersData} = useAppSelector(state => state.users);
    const selectedUserData = usersData.find(user => user.id === selectedUser?.id);


    const handleDelete = () => {
        if(selectedUserData && selectedUserData.id !== undefined) {
            try{
                dispatch(deleteUser(selectedUserData.id));
                dispatch(setModalDeleteUser({isOpen: false}));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"l'utilisateur a été supprimé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }catch (e){
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la suppression de l'utilisateur"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }
        }
    }

    return (
        <Col xl={'4'}>
            <CardBody className={'badge-spacing'}>
                <CommonModal
                    centered isOpen={isOpenModalDeleteUser}
                    toggle={()=>dispatch(setModalDeleteUser({isOpen: false, user: null}))}
                    title={"Suppression d'un utilisateur"}
                >
                    <div className={"modal-toggle-wrapper"}>
                        <ul className={"modal-img"}>
                            <li className={"text-center"}>
                                <img src={`${ImagePath}/gif/danger.gif`} alt={"danger"}/>
                            </li>
                        </ul>
                        <h4 className={"text-center pb-2"}>
                            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                        </h4>
                        {selectedUserData && (
                            <p className="text-center">
                                Vous êtes sur le point de supprimer l'utilisateur suivant
                                : <strong>{selectedUserData.name}</strong>
                            </p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteUser({isOpen: false, user: null}))}
                            >
                                {"Fermer"}
                            </Button>
                            <Button color="danger" onClick={handleDelete}>
                                {"Supprimer"}
                            </Button>
                        </div>
                    </div>
                </CommonModal>
            </CardBody>
        </Col>
    )
}

export default DeleteAdminModal