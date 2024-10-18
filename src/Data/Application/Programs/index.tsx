import React from 'react';

import {ReceiveProgramsType} from "@/Types/Programs/ProgramsType";

import RatioImage from "@/CommonComponent/RatioImage";

import {useDispatch} from "react-redux";

import {setModalDeleteProgram, setModalEditProgram} from "@/Redux/Reducers/programsSlice/programsSlice";

import {TableColumn} from "react-data-table-component";

import SVG from "@/CommonComponent/SVG";


const ProgramsListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {

    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );

};

const ProgramsListTableAction: React.FC<{ program: any }> = ({program}) => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditProgram({isOpen: true, program}));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProgram({isOpen: true, program}));
    };

    return (

        <div className={"product-action"}>
            <div className={'row'}>
                <div className={'col'}>
                     <span onClick={handleEdit}>
                        <SVG iconId={"edit-content"}/>
                     </span>
                </div>
                <div className={'col'}>
                    <span onClick={handleDelete}>
                        <SVG iconId={"trash1"}/>
                    </span>
                </div>
            </div>
        </div>
    );

};

export const ProgramsListTableDataColumn: TableColumn<ReceiveProgramsType>[] = [
    {
        name: "Nom",
        cell: (row: ReceiveProgramsType) => (
            <ProgramsListTableName image={'/assets/images/programs/programs.png'} name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Description",
        selector: (row: ReceiveProgramsType) => row.description,
        sortable: false,
    },
    {
        name: "Date de début",
        selector: (row: ReceiveProgramsType) => row.start_at,
        sortable: true,
    },
    {
        name: "Date de fin",
        selector: (row: ReceiveProgramsType) => row.end_at,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row: ReceiveProgramsType) => <ProgramsListTableAction program={row}/>,
    },
];

