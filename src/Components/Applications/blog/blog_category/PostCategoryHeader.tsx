import React from "react";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const PostCategoryHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory} = useAppSelector((state) => state.postCategory);

    return (
        <AddWithModalButton buttonText={'Ajouter une Catégorie'} onClick={() => dispatch(setModalCreateCategory({ isOpen : !isOpenModalCreateCategory}))} />
    )
}