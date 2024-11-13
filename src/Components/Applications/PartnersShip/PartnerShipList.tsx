import React from 'react';
import {Button} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreatePartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

const PartnerShipList = () => {

    const dispatch = useAppDispatch()
    const {isOpenModalCreatePartnerShip} = useAppSelector((state) => state.partnerShip);

    return (
        <AddWithModalButton buttonText={'Ajouter un Partenariat'} onClick={()=> dispatch(setModalCreatePartnerShip({isOpen: !isOpenModalCreatePartnerShip}))}/>
    )
}

export default PartnerShipList
