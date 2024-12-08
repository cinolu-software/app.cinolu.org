import React from 'react';
import { Button } from "reactstrap";
import {Expertise, ExpertisesListTypeTableColumnType} from "@/Types/Users/Coachs/ExpertiseType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalDeleteExpertise, setModalEditExpertise} from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import SVG from '@/CommonComponent/SVG';


const ExpertiseListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ExpertiseListTableAction: React.FC<{ expertise: Expertise }> = ({ expertise }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditExpertise({ isOpen: true, expertise }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteExpertise({ isOpen: true, expertise }));
    };


    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleEdit}>
                <span>
                  <SVG iconId="editTable"/>
                </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export const ExpertiseListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ExpertisesListTypeTableColumnType) => (
            <ExpertiseListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: ExpertisesListTypeTableColumnType) => <ExpertiseListTableAction expertise={row} />,
        grow: 1
    },
];