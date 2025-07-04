import React from 'react';
import {ProgramListTypeTableColumnType, ProgramType} from "@/Types/Programs/ProgramType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalDeleteProgram, setModalEditProgram} from "@/Redux/Reducers/programSlice/programSlice";
import {Button} from "reactstrap";


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
            <div className={'row w-auto justify-content-center'}>
                <div className={'col-6 col-md-6 col-lg-6 col-xl-6'}>
                    <Button
                        color="info"
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
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>

                <div className={'col-6 col-md-6 col-lg-6 col-xl-6'}>
                    <Button
                        color={'danger'}
                        onClick={handleDelete}
                        outline
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        <span className="text-truncate">Supprimer</span>
                    </Button>
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