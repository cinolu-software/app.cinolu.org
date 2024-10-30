import React from 'react';
import {Button} from "reactstrap";
import {PartnerListTableColumnType, PartnerType} from "@/Types/PartnerType/PartnerType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalDeletePartner, setModalEditPartner} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import SVG from '@/CommonComponent/SVG';

const PartnerListTableName: React.FC<{image: string; name: string}> = ({image, name}) =>{
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    )
}

const PartnerListTableAction: React.FC<{partner: PartnerType}> = ({partner}) =>{

    const dispatch = useAppDispatch();

    const handleEdit = () =>{
        dispatch(setModalEditPartner({isOpen: true, partner: partner}))
    }

    const handleDelete = () => {
        dispatch(setModalDeletePartner({isOpen: true, partner: partner}))
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

export const PartnerListTableDataColumn = [
    {
        name: "Name",
        cell:(row: PartnerListTableColumnType) => <PartnerListTableName image={"programs/types/typeProgram.png"} name={row.name}/>,
        sortable: true,
        grow: 3
    },
    {
        name: "Actions",
        cell: (row: PartnerListTableColumnType) => <PartnerListTableAction partner={row}/>,
        sortable: false,
        grow: 1
    }
]