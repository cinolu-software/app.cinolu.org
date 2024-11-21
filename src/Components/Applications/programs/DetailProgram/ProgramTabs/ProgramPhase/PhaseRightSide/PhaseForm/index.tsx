import { useAppSelector } from "@/Redux/Hooks";
import { TabPane } from "reactstrap";
import React from "react";


const PhaseForm : React.FC<{ navId: string }> = ({navId}) => {

    const { programData } = useAppSelector((state) => state.programs);

    const phase = programData.phases.find((phase: {id: string}) => phase.id === navId);

    return (
        <TabPane tabId="form-tab" >
            <h1>Phase Form</h1>
        </TabPane>
    );
};

export default PhaseForm;