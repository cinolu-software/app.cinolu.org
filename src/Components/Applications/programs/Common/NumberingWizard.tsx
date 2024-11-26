import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import {createProgram, updateProgram, handleBackButton, handleNextButton, setNewFormValue,} from "@/Redux/Reducers/programsSlice/programsSlice";
import { Flip, toast } from "react-toastify";
import { Back } from "@/Constant";
import StepOne from "@/Components/Applications/programs/Common/StepOne";
import StepTwo from "@/Components/Applications/programs/Common/StepTwo";
import StepThree from "@/Components/Applications/programs/Common/StepThree";
import StepFour from "@/Components/Applications/programs/Common/StepFour";
import StepFive from "@/Components/Applications/programs/Common/StepFive";
import FinishForm from "@/CommonComponent/FinishForm";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import StepperHorizontal from "@/Components/Applications/programs/Common/StepperHorizontal";
import { FormValueType } from "@/Types/Programs/ProgramsType";

const NumberingWizard = ({ mode = "add", initialValues } : { mode: "add" | "edit"; initialValues?: any }) => {

    const { numberLevel, formValue, showFinish } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (mode === "edit" && initialValues) {
            Object.keys(initialValues).forEach((key) => {
                const typedKey = key as keyof FormValueType;
                dispatch(setNewFormValue({ field: typedKey, value: initialValues[typedKey] }));
            });
        }
    }, [mode, initialValues, dispatch]);

    const handleSubmit = () => {
        try {
            if (mode === "add") {
                dispatch(createProgram(formValue));
                toast.success("Programme créé avec succès", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
            } else {
                dispatch(updateProgram({ programId: initialValues?.id!, updatedProgram: formValue }));
                toast.success("Programme modifié avec succès", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
            }
            router.push("/programs");
        } catch (error) {
            toast.error("Une erreur est survenue", { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
        }
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1:
                return <StepOne formValue={formValue} />;
            case 2:
                return <StepTwo formValue={formValue} />;
            case 3:
                return <StepThree formValue={formValue} />;
            case 4:
                return <StepFour formValue={formValue} />;
            case 5:
                return <StepFive formValue={formValue} />;
            case 6:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleSubmit}
                            textButton={mode === "add" ? "Créer le programme" : "Modifier le programme"}
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <div className={'mt-5'}>
            <div className="height-equal">
                {/*<CommonCardHeader title={mode === "add" ? "Ajout du programme" : "Modification du programme"} />*/}
                <CardBody className="basic-wizard important-validation">
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
            </div>
        </div>
    );
};

export default NumberingWizard;
