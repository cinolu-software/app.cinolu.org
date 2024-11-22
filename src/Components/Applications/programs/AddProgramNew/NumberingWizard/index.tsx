import React, {ChangeEvent} from "react";
import {Button, Card, CardBody, Col, Form} from "reactstrap";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {Back} from "@/Constant";
import {createProgram, handleBackButton, handleNextButton, setNewFormValue} from "@/Redux/Reducers/programsSlice/programsSlice";
import StepOne from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepOne";
import StepTwo from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepTwo";
import StepThree from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepThree";
import StepFour from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFour";
import StepFive from "@/Components/Applications/programs/AddProgramNew/NumberingWizard/StepFive";
import {FormValueType} from "@/Types/Programs/ProgramsType";
import {Flip, toast} from "react-toastify";
import {useRouter} from "next/navigation";

const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish,} = useAppSelector(state => state.programs);
    const dispatch = useAppDispatch();
    const router = useRouter()

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
            case 1: return <StepOne formValue={formValue} getUserData={getUserData} />;
            case 2: return <StepTwo formValue={formValue} getUserData={getUserData} />;
            case 3: return <StepThree formValue={formValue} getUserData={getUserData} />;
            case 4: return <StepFour formValue={formValue} getUserData={getUserData} />;
            case 5: return <StepFive formValue={formValue} getUserData={getUserData} />;
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
