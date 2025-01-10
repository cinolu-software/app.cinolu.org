import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/projectSlice/ProjectCategory";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const ProjectCategoryHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory } = useAppSelector((state) => state.projectCategory);

    return (
        <AddWithModalButton buttonText={'Ajouter une Catégorie'} onClick={() => dispatch(setModalCreateCategory({ isOpen : !isOpenModalCreateCategory}))} />
    );

};