import React from 'react';
import { Button } from "reactstrap";
import { Position, PositionsListTypeTableColumnType } from "@/Types/Users/Members/PositionsType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalDeletePosition, setModalEditPosition } from "@/Redux/Reducers/userSlice/PositionSlice";
import SVG from '@/CommonComponent/SVG';

const PositionListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const PositionListTableAction: React.FC<{ position: Position }> = ({ position }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditPosition({ isOpen: true, position }));
    };

    const handleDelete = () => {
        dispatch(setModalDeletePosition({ isOpen: true, position }));
    };

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <button style={{ border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100 }} onClick={handleEdit}>
                        <span>
                            <SVG iconId="editTable" />
                        </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button style={{ border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100 }} onClick={handleDelete}>
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PositionListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: PositionsListTypeTableColumnType) => (
            <PositionListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: PositionsListTypeTableColumnType) => <PositionListTableAction position={row} />,
        grow: 1,
    },
];