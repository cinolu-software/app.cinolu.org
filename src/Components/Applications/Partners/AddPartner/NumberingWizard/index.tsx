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
import {useRouter} from "next/navigation";


const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish} = useAppSelector(state => state.partner);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const getPartnerData = (event: any) => {
        const { name, value, type, checked } = event.target;
        dispatch(
            setFormValue({
                field: name,
                value: type === "checkbox" ? checked : value,
            })
        );
    };


    const handleCreatePartner = () => {
        try {
            dispatch(createPartner(formValue));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Partenaire créé avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            router.push('/partners')

        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du partenaire"}</p>,
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
            case 1:
                return <StepOne formValue={formValue} getPartnerData={getPartnerData} />;
            case 2:
                return <StepTwo formValue={formValue} getPartnerData={getPartnerData} />;
            case 3:
                return <StepThree formValue={formValue} getPartnerData={getPartnerData} />;
            case 4:
                return (
                    <Form className="stepper-four g-3 needs-validation" noValidate>
                        <FinishForm
                            isComplete={true}
                            onCreateProgram={handleCreatePartner}
                            textButton="Créer le partenaire"
                        />
                    </Form>
                );
            default:
                return null;
        }
    };

    console.log("====>", formValue)


    return (
        <Col>
            <Card className="height-equal">
                <CommonCardHeader title="Ajout du partenaire" />
                <CardBody className="basic-wizard important-validation">
                    <StepperHorizontal level={numberLevel} />
                    <div id="msform" className={'mx-5'}>
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