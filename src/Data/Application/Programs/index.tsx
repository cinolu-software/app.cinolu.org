import React from 'react';
import {ProgramListTypeTableColumnType, ProgramType} from "@/Types/Programs/ProgramType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalDeleteProgram, setModalEditProgram} from "@/Redux/Reducers/programSlice/programSlice";
import SVG from '@/CommonComponent/SVG';


const ProgramListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramListTableAction: React.FC<{ program: ProgramType }> = ({ program }) => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditProgram({ isOpen: true, program }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProgram({ isOpen: true, program }));
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

export const ProgramTypeListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ProgramListTypeTableColumnType) => (
            <ProgramListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: ProgramListTypeTableColumnType) => <ProgramListTableAction program={row} />,
        grow: 1
    },
];