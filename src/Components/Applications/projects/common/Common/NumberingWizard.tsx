import React, { useEffect } from "react";
import { Button, Card, CardBody, Form } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";
import {createProgram, updateProgram, handleBackButton, handleNextButton, setNewFormValue, resetFormValue} from "@/Redux/Reducers/projectSlice/projectSlice";
import { Flip, toast } from "react-toastify";
import { Back } from "@/Constant";
import StepOne from "@/Components/Applications/programs/common/Common/StepOne";
import StepTwo from "@/Components/Applications/programs/common/Common/StepTwo";
import StepThree from "@/Components/Applications/programs/common/Common/StepThree";
import StepFour from "@/Components/Applications/programs/common/Common/StepFour";
import StepFive from "@/Components/Applications/programs/common/Common/StepFive";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/programs/common/Common/StepperHorizontal";
import { FormValueType } from "@/Types/Project/ProgramsType";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {titleAddProgram} from "@/Constant";

const NumberingWizard = ({ mode = "add", initialValues } : { mode: "add" | "edit"; initialValues?: any; }) => {

    const { numberLevel, formValue, showFinish } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (mode === "edit" && initialValues) {
            const transformedInitialValues = {
                ...initialValues,
                types: Array.isArray(initialValues.types)
                    ? initialValues.types.map((type: { id?: string }) => type?.id).filter(Boolean)
                    : [],
                categories: Array.isArray(initialValues.categories)
                    ? initialValues.categories.map((category: { id?: string }) => category?.id).filter(Boolean)
                    : [],
                partners: Array.isArray(initialValues.partners)
                    ? initialValues.partners.map((partner: { id?: string }) => partner?.id).filter(Boolean)
                    : [],
            };
            Object.keys(transformedInitialValues).forEach((key) => {
                const typedKey = key as keyof FormValueType;
                dispatch(setNewFormValue({ field: typedKey, value: transformedInitialValues[typedKey] }));
            });
        }else if (mode === "add") {
            dispatch(resetFormValue());
            router.refresh();
        }
    }, [mode, initialValues, dispatch, router]);

    const handleSubmit = () => {
        try {
            const filteredFormValue = {
                name: formValue.name,
                description: formValue.description,
                started_at: formValue.started_at,
                ended_at: formValue.ended_at,
                targeted_audience: formValue.targeted_audience,
                aim: formValue.aim,
                prize: formValue.prize,
                town: formValue.town,
                types: formValue.types?.filter(Boolean),
                categories: formValue.categories?.filter(Boolean),
                partners: formValue.partners,
            };
            if (mode === "add") {
                dispatch(createProgram(filteredFormValue));
                toast.success("Programme créé avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                dispatch(updateProgram({ programId: initialValues?.id!, updatedProgram: filteredFormValue }));
                toast.success("Programme modifié avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            router.push("/programs");
        } catch (error) {
            toast.error("Une erreur est survenue", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    const renderStep = () => {
        switch (numberLevel) {
            case 1:
                return <StepOne data={formValue} />;
            case 2:
                return <StepTwo data={formValue} />;
            case 3:
                return <StepThree data={formValue} />;
            case 4:
                return <StepFour data={formValue} />;
            case 5:
                return <StepFive data={formValue }  />;
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
            <Card>
                <div className={'mt-5'}>
                    <div className="height-equal">
                        <CommonCardHeader title={titleAddProgram}/>
                        <CardBody className="basic-wizard important-validation">
                            <StepperHorizontal level={numberLevel}/>
                            <div id="msform">{renderStep()}</div>
                            <div className="wizard-footer d-flex gap-2 justify-content-end mt-4 me-5 mb-4">
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
            </Card>
    );

};

export default NumberingWizard;
