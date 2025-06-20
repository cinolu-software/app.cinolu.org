import { Congratulations, ImagePath } from "@/Constant";
import { Col, Row, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createActivityType } from "@/Types/ActivitiesTypes";
import {createActivity, resetForm} from "@/Redux/Reducers/ActivitySlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FinishForm = () => {

    const dispatch = useAppDispatch();
    const { addFormValue } = useAppSelector(state => state.activity);
    const router = useRouter();

    const handleSubmit = () => {
        const projectData: createActivityType = {
            name: addFormValue.name,
            description: addFormValue.description,
            form_link: addFormValue?.form_link ,
            started_at: addFormValue.started_at,
            ended_at: addFormValue.ended_at,
            program: addFormValue.program,
            categories: addFormValue.categories,
        };

        try{
            dispatch(createActivity(projectData));
            dispatch(resetForm);
            toast.success("L'activité a été créée avec succès", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/act/list");
        }
        catch (e) {
            toast.error("Une erreur est survenue lors de la création de l'activité", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/act/list");
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
                <Col
                xs="12" md="6" lg="4" className="text-center">
                    <Button onClick={handleSubmit} color={'primary'}>Créer le projet</Button>
                </Col>
            </Row>
        </div>
    );
};

export default FinishForm;