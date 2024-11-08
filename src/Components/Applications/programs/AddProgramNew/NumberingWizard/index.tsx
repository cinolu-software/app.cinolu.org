import {ChangeEvent} from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import FinishForm from "@/Components/Applications/programs/AddProgramNew/Common/FinishForm";
import StepperHorizontal from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Back } from "@/Constant"
import {handleBackButton, handleNextButton, setF} from "@/Redux/Reducers/programsSlice/programsSlice";
import StepOne from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepOne";
import StepTwo from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepTwo";
import StepThree from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepThree";
import StepFour from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFour";
import StepFive from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFive";
import StepSix from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepSix";


const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish} = useAppSelector(state=>state.programs);
    const dispatch = useAppDispatch();

    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = name === "agreeTerms" || name === "informationCheckBox" || (name === "agreeConditions") ? event.target.checked : (name === "uploadDocumentation") ? event.target.files && event.target.files[0].name : event.target.value;
        dispatch(setBasicInputFormValue({ ...formValue, [name]: value }));
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1: return <StepOne />;
            case 2: return <StepTwo />;
            case 3: return <StepThree />;
            case 4: return <StepFour />;
            case 5: return <StepFive />;
            case 6: return <StepSix />;
            case 7: return <Form className="stepper-four g-3 needs-validation" noValidate><FinishForm /></Form>
            default: return null;
        }
    };

    return (
        <Col >
            <Card className="height-equal">
                <CommonCardHeader title={'Ajout de Programme'} />
                <CardBody className="basic-wizard important-validation">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform">
                        {renderStep()}
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