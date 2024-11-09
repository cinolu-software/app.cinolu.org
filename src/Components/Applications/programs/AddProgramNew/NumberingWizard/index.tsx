import {ChangeEvent} from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import FinishForm from "@/Components/Applications/programs/AddProgramNew/Common/FinishForm";
import StepperHorizontal from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Back } from "@/Constant"
import {handleBackButton, handleNextButton, setNewFormValue} from "@/Redux/Reducers/programsSlice/programsSlice";
import StepOne from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepOne";
import StepTwo from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepTwo";
import StepThree from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepThree";
import StepFour from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFour";
import StepFive from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFive";
import StepSix from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepSix";
import {FormValueType} from "@/Types/Programs/ProgramsType";


const NumberingWizard = () => {

    const { numberLevel, formValue, showFinish } = useAppSelector(state => state.programs);
    const dispatch = useAppDispatch();

    const getUserData = (event: ChangeEvent<HTMLInputElement> | string) => {
        if (typeof event === "string") {
            dispatch(setNewFormValue({ field: "description", value: event }));
        } else {
            const { name, value, type, checked, files } = event.target;

            let newValue: any;

            switch (type) {
                case "checkbox":
                    newValue = checked;
                    break;
                case "file":
                    newValue = files ? files[0].name : "";
                    break;

                default:
                    newValue = value;
                    break;
            }

            dispatch(setNewFormValue({ field: name as keyof FormValueType, value: newValue }));
        }
    };

    const renderStep = () => {

        switch (numberLevel) {

            case 1: return <StepOne formValue={formValue} getUserData={getUserData} />;
            case 2: return <StepTwo formValue={formValue} getUserData={getUserData} />;
            case 3: return <StepThree  formValue={formValue} getUserData={getUserData}/>;
            case 4: return <StepFour formValue={formValue} getUserData={getUserData} />;
            case 5: return <StepFive />;
            case 6: return <StepSix />;

            case 7: return (
                <Form className="stepper-four g-3 needs-validation" noValidate>
                    <FinishForm />
                </Form>
            );

            default: return null;
        }
    };

    return (
        <Col>
            <Card className="height-equal">
                <CommonCardHeader title="Ajout de Programme" />
                <CardBody className="basic-wizard important-validation">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform">
                        {renderStep()}
                    </div>
                    <div className="wizard-footer d-flex gap-2 justify-content-end mt-4 me-5">
                        {numberLevel > 1 && (
                            <Button
                                className="alert-light-primary"
                                color="transparent"
                                onClick={() => dispatch(handleBackButton())}
                            >
                                {Back}
                            </Button>
                        )}
                        <Button
                            disabled={!!showFinish}
                            color="primary"
                            onClick={() => dispatch(handleNextButton())}
                        >
                            {showFinish ? "Finish" : "Next"}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default NumberingWizard