import { Button } from "reactstrap";
import { RoleListTableColumnType, RoleListTableNameType, RoleType } from "@/Types/AdminOptions/Roles/RoleType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalEditRole, setModalDeleteRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";

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
        <div className="product-action w-100">
            <div className={'row w-100'}>
                <div className={'col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6'}>
                    <Button size={"sm"} onClick={handleEdit} color={'outline-primary'} className={'w-100'}>Modifier</Button>
                </div>
                <div className={'col-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6'}>
                    <Button size={'sm'} color={'outline-danger'} className={'w-100'} onClick={handleDelete}>Supprimer</Button>
                </div>
            </div>
        </div>
    );
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
        cell: (row: RoleListTableColumnType) => <RoleListTableAction role={row} />,
    }
];
