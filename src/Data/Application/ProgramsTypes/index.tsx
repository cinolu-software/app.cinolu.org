import React from 'react';
import { Button } from "reactstrap";
import { ProgramsListTypeTableColumnType, ProgramsTypeType } from "@/Types/Programs/ProgramsTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalDeleteProgramTypes, setModalEditProgramTypes } from "@/Redux/Reducers/programsSlice/programsTypeSlice";


const ProgramsListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramsListTableAction: React.FC<{ programType: ProgramsTypeType }> = ({ programType }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditProgramTypes({ isOpen: true, programType }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProgramTypes({ isOpen: true, programType }));
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
        cell: (row: ProgramsListTypeTableColumnType) => (
            <ProgramsListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Description",
        selector: (row: ProgramsListTypeTableColumnType) => (
            <div>{row.description}</div>
        ),
        sortable: false,
    },
    {
        name: "Action",
        cell: (row: ProgramsListTypeTableColumnType) => <ProgramsListTableAction programType={row} />,
    },
];
