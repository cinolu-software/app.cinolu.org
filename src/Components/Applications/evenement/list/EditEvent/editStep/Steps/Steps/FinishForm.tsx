import { Congratulations, ImagePath } from "@/Constant";
import { Col, Row, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

import {resetForm, updateEvenement} from "@/Redux/Reducers/evenement";
import {formValueType} from "@/Types/evenement";

import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FinishForm = () => {

    const dispatch = useAppDispatch();
    const { editFormValue, selectedEvenement } = useAppSelector(state => state.evenement);
    const router = useRouter();

    const handleSubmit = () => {

        const EvenementData : formValueType = {
            name: editFormValue.name,
            description: editFormValue.description,
            link : editFormValue.link,
            responsible: editFormValue.responsible,
            place: editFormValue.place,
            started_at: editFormValue.started_at,
            ended_at: editFormValue.ended_at,
            program: editFormValue.program,
            categories: editFormValue.categories,
        };

        try{

            if(selectedEvenement){
                dispatch(updateEvenement({evenementId: selectedEvenement.id, updatedEvenement: EvenementData}));
                dispatch(resetForm());
                toast.success("L'évènement a été modifié avec succès", {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER
                });
            }
            router.push("/evenement/list");
        }
        catch (e) {
            toast.error("Une erreur est survenue lors de la création de l'évènement", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/evenement/list");
        }
    };

    return (
        <div>
            <Row>
                <Col xs="12" className="m-0">
                    <div className="successful-form">
                        <img className="img-fluid" src={`${ImagePath}/gif/dashboard-8/successful.gif`} alt="successful" />
                        <h6>{Congratulations}</h6>
                        <p>Well done! You have successfully completed</p>
                    </div>
                </Col>
            </Row>
            <Row className={'justify-content-center mt-3'}>
                <Col xs={2} md={2}>
                    <Button onClick={handleSubmit} color={'primary'}>{"Mettre à jour l'événement"}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default FinishForm;