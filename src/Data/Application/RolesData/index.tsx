import {Button} from "reactstrap";
import { RoleListTableColumnType, RoleListTableNameType, RoleType } from "@/Types/AdminOptions/Roles/RoleType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalEditRole, setModalDeleteRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import React from "react";

const RoleListTableName: React.FC<RoleListTableNameType> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const RoleListTableAction: React.FC<{ role: RoleType }> = ({ role }) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditRole({ isOpen: true, role }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteRole({ isOpen: true, role }));
    };

    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center g-2">
                <div className="col-4 col-md-4 d-flex justify-content-center">
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
                <div className="col-4 col-md-4 d-flex justify-content-center">
                    <Button
                        color="info"
                        outline
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>
                <div className="col-4 col-md-4 d-flex justify-content-center">
                    <Button
                        color={'danger'}
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
                        <span className="text-truncate">{'Supprimer'}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export const RoleListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: RoleListTableColumnType) => <RoleListTableName image={row.image} name={row.name} />,
        sortable: true,
        grow: 1,
    },
    {
        name: "Date de création",
        selector: (row: RoleListTableColumnType) => `${row.created_at}`,
        sortable: true,
        grow: 1,
    },
    {
        name: "Date de modification",
        selector: (row: RoleListTableColumnType) => `${row.updated_at}`,
        sortable: true,
        grow: 1,
    },
    {
        name: "Action",
        cell: (row: RoleListTableColumnType) => <RoleListTableAction role={row as any} />,
    }
];
