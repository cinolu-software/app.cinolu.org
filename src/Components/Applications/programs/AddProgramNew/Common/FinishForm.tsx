import { Congratulations, ImagePath } from "@/Constant";
import { Col, Form, Row, Button } from "reactstrap";
import React from "react";

interface FinishFormProps {
    isComplete: boolean;
    onCreateProgram: () => void;
}

const FinishForm: React.FC<FinishFormProps> = ({ isComplete, onCreateProgram }) => {
    return (
        <Row>
            <Col xs="12" className="m-0">
                <div className="successful-form">
                    <img className="img-fluid" src={`${ImagePath}/gif/dashboard-8/successful.gif`} alt="successful" />
                    <h6>{Congratulations}</h6>
                    <p>Well done! You have successfully completed.</p>
                    {isComplete && (
                        <Button color="primary" onClick={onCreateProgram} className="mt-3">
                            Créer le Programme
                        </Button>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default FinishForm;
