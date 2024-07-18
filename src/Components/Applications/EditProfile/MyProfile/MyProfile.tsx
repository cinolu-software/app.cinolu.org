import { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import { MyProfiles } from "@/Constant";
import { UserFormHead } from "./UserFormHead";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { selectAuth, updateProfile, selectError, selectStatus } from "@/Redux/Reducers/AuthSlice";
import { UpdateProfilePayload } from "@/Types/AuthType";
import { AppDispatch } from "@/Redux/Store";

const MyProfile = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector(selectAuth);
    const statusUpdate = useSelector(selectStatus);
    const updateError = useSelector(selectError);
    const [isToast, setIsToast] = useState(true);

    useEffect(() => {
        if (statusUpdate === "succeeded" && !isToast) {
            toast.success(
                <p className="text-white tx-16 mb-0">{"Mise à jour effectuée avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } else if (statusUpdate === "failed" && !isToast) {
            toast.error(
                <p className="text-white tx-16 mb-0">{updateError}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    }, [statusUpdate, updateError, isToast]);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData.entries()) as unknown as UpdateProfilePayload;
        await dispatch(updateProfile(payload)).unwrap();

        setIsToast(false)
    };

    return (
        <Col xl="4">
            <Card>
                <CommonCardHeader title={MyProfiles} />
                <CardBody>
                    <Form onSubmit={handleProfileUpdate}>
                        <UserFormHead />
                        <CommonUserFormGroup type="text" title="Nom" placeholder="Nom" defaultValue={user?.name} name="name" />
                        <CommonUserFormGroup type="text" title="Post-nom" placeholder="Post-nom" defaultValue={user?.first_name} name="first_name" />
                        <CommonUserFormGroup type="text" title="Prénom" placeholder="Prénom" defaultValue={user?.last_name} name="last_name" />
                        <CommonUserFormGroup type="email" title="Adresse Email" placeholder="Adresse e-mail" defaultValue={user?.email} name="email" />
                        <CommonUserFormGroup type="text" title="Numéro de Téléphone" placeholder="Numéro de téléphone" defaultValue={user?.phone_number} name="phone_number" />
                        <CommonUserFormGroup type="text" title="Adresse" placeholder="Adresse physique" defaultValue={user?.address} name="address" />
                        <div className="form-footer"><Button block color="primary">{"Enregistrer"}</Button></div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default MyProfile;



