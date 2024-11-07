import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";

export const ProgramCategoryHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory } = useAppSelector((state) => state.programCategory);


    return (
        <div>
            <Button className="btn btn-primary" onClick={() => dispatch(setModalCreateCategory({ isOpen : !isOpenModalCreateCategory}))}>
                <i className="fa fa-plus" />
                <span className={'ms-2'} >Ajouter une Catégorie</span>
            </Button>
        </div>
    );

};