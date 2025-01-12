import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";
import {setModalCreateProgram} from "@/Redux/Reducers/programSlice/programSlice";

export const ProgramTypesHeader = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalCreateProgram} = useAppSelector(state=>state.program);

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter un Type de Programme"
                onClick={() => dispatch(setModalCreateProgram({ isOpen : !isOpenModalCreateProgram}))}
            />
        </div>
    );
};

export default ProgramTypesHeader;