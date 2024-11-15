import React, {ChangeEvent} from "react";
import {Button, Card, CardBody, Col, Form} from "reactstrap";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/Partners/AddPartner/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {Back} from '@/Constant';
import {createPartner, setFormValue, handleBackButton, handleNextButton} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import StepOne from "@/Components/Applications/Partners/AddPartner/NumberingWizard/StepOne";
import StepTwo from "@/Components/Applications/Partners/AddPartner/NumberingWizard/StepTwo";
import StepThree from "@/Components/Applications/Partners/AddPartner/NumberingWizard/StepThree";
import {Flip, toast} from "react-toastify";

const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish} = useAppSelector(state => state.partner);
    const dispatch = useAppDispatch();

    const getPartnerData = (event: ChangeEvent<HTMLInputElement> | string) => {
        if(typeof event === 'string') {

        }
    }

    const handleCreatePartner = () => {

        try {
            dispatch(createPartner(formValue));
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
            case 1: return <StepOne/>
            case 2: return <StepTwo/>
            case 3: return <StepThree/>
            case 4: return (
                <Form className="stepper-four g-3 needs-validation" noValidate>
                    <FinishForm
                        isComplete={true}
                        onCreateProgram={handleCreatePartner}
                        textButton='Créer le partenaire'
                    />
                </Form>
            );
            default: return null;
        }

    }

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

}

export default NumberingWizard