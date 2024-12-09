import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateExpertise} from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const ExpertiseTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateExpertiseType} = useAppSelector(state=>state.expertise)

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter l'expertise"
                onClick={() => dispatch(setModalCreateExpertise({ isOpen : !isOpenModalCreateExpertiseType}))}
            />
        </div>
    );
};
