import React from 'react'
import {Col, Input, Label} from "reactstrap";

const StepTwo = () => {
    return (
        <Col xs="12">

            <div >
                <Label for="programName" check>
                    Web site Link <span className="txt-danger">*</span>
                </Label>
                <Input
                    className="m-0"
                    id="programName"
                    type="text"
                    // value={}
                    // onChange={}
                    required
                />
            </div>
        </Col>
    )
}
export default StepTwo
