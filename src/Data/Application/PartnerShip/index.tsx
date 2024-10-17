import React from 'react';
import {Button} from "reactstrap";
import {PartnerShipListTableColumnType, PartnerShipType} from "@/Types/PartnerShipTypes/PartnerShipType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreatePartnerShip, setModalEditPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";

const PartnerShipListTableName: React.FC<{image: string; name: string}>= ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    )
}

const PartnerShipListTableAction: React.FC<{partnerShip: PartnerShipType}> = ({partnerShip}) => {
    const dispatch = useAppDispatch()
    const handleEdit= () => {
        dispatch(setModalEditPartnerShip({isOpen: true, partnerShip: partnerShip}))
    }

    const handleDelete = () => {
        dispatch(setModalEditPartnerShip({isOpen: true, partnerShip: partnerShip}))
    }

    return (
        <div className="product-action">
            <Button size={"sm"} color='outline-primary' onClick={handleEdit}>Modifier</Button>
            <Button size={"sm"} color={"outline-danger"} onClick={handleDelete}>Supprimer</Button>
        </div>
    );
}

export const PartnerShipListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: PartnerShipListTableColumnType) => <PartnerShipListTableName image={"programs/types/typeProgram.png"} name={row.name}/>,
        sortable: true,
        grow: 3
    },
    {
        name: "Actions",
        cell: (row: PartnerShipListTableColumnType) => <PartnerShipListTableAction partnerShip={row}/>,
    }
]