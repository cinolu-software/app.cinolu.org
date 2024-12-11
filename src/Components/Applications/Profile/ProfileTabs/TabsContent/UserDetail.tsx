import React from 'react';
import {Container, Label, InputGroup, InputGroupText, Input, Form} from "reactstrap";

const UserDetail = () => {

    return (
        <Container fluid className={'mt-5'}>
            <div>
                <h5 className={'mb-3'}>{'Détails de l\'utilisateur'}</h5>
                <div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Nom'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-id-card"></i>
                            </InputGroupText>
                            <Input type={'text'} placeholder={'Entrer votre nom'}/>
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Email'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-email"></i>
                            </InputGroupText>
                            <Input type={'text'} placeholder={'Entrer votre email'}/>
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Numéro de telephone'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-call"></i>
                            </InputGroupText>
                            <Input type={'text'} placeholder={'Entrer votre numero de telephone'}/>
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{'Adresse'}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-location-pin"></i>
                            </InputGroupText>
                            <Input type={'text'} placeholder={'Entrer votre adresse'}/>
                        </InputGroup>
                    </div>
                </div>
                <div className={'mt-5'}>
                    <button className={'btn btn-outline-primary'}>Modifier</button>
                </div>

            </div>
        </Container>
    )
}

export default UserDetail;