import { Button } from "reactstrap";
import { RoleListTableColumnType, RoleListTableNameType, RoleType } from "@/Types/AdminOptions/Roles/RoleType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalEditRole, setModalDeleteRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import SVG from "@/CommonComponent/SVG";

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
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                <SVG iconId="editTable"/>
              </span>
                    </button>
                </div>

                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}>
              <span>
                <SVG iconId="moreTable"/>
              </span>
                    </button>
                </div>

                <div className={'col-4'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
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
        cell: (row: RoleListTableColumnType) => <RoleListTableAction role={row} />,
    }
];
