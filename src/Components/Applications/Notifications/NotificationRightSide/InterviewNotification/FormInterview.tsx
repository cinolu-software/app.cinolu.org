import React from 'react';
import SimpleMdeReact from "react-simplemde-editor";
import {Input, Label, Row, Col, Button} from "reactstrap";
import SVG from "@/CommonComponent/SVG";

interface FormInterviewProps{
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMessageChange: (value: string) => void;
    saveToRedux: () => void;
}

const FormInterview: React.FC<FormInterviewProps> = ({ onTitleChange, onMessageChange, saveToRedux }) => {


    return (
        <div className="user-body card-wrapper border rounded-3 me-4 mb-4">
            <Row>
                <Col md='12'>
                    <Label>Le titre de la notification</Label>
                    <Input className='form-control mb-4' onChange={onTitleChange} />
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <Label>Message</Label>
                    <SimpleMdeReact
                        onChange={onMessageChange}
                    />
                </Col>

                <Col md={'6'} >
                    <Button color="primary" className="btn-square" onClick={saveToRedux}>
                        <div className="d-flex align-items-center gap-sm-2 gap-1">
                            {"Sauvegarder la notification"}
                            <SVG iconId="send-icon" />
                        </div>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default FormInterview;


