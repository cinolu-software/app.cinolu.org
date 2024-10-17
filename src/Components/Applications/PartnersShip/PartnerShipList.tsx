import React from 'react';
import {Button} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreatePartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";

const PartnerShipList = () => {

    const dispatch = useAppDispatch()
    const {isOpenModalCreatePartnerShip} = useAppSelector((state) => state.partnerShip);

    return (
        <div>
            <Button className={'btn btn-primary'} onClick={()=> dispatch(setModalCreatePartnerShip({isOpen: !isOpenModalCreatePartnerShip}))}></Button>
            <i className={'fa fa-plus'}/>
            Ajouter un Partenariat
        </div>
    )
}
export default PartnerShipList
