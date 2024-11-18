import React, {useMemo, ChangeEvent} from 'react'
import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, Row} from 'reactstrap';
import {StepProps} from "@/Types/PartnerType/PartnerType";
import {setFormValue} from "@/Redux/Reducers/PartnersSlice/partnerSlice";


const StepOne: React.FC<StepProps> = ({formValue, getPartnerData}) => {

    const {name, description} = formValue

    return (
        <Col xs="12">
            <div >
                <Label for="programName" check>
                    Nom du partenaire <span className="txt-danger">*</span>
                </Label>
                <Input
                    className="m-0"
                    id="programName"
                    type="text"
                    name="name"
                    value={name}
                    onChange={getPartnerData}
                    required
                />
            </div>

            <div>
                <Label for="programDescription" className="mt-2" check>
                    Description du partenaire
                </Label>
                <textarea
                    id="programDescription"
                    className="form-control"
                    name="description"
                    rows={5}
                    value={description}
                    onChange={getPartnerData}
                />
            </div>
        </Col>
    )
}
export default StepOne
