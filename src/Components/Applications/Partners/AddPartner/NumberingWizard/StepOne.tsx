import React, {useMemo, ChangeEvent} from 'react'
import {Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, Row} from 'reactstrap';

const StepOne = () => {

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
                    // value={}
                    // onChange={}
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
                    rows={5}
                    // value={}
                    // onChange={}
                />
            </div>
        </Col>
    )
}
export default StepOne
