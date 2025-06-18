import { Congratulations, ImagePath } from "@/Constant";
import { Col, Row, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createActivityType } from "@/Types/ActivitiesTypes";
import {updateActivity, resetForm} from "@/Redux/Reducers/ActivitySlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const FinishForm = () => {

    const dispatch = useAppDispatch();
    const { editFormValue, selectedActivity } = useAppSelector(state => state.activity); 
    const router = useRouter();

    const handleSubmit = () => {
        
        const projectData: createActivityType = {
            name: editFormValue.name,
            description: editFormValue.description,
            form_link: editFormValue.form_link,
            started_at: editFormValue.started_at,
            ended_at: editFormValue.ended_at,
            program: editFormValue.program,
            categories: editFormValue.categories || [],
            partners: editFormValue.partners || [],
        };
        
        try {
            if(selectedActivity){
                dispatch(updateActivity({activityId: selectedActivity?.id, updatedActivity: projectData }));
                dispatch(resetForm());
            }
            toast.success("L'activité mise à jour avec succès", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER
            });
            router.push("/act/list");
        }
        catch (e) {
            toast.error("Une erreur est survenue lors de la mise à jour de l'activité", {
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
                <Col xs={3} md={3}>
                    <Button onClick={handleSubmit} color={'primary'} outline>{"Mettre à  jour l'activité"}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default FinishForm;