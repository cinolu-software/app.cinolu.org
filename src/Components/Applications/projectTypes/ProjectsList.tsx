import React from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProjectTypes} from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import AddWithModalButton from "@/CommonComponent/AddWithModalButton";

export const ProjectTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProjectType } = useAppSelector((state) => state.projectType);

    return (
        <div>
            <AddWithModalButton
                buttonText="Ajouter un Type de Programme"
                onClick={() => dispatch(setModalCreateProjectTypes({ isOpen : !isOpenModalCreateProjectType}))}
            />
        </div>
    );
};

export default ProjectTypesHeader;
