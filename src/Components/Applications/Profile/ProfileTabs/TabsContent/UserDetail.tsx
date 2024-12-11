import React, { useRef, useState } from 'react';
import { Container, Label, InputGroup, InputGroupText, Input, Form } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { UpdateProfilePayload } from "@/Types/AuthType";
import { updateProfile } from "@/Redux/Reducers/AuthSlice";
import { Flip, toast } from "react-toastify";

const UserDetail = () => {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const completePayload: UpdateProfilePayload = {
            name: nameRef.current?.value || user?.name || "",
            email: emailRef.current?.value || user?.email || "",
            phone_number: phoneRef.current?.value || user?.phone_number || "",
            address: addressRef.current?.value || user?.address || "",
        };

        try {
            await dispatch(updateProfile(completePayload));
            setTimeout(() => {
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
            }, 1000);
        }
        catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du profil"}</p>,
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
        <Container fluid className={'mt-5'}>
            <div>
                <h5 className={'mb-3'}>{'Détails de l\'utilisateur'}</h5>
                <div>
                    <Form onSubmit={handleProfileUpdate}>
                        <div className={'mb-3 m-form__group'}>
                            <Label>{'Nom'}</Label>
                            <InputGroup>
                                <InputGroupText className={'list-light-primary'}>
                                    <i className="icofont icofont-id-card"></i>
                                </InputGroupText>
                                <Input
                                    type={'text'}
                                    placeholder={'Entrer votre nom'}
                                    innerRef={nameRef}
                                    defaultValue={user?.name}
                                />
                            </InputGroup>
                        </div>
                        <div className={'mb-3 m-form__group'}>
                            <Label>{'Email'}</Label>
                            <InputGroup>
                                <InputGroupText className={'list-light-primary'}>
                                    <i className="icofont icofont-ui-email"></i>
                                </InputGroupText>
                                <Input
                                    type={'text'}
                                    placeholder={'Entrer votre email'}
                                    innerRef={emailRef}
                                    defaultValue={user?.email}
                                />
                            </InputGroup>
                        </div>
                        <div className={'mb-3 m-form__group'}>
                            <Label>{'Numéro de téléphone'}</Label>
                            <InputGroup>
                                <InputGroupText className={'list-light-primary'}>
                                    <i className="icofont icofont-ui-call"></i>
                                </InputGroupText>
                                <Input
                                    type={'text'}
                                    placeholder={'Entrer votre numéro de téléphone'}
                                    innerRef={phoneRef}
                                    defaultValue={user?.phone_number}
                                />
                            </InputGroup>
                        </div>
                        <div className={'mb-3 m-form__group'}>
                            <Label>{'Adresse'}</Label>
                            <InputGroup>
                                <InputGroupText className={'list-light-primary'}>
                                    <i className="icofont icofont-location-pin"></i>
                                </InputGroupText>
                                <Input
                                    type={'text'}
                                    placeholder={'Entrer votre adresse'}
                                    innerRef={addressRef}
                                    defaultValue={user?.address}
                                />
                            </InputGroup>
                        </div>
                        <div className={'mt-5'}>
                            <button className={'btn btn-outline-primary'} type="submit" disabled={loading}>
                                {loading ? 'Chargement...' : 'Modifier'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    );
};

export default UserDetail;
