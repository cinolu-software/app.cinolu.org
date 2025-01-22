import { TabPane, Button, Form, FormGroup, Input, Label, Row, Col, Spinner } from "reactstrap";
import React, { useState, useEffect } from "react";
import { updateProjectPhase } from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";
import {fetchProjectPhaseById} from "@/Redux/Reducers/projectSlice/ProjectPhaseSlice";

const PhaseSettings: React.FC<{ navId: string }> = ({ navId }) => {

    const dispatch = useAppDispatch();
    const { projectData } = useAppSelector((state) => state.project);
    const { statusPhase, selectedProjectPhase } = useAppSelector(state => state.projectPhase)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(statusPhase === 'idle' && projectData){
            dispatch(fetchProjectPhaseById(projectData.id))
        }
    }, [ statusPhase, projectData]);

    console.log('selectedProjectPhase ===>|', selectedProjectPhase)


    return (
        <TabPane tabId="setting-tab">
            <div className="p-3 my-5 bg-white pt-3 text-success">
                
            </div>
        </TabPane>
    );
};

export default PhaseSettings;