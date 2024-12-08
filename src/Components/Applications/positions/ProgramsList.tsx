import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgramTypes} from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const ProgramsTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgramType } = useAppSelector((state) => state.programsType);

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter un Type de Programme"
                onClick={() => dispatch(setModalCreateProgramTypes({ isOpen : !isOpenModalCreateProgramType}))}
            />
        </div>
    );
};
