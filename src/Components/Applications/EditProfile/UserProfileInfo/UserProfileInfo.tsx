import React, { useRef } from "react";
import { Button, Card, CardBody, Col, Form } from "reactstrap";
import { MyProfiles } from "@/Constant";
import { UserFormHead } from "./UserFormHead";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { selectAuth, updateProfile } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";

const UserProfileInfo = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector(selectAuth);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const completePayload = {
            name: nameRef.current?.value || user?.name || "",
            email: emailRef.current?.value || user?.email || "",
            phone_number: phoneRef.current?.value || user?.phone_number || "",
            address: addressRef.current?.value || user?.address || "",
        };

        console.log(completePayload)

        // try {
        //     await dispatch(updateProfile(completePayload as any)).unwrap();
        //     toast.success(
        //         <p className="text-white tx-16 mb-0">{"Mise à jour effectuée avec succès"}</p>,
        //         {
        //             autoClose: 5000,
        //             position: toast.POSITION.TOP_CENTER,
        //             hideProgressBar: false,
        //             transition: Flip,
        //             theme: "colored",
        //         }
        //     );
        // } catch (error) {
        //     toast.error(
        //         <p className="text-white tx-16 mb-0">{error as string}</p>,
        //         {
        //             autoClose: 5000,
        //             position: toast.POSITION.TOP_CENTER,
        //             hideProgressBar: false,
        //             transition: Flip,
        //             theme: "colored",
        //         }
        //     );
        // }
    };

    return (
        <Col xl="5">
            <Card>
                <CommonCardHeader title={MyProfiles} />
                <CardBody>
                    <Form onSubmit={handleProfileUpdate}>
                        <UserFormHead />
                        <CommonUserFormGroup
                            type="text"
                            title="Nom"
                            placeholder="Nom"
                            defaultValue={user?.name}
                            name="name"
                            inputRef={nameRef}
                        />
                        <CommonUserFormGroup
                            type="email"
                            title="Adresse Email"
                            placeholder="Adresse e-mail"
                            defaultValue={user?.email}
                            name="email"
                            inputRef={emailRef}
                        />
                        <CommonUserFormGroup
                            type="text"
                            title="Numéro de Téléphone"
                            placeholder="Numéro de téléphone"
                            defaultValue={user?.phone_number}
                            name="phone_number"
                            inputRef={phoneRef}
                        />
                        <CommonUserFormGroup
                            type="text"
                            title="Adresse"
                            placeholder="Adresse physique"
                            defaultValue={user?.address}
                            name="address"
                            inputRef={addressRef}
                        />

                        <div className="form-footer w-full mt-4">
                            <Button type="submit" color="primary" outline>
                                {"Enregistrer"}
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserProfileInfo;

