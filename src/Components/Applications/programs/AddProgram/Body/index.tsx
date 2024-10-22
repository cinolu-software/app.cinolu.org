import React from "react";
import { Row } from "reactstrap";
import ProgramLeftSidebar from "./ProgramLeftSidebar";
import ProgramTabContent from "./ProgramTabContent";


const ProgramBody: React.FC = () => {

    return (
        <Row className="g-xl-5 g-3">
            <ProgramLeftSidebar />
            <ProgramTabContent />
        </Row>
    );
};

export default ProgramBody;