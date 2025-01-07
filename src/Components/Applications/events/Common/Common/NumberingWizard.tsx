import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import {createEvent, handleNextButton, handleBackButton, setCreateFomValue, updateEvent, resetFormValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import { Flip, toast } from "react-toastify";
import { Back } from "@/Constant";
import StepOne from "@/Components/Applications/events/Common/Common/StepOne";
import StepTwo from "@/Components/Applications/events/Common/Common/StepTwo";
import StepThree from "@/Components/Applications/events/Common/Common/StepThree";
import StepFour from "@/Components/Applications/events/Common/Common/StepFour";
import FinishForm from "@/CommonComponent/FinishForm";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import StepperHorizontal from "@/Components/Applications/events/Common/Common/StepperHorizontal";
import {CreateEvent} from "@/Types/Events";
import { titleAddEvent } from "@/Constant";

const NumberingWizardEvent = ({ mode = "add", initialValues } : { mode: "add" | "edit"; initialValues?: any }) => {

    const {numberLevel, CreateFormValue, showFinish, selectedEvent} = useAppSelector(state=>state.event);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (mode === "edit" && initialValues) {
            const transformedInitialValues = {
                ...initialValues,
                types: Array.isArray(initialValues.types)
                    ? initialValues.types.map((type: { id?: string }) => type?.id).filter(Boolean)
                    : [],
            };

            Object.keys(transformedInitialValues).forEach((key) => {
                const typedKey = key as keyof CreateEvent;
                dispatch(setCreateFomValue({ field: typedKey, value: transformedInitialValues[typedKey] }));
            });
        }else if(mode === "add"){
            dispatch(resetFormValue());
        }
    }, [mode, initialValues, dispatch]);

    const handleSubmit = () => {
        try {
            const filteredFormValue = {
                name: CreateFormValue.name,
                description: CreateFormValue.description,
                started_at: CreateFormValue.started_at,
                ended_at: CreateFormValue.ended_at,
                types: CreateFormValue.types?.filter(Boolean),
                responsible: CreateFormValue.responsible,
                location: CreateFormValue.location,
                online_link: CreateFormValue.online_link,
                attendees: CreateFormValue.attendees,
                event_type: CreateFormValue.event_type,
            };

            if (mode === "add") {
                dispatch(createEvent(filteredFormValue as CreateEvent));
                toast.success("Evénement créé avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                dispatch(updateEvent({ eventId: initialValues?.id!, updatedEvent: filteredFormValue }));
                toast.success("Evénement modifié avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            router.push("/events");
        } catch (error) {
            toast.error("Une erreur est survenue", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1: return <StepOne createFormValue={CreateFormValue}/>;
            case 2: return <StepTwo createFormValue={CreateFormValue}/>;
            case 3: return <StepThree createFormValue={CreateFormValue} />;
            case 4: return <StepFour createFormValue={CreateFormValue} />;
            case 5:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleSubmit}
                            textButton={mode === "add" ? "Créer l'événement" : "Modifier l'événement"}
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <Col>
            <Card className="height-equal">
                <CommonCardHeader title={titleAddEvent} />
                <CardBody className="basic-wizard important-validation mt-2">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform">{renderStep()}</div>
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
