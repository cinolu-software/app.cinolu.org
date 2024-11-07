import {ChangeEvent} from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import BasicInfoForm from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/BasicInfoForm";
import CartInfoForm from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/CartInfoForm";
import FeedbackForm from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/FeedbackForm";
import FinishForm from "@/Components/Applications/programs/AddProgramNew/Common/FinishForm";
import StepperHorizontal from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {NumberWizardData} from "@/Data/Application/Programs";
import { Back, NumberingWizardHeading } from "@/Constant"
import {handleBackButton, handleNextButton, setBasicInputFormValue} from "@/Redux/Reducers/programsSlice/programsSlice";

const NumberingWizard = () => {

    const {numberLevel, basicInputFormValue, showFinish} = useAppSelector(state=>state.programs);
    const dispatch = useAppDispatch()

    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = name === "agreeTerms" || name === "informationCheckBox" || (name === "agreeConditions") ? event.target.checked : (name === "uploadDocumentation") ? event.target.files && event.target.files[0].name : event.target.value;
        dispatch(setBasicInputFormValue({ ...basicInputFormValue, [name]: value }));
    };

    return (
        <Col >
            <Card className="height-equal">
                <CommonCardHeader title={NumberingWizardHeading} span={NumberWizardData} />
                <CardBody className="basic-wizard important-validation">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform">
                        {numberLevel === 1 && <BasicInfoForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
                        {numberLevel === 2 && <CartInfoForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
                        {numberLevel === 3 && <FeedbackForm getUserData={getUserData} basicInputFormValue={basicInputFormValue} />}
                        {numberLevel === 4 && <Form className="stepper-four g-3 needs-validation" noValidate><FinishForm /></Form>}
                    </div>
                    <div className="wizard-footer d-flex gap-2 justify-content-end">
                        {numberLevel > 1 && (
                            <Button className="alert-light-primary" color="transparent" onClick={()=> dispatch(handleBackButton())}>{Back}</Button>
                        )}
                        <Button disabled={!!showFinish} color="primary" onClick={()=> dispatch(handleNextButton())}>{showFinish ? "Finish" : "Next"}</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );

}

export default NumberingWizard