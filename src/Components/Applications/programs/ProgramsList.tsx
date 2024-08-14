import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgram, setFilterToggle } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Filter } from "react-feather";

export const ProgramsHeader = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgram, filterToggle } = useAppSelector((state) => state.programs);

    return (
        <div>
            <div className={'light-box'} onClick={()=>dispatch(setFilterToggle())}>
                <a>
                    <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
                    <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
                </a>
            </div>
            <Button
                className="btn btn-primary"
                onClick={() => dispatch(setModalCreateProgram({ isOpen : !isOpenModalCreateProgram}))}
            >
                <i className="fa fa-plus" />
                Ajouter un programme
            </Button>
        </div>
    );
};
