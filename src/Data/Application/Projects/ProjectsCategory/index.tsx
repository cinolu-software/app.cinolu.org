import {Button} from "reactstrap";
import {CategoryListTableColumnType, CategoryListTableNameType, CategoryType} from "@/Types/Projects/category/CategoryType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useDispatch, useSelector} from "react-redux";
import {setModalDeleteCategory, setModalEditCategory} from "@/Redux/Reducers/projectSlice/projectCategorySlice";


const CategoriesListTableName: React.FC<CategoryListTableNameType> = ({image, name})=> {

    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    )
}

const CategoryListTableAction: React.FC<{category: CategoryType}> = ({category}) => {

    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(setModalEditCategory({isOpen: true, category }));
    }

    const handleDelete = () => {
        dispatch(setModalDeleteCategory({isOpen: true, category}));
    }

    return (
        <div className="product-action">
            <Button size={"sm"} onClick={handleEdit}>Modifier</Button>
            <Button size={"sm"} color={"danger"} onClick={handleDelete}>Supprimer</Button>
        </div>
    )
}

export const CategoryListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: CategoryListTableColumnType) => <CategoriesListTableName image={row.image} name={row.name} />,
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de création",
        selector: (row: CategoryListTableColumnType) => `${row.created_at}`,
        sortable: true,
    },
    {
        name: "Date de modification",
        selector: (row: CategoryListTableColumnType) => `${row.updated_at}`,
        sortable: true,
    },
    {
        name: "Action",
        cell: (row: CategoryListTableColumnType) => <CategoryListTableAction category={row} />
    }
]
