import React from 'react';
import {Button} from "reactstrap";
import {PartnerShipListTableColumnType, PartnerShipType} from "@/Types/PartnerShipTypes/PartnerShipType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalDeletePartnerShip, setModalEditPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import SVG from '@/CommonComponent/SVG';

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
        dispatch(setModalDeletePartnerShip({isOpen: true, partnerShip: partnerShip}))
    }

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                <SVG iconId="editTable"/>
              </span>
                    </button>
                </div>

                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                <SVG iconId="moreTable"/>
              </span>
                    </button>
                </div>

                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    )
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