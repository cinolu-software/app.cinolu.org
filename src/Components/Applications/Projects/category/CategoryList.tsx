import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateCategory } from "@/Redux/Reducers/projectSlice/projectCategorySlice";

export const CategoryHeader = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalCreateCategory } = useAppSelector((state) => state.categories);

    return (
        <div>
            <Button
                className="btn btn-primary"
                onClick={() => dispatch(setModalCreateCategory({ isOpen: !isOpenModalCreateCategory }))}
            >
                <i className="fa fa-plus" />
                Ajouter une catégorie
            </Button>
        </div>
    );
};
