import { Congratulations, ImagePath } from "@/Constant";
import { Col, Form, Row, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createActivityType } from "@/Types/ActivitiesTypes";

const FinishForm = () => {
    const dispatch = useAppDispatch();
    const { addFormValue } = useAppSelector(state => state.activity);

    const handleSubmit = () => {
        const projectData: createActivityType = {
            name: addFormValue.name,
            description: addFormValue.description,
            started_at: addFormValue.started_at, // Conserve le format string
            ended_at: addFormValue.ended_at, // Conserve le format string
            program: addFormValue.program,
            categories: addFormValue.categories,
            partners: addFormValue.partners,
            form: addFormValue.form || [], // Garantit un tableau même si null
            review_form: addFormValue.review_form || [] // Garantit un tableau même si null
        };

        console.log(projectData);

        // dispatch(createProject(projectData))
        //     .then(() => {
        //         // Gérer le succès
        //     })
        //     .catch((error) => {
        //         // Gérer les erreurs
        //     });
    };

    return (
        <div>
            <Row>
                <Col xs="12" className="m-0">
                    <div className="successful-form">
                        <img className="img-fluid" src={`${ImagePath}/gif/dashboard-8/successful.gif`} alt="successful" />
                        <h6>{Congratulations}</h6>
                        <p>Well done! You have successfully completed.</p>
                    </div>
                </Col>
                <Button onClick={handleSubmit}>Créer l'activité</Button>
            </Row>
        </div>
    );
};

export default FinishForm;