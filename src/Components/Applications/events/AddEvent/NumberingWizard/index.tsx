import React, {ChangeEvent} from "react";
import {Button, Card, CardBody, Col, Form} from "reactstrap";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/events/AddEvent/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {Back} from "@/Constant";
import {createEvent, handleNextButton, handleBackButton, setCreateFomValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import StepOne from "@/Components/Applications/events/AddEvent/NumberingWizard/StepOne";
import StepTwo from "@/Components/Applications/events/AddEvent/NumberingWizard/StepTwo";
import StepThree from "@/Components/Applications/events/AddEvent/NumberingWizard/StepThree";
import StepFour from "@/Components/Applications/events/AddEvent/NumberingWizard/StepFour";
import StepFive from "@/Components/Applications/events/AddEvent/NumberingWizard/StepFive";

import {FormValueType} from "@/Types/Programs/ProgramsType";
import {Flip, toast} from "react-toastify";
import {useRouter} from "next/navigation";

const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish,} = useAppSelector(state => state.programs);
    const dispatch = useAppDispatch();
    const router = useRouter()


    const handleCreateProgram = () => {

        try {
            dispatch(createProgram(formValue));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Programme créé avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            router.push('/programs')
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du programme"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }

    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1: return <StepOne formValue={formValue}/>;
            case 2: return <StepTwo formValue={formValue}/>;
            case 3: return <StepThree formValue={formValue} />;
            case 4: return <StepFour formValue={formValue}/>;
            case 5: return <StepFive formValue={formValue} />;
            case 6: return (
                <Form className="stepper-four g-3 needs-validation" noValidate>
                    <FinishForm
                        isComplete={true}
                        onCreateProgram={handleCreateProgram}
                        textButton='Créer le Programme'
                    />
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

export default NumberingWizard;
