import React, { useEffect } from "react";
import { Button, CardBody, Form } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import {createEvent, handleNextButton, handleBackButton, setCreateFomValue, updateEvent, resetFormValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import { toast } from "react-toastify";
import StepOne from "@/Components/Applications/evenement/list/Common/Common/StepOne";
import StepTwo from "@/Components/Applications/evenement/list/Common/Common/StepTwo";
import StepThree from "@/Components/Applications/evenement/list/Common/Common/StepThree";
import StepFour from "@/Components/Applications/evenement/list/Common/Common/StepFour";
import StepFive from "@/Components/Applications/evenement/list/Common/Common/StepFive";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/evenement/list/Common/Common/StepperHorizontal";
import {CreateEvent} from "@/Types/Events";
import {createEventSuccessMessage, updateEventSuccessMessage, errorEventMessage, buttonFinish, buttonNext, buttonPrevious, btncreateEvent, btnModifyEvent} from "@/Constant";

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
                program: CreateFormValue.program,
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
                toast.success(createEventSuccessMessage, {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                dispatch(updateEvent({ eventId: initialValues?.id!, updatedEvent: filteredFormValue }));
                toast.success(updateEventSuccessMessage, {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            router.push("/events");
        } catch (error) {
            toast.error(errorEventMessage, {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1: return <StepOne createFormValue={CreateFormValue}/>;
            case 2: return <StepFive createFormValue={CreateFormValue}/>;
            case 3: return <StepTwo createFormValue={CreateFormValue}/>;
            case 4: return <StepThree createFormValue={CreateFormValue} />;
            case 5: return <StepFour createFormValue={CreateFormValue} />;

            case 6:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleSubmit}
                            textButton={mode === "add" ? btncreateEvent : btnModifyEvent}
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <div className = {'mt-2'}>
            <div className={'height-equal'}>
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
                                {buttonPrevious}
                            </Button>
                        )}
                        <Button
                            disabled={!!showFinish}
                            color="primary"
                            onClick={() => dispatch(handleNextButton())}
                        >
                            {showFinish ? buttonFinish : buttonNext}
                        </Button>
                    </div>
                </CardBody>
            </div>
        </div>
    );
};

export default NumberingWizardEvent;
