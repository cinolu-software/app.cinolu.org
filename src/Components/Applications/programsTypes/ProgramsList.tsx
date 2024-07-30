import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgram } from "@/Redux/Reducers/programsSlice/programsSlice";

export const ProgramsTypesHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgram } = useAppSelector((state) => state.programs);


    return (
        <div>
            <Button className="btn btn-primary" onClick={() => dispatch(setModalCreateProgram({ isOpen : !isOpenModalCreateProgram}))}>
                <i className="fa fa-plus" />
                Ajouter un Type de Programme
            </Button>
        </div>
    );

};
