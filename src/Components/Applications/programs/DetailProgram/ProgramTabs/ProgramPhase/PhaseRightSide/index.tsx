import {Col} from "reactstrap";
import React from "react";
import {PhaseRightSideProps} from "@/Types/Programs/PhasesType";

const PhaseRightSide : React.FC<PhaseRightSideProps> = ({navId}) => {

    return(
        <Col xxl={'9'} xl={'8'} className={'box-col-12'}>
            <div className={'email-right-aside'}>
                <div className={`email-body email-list`}>

                </div>
            </div>
        </Col>
    )
}

export default PhaseRightSide;