import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgramTypes} from "@/Redux/Reducers/programsSlice/programsTypeSlice";

export const ProgramsTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgramType } = useAppSelector((state) => state.programsType);


    return (

        <div>
            <Button className="btn btn-primary" onClick={() => dispatch(setModalCreateProgramTypes({ isOpen : !isOpenModalCreateProgramType}))}>
                <i className="fa fa-plus" />
                Ajouter un Type de Programme
            </Button>
        </div>

    );
};
