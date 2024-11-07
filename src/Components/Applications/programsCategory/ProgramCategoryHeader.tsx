import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgramTypes} from "@/Redux/Reducers/programsSlice/programsTypeSlice";

export const ProgramCategoryHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory } = useAppSelector((state) => state.programCategory);


    return (
        <div>
            <Button className="btn btn-primary" onClick={() => dispatch(setModalCreateProgramTypes({ isOpen : !isOpenModalCreateCategory}))}>
                <i className="fa fa-plus" />
                Ajouter une Catégorie
            </Button>
        </div>
    );
};