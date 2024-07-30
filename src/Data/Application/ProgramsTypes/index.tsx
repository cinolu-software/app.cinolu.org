import React from 'react';
import { Button } from "reactstrap";
import { ProgramListTableColumnTypeType, ProgramsListTypeTableColumnNameTypeType, ProgramsTypeType} from "@/Types/Programs/ProgramsTypeType";

import RatioImage from "@/CommonComponent/RatioImage";

import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalDeleteProgram, setModalEditProgram } from "@/Redux/Reducers/programsSlice/programsSlice";



const ProgramsListTableName: React.FC<ProgramsListTypeTableColumnNameTypeType> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramsListTableAction: React.FC<{ program: ProgramsTypeType }> = ({ ProgramsTypeType }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditProgram({ isOpen: true, program }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProgram({ isOpen: true, program }));
    };

    return (
        <div className="product-action">
            <Button size={"sm"} onClick={handleEdit}>Modifier</Button>
            <Button size={"sm"} color={"danger"} onClick={handleDelete}>Supprimer</Button>
        </div>
    );
};

export const ProgramsListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ProgramListTableColumnTypeType) => (
            <ProgramsListTableName image={row.image || "default_program_image.png"} name={row.name} />
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Description",
        selector: (row: ProgramListTableColumnTypeType) => (
            <div>{row.description}</div>
        ),
        sortable: false,
    },

    {
        name: "Action",
        cell: (row: ProgramListTableColumnTypeType) => <ProgramsListTableAction program={row} />,
    },
];
