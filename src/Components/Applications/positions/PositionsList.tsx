import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreatePosition} from "@/Redux/Reducers/userSlice/PositionSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const PositionTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreatePosition} = useAppSelector(state=>state.position)

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter un job title"
                onClick={() => dispatch(setModalCreatePosition({ isOpen : !isOpenModalCreatePosition}))}
            />
        </div>
    );
};
