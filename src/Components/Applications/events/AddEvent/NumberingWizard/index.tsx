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
import {Event} from "@/Types/Events";
import {Flip, toast} from "react-toastify";
import {useRouter} from "next/navigation";

const NumberingWizardEvent = () => {

    const {numberLevel, CreateFormValue, showFinish} = useAppSelector(state=>state.event);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const handleCreateProgram = () => {
        try {
            dispatch(createEvent(CreateFormValue));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Evénement créé avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            router.push('/events')
        }
        catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de l'événement"}</p>,
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
            case 1: return <StepOne createFormValue={CreateFormValue}/>;
            case 2: return <StepTwo createFormValue={CreateFormValue}/>;
            case 3: return <StepThree createFormValue={CreateFormValue} />;
            case 6: return (
                <Form className="stepper-four g-3 needs-validation" noValidate>
                    <FinishForm isComplete={true} onCreateProgram={handleCreateProgram} textButton="Créer l'événement"/>
                </Form>
            );
            default: return null;
        }
    };

    return (
        <Col>
            <Card className="height-equal">
                <CommonCardHeader title="Ajout d'un événement" />
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

export default NumberingWizardEvent;
