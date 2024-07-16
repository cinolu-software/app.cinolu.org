import { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import { MyProfiles, Save } from "@/Constant";
import { UserFormHead } from "./UserFormHead";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { selectAuth, selectErrorUpdateProfile, updateProfile, selectStatusUpdateProfile } from "@/Redux/Reducers/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { UpdateProfilePayload } from "@/Types/AuthType";

const MyProfile = () => {

    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    const [newName, setNewName] = useState(auth?.user?.name);
    const [newFirstName, setNewFirstName] = useState(auth?.user?.first_name);
    const [newLastName, setNewLastName] = useState(auth?.user?.last_name);
    const [newEmail, setNewEmail] = useState(auth?.user?.email);
    const [newPhoneNumber, setNewPhoneNumber] = useState(auth?.user?.phone_number);
    const [newAddress, setNewAddress] = useState(auth?.user?.address);

    const statusUpdate = useSelector(selectStatusUpdateProfile);
    const updateError = useSelector(selectErrorUpdateProfile);

    useEffect(() => {

        if (statusUpdate === 'succeeded') {
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
        }

        if (statusUpdate === 'failed') {
            toast.error(
                <p className="text-white tx-16 mb-0">{`${updateError}`}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }

    }, [statusUpdate, updateError]);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const payload: UpdateProfilePayload = {
            name: newName || '',
            first_name: newFirstName || '',
            last_name: newLastName || '',
            email: newEmail || '',
            phone_number: newPhoneNumber || '',
            address:  newAddress || '',
        };

        await dispatch(updateProfile(payload)).unwrap();
    };

    return (
        <Col xl="4">
            <Card>
                <CommonCardHeader title={MyProfiles} />
                <CardBody>
                    <Form onSubmit={handleProfileUpdate}>
                        <UserFormHead />
                        <CommonUserFormGroup type="text" title="Nom" placeholder="nom" defaultValue={`${auth?.user?.name}`} onChange={(e) => setNewName(e.target.value)} />
                        <CommonUserFormGroup type="text" title="Post-nom" placeholder="post-nom" defaultValue={`${auth?.user?.first_name}`} onChange={(e) => setNewFirstName(e.target.value)} />
                        <CommonUserFormGroup type="text" title="Prénom" placeholder="prénom" defaultValue={`${auth?.user?.last_name}`} onChange={(e) => setNewLastName(e.target.value)} />
                        <CommonUserFormGroup type="email" title="Address Email" placeholder="adresse e-mail" defaultValue={`${auth?.user?.email}`} onChange={(e) => setNewEmail(e.target.value)} />
                        <CommonUserFormGroup type="text" title="Num Tel" placeholder="Numéro de téléphone" defaultValue={`${auth?.user?.phone_number}`} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                        <CommonUserFormGroup type="text" title="Adresse" placeholder="adresse physique" defaultValue={`${auth?.user?.address}`} onChange={(e) => setNewAddress(e.target.value)} />
                        <div className="form-footer"><Button block color="primary">{"Enregistrer"}</Button></div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default MyProfile;

