import React from 'react';
import { Button } from "reactstrap";
import { ProgramListTableColumnType, ProgramsType } from "@/Types/Programs/ProgramsType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalDeleteProgram, setModalEditProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import { TableColumn } from "react-data-table-component";

const ProgramsListTableName: React.FC<{image: string, name: string}> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramsListTableAction: React.FC<{ program: any }> = ({ program }) => {

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

export const ProgramsListTableDataColumn: TableColumn<ProgramListTableColumnType>[] = [
    {
        name: "Nom",
        cell: (row: ProgramListTableColumnType) => (
            <ProgramsListTableName image={row.image || "default_program_image.png"} name={row.name} />
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Description",
        selector: (row: ProgramListTableColumnType) => row.description,
        sortable: false,
    },
    {
        name: "Date de début",
        selector: (row: ProgramListTableColumnType) => row.start_at,
        sortable: true,
    },
    {
        name: "Date de fin",
        selector: (row: ProgramListTableColumnType) => row.end_at,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row: ProgramListTableColumnType) => <ProgramsListTableAction program={row} />,
    },
];

