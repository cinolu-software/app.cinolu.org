import React, {useEffect} from "react";
import {Badge, Col, Row, TabPane} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchApplicationByproject } from "@/Redux/Reducers/projectSlice/ProjectApplicationSlice";


const PhaseApplications: React.FC<{ navId: string }> = ({ navId }) => {

    const {selectedProject} = useAppSelector(state => state.project);
    const { status, ApplicationPhaseData } = useAppSelector(state => state.PhaseApplication);
    const dispatch = useAppDispatch();

    useEffect(
        ()=>{
            dispatch(fetchApplicationByproject(selectedProject?.id))
            console.log("OK");
        }, 
        [selectedProject]
    );

    console.log(ApplicationPhaseData)

    return (
        <TabPane tabId="audience-tab">
            <div className="mb-4 bg-white mt-5 ps-5">
                <h5 className="mb-3">Participants</h5>
            </div>
        </TabPane>
    )
}

export default PhaseApplications;