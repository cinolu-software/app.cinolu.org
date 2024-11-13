import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const ProgramCategoryHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory } = useAppSelector((state) => state.programCategory);

    return (
        <AddWithModalButton buttonText={'Ajouter une Catégorie'} onClick={() => dispatch(setModalCreateCategory({ isOpen : !isOpenModalCreateCategory}))} />
    );

};