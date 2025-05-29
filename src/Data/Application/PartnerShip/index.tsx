import React from 'react';
import {PartnerShipListTableColumnType, PartnerShipType} from "@/Types/PartnerShipTypes/PartnerShipType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeletePartnerShip, setModalEditPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import SVG from '@/CommonComponent/SVG';
import {Button} from "reactstrap";

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
        console.log('dans le bon!')
    }

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <Button
                        color="primary"
                        outline
                        onClick={handleEdit}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <></>
                            // <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>

                <div className={'col-6'}>
                    <Button
                        color="danger"
                        outline
                        onClick={handleDelete}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <></>
                            // <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Supprimer</span>
                    </Button>
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