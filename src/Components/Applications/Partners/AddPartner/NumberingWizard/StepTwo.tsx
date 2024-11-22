import React, {ChangeEvent} from 'react'
import {Col, Input, Label} from "reactstrap";
import {StepProps} from "@/Types/PartnerType/PartnerType";

const StepTwo: React.FC<StepProps> = ({formValue ,getPartnerData}) => {

    const {website_link} = formValue
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        const { name, value, type, checked } = event.target;
        getPartnerData({
            field: name,
            value: type === "checkbox" ? checked : value,
        });
    };

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
                    onChange={handleChange}
                    required
                />
            </div>
        </Col>
    )
}
export default StepTwo
