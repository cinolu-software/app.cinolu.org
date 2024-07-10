import { RoleListTableColumnType, RoleListTableNameType} from "@/Types/AdminOptions/Roles/RoleType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import SVG from "@/CommonComponent/SVG";
import Link from "next/link";


const RoleListTableName: React.FC<RoleListTableNameType> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    )
}

const RoleListTableAction = () => {

    return (
        <div className="product-action">
            <Link href={`/`}>
                <SVG iconId="edit-content" />
            </Link>
            <SVG iconId="trash1" />
        </div>
    )
}

export const RoleListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: RoleListTableColumnType) => <RoleListTableName image={row.image} name={row.name} />,
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de création",
        selector: (row: RoleListTableColumnType) => `${row.created_at}`,
        sortable: true,
    },
    {
        name: "Date de modification",
        selector: (row: RoleListTableColumnType) => `${row.updated_at}`,
        sortable: true,
    },
    {
        name : "Action",
        cell: () => <RoleListTableAction/>,
    }
]