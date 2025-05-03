import React, { ChangeEvent } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import {StepPropsType} from "@/Types/Projects/ProjectType";
import { setNewFormValue } from "@/Redux/Reducers/projectSlice/projectSlice";
import { useAppDispatch } from "@/Redux/Hooks";
import { activityAudience, activityDescription, activityName, activityPrise, activityTown, activityObjectif} from "@/Constant";
import {Dropzone, ExtFile, FileMosaic} from "@dropzone-ui/react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';





const StepOne: React.FC<StepPropsType> = ({ data }) => {

    const { name, description, targeted_audience, aim, prize, town } = data;

    const dispatch = useAppDispatch();

    const handleChange = (field: keyof typeof data) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setNewFormValue({ field, value: event.target.value }));
    };

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2 mx-5">
                <Label>Description de l'activité</Label>
                <ReactQuill
                    value={description}
                    theme={'snow'}
                    placeholder="Écrivez votre article ici..."
                />
            </Row>
        </Form>
    );
};

export default StepOne;
