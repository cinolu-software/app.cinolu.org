import React from 'react'
import {Col, Input, Label} from "reactstrap";
import {StepProps} from "@/Types/PartnerType/PartnerType";

const StepTwo: React.FC<StepProps> = ({formValue ,getPartnerData}) => {

    const {website_link} = formValue

    return (
        <Col xs="12">

            <div >
                <Label for="programName" check>
                    Web site Link <span className="txt-danger">*</span>
                </Label>
                <Input
                    className="m-0"
                    id="websiteLink"
                    type="text"
                    name="website_link"
                    value={website_link}
                    onChange={getPartnerData}
                    required
                />
            </div>
        </Col>
    )
}
export default StepTwo
