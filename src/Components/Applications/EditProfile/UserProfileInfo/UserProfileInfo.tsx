import React, { useRef, useState } from "react";
import { Card, CardBody, Col, Form, Spinner } from "reactstrap";
import { MyProfiles } from "@/Constant";
import { UserFormHead } from "./UserFormHead";
import CommonUserFormGroup from "../Common/CommonUserFormGroup";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Flip, toast } from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {UpdateProfilePayload} from "@/Types/AuthType";
import {updateProfile} from "@/Redux/Reducers/AuthSlice";

const UserProfileInfo = () => {

    const { user } = useAppSelector(state=>state.auth);
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);

        const completePayload : UpdateProfilePayload = {
            name: nameRef.current?.value || user?.name || "",
            email: emailRef.current?.value || user?.email || "",
            phone_number: phoneRef.current?.value || user?.phone_number || "",
            address: addressRef.current?.value || user?.address || "",
        };

        try {
            await dispatch(updateProfile(completePayload));
            setTimeout(()=>{
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
                setLoading(false);
            }, 1000)
        }
        catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du profile "}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            setLoading(false);
        }
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

                        <div className="form-footer w-full mt-4 ">
                            <Col className={'w-full'}>
                                <button
                                    className={'btn btn-outline-primary'}
                                    disabled={loading}
                                >
                                    {"Enregistrer"}
                                    <span className={'ms-2'}>
                                        {loading ? <Spinner size={'sm'}/> : ""}
                                    </span>
                                </button>
                            </Col>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
};

export default UserProfileInfo;

