import { Congratulations, ImagePath } from "@/Constant";
import { Col, Row, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

import {createEvenement} from "@/Redux/Reducers/evenement";
import {formValueType} from "@/Types/evenement";

import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FinishForm = () => {

    const dispatch = useAppDispatch();
    const { addFormValue } = useAppSelector(state => state.evenement);
    const router = useRouter();

    const handleSubmit = () => {

        const EvenementData : formValueType = {
            name: addFormValue.name,
            description: addFormValue.description,
            link : addFormValue.link,
            responsible: addFormValue.responsible,
            location: addFormValue.location,
            started_at: addFormValue.started_at,
            ended_at: addFormValue.ended_at,
            program: addFormValue.program,
            categories: addFormValue.categories,
        };

        try{
            dispatch(createEvenement(EvenementData));
            toast.success("L'évènement a été créé avec succès", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/events");
        }
        catch (e) {
            toast.error("Une erreur est survenue lors de la création de l'évènement", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/events");
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
                    <Button onClick={handleSubmit} color={'primary'}>Créer l'évènement</Button>
                </Col>
            </Row>
        </div>
    );
};

export default FinishForm;