import React from "react";
import {Badge, Col, Row, TabPane} from "reactstrap";


const PhaseApplications: React.FC<{ navId: string }> = ({ navId }) => {

    return (
        <TabPane tabId="audience-tab">
            <div className="mb-4 bg-white mt-5 ps-5">
                <h5 className="mb-3">Participants</h5>
            </div>
        </TabPane>
    )
}

export default PhaseApplications;