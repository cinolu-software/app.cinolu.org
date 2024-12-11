import React from 'react';
import {Container, Label, InputGroup, InputGroupText, Input, Form} from "reactstrap";

const UserPersonalInfo = () => {

    return (
        <Container fluid className={'mt-5'}>
            <div>
                <h5 className={'mb-3'}>{"Information Personnelles"}</h5>
                <div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{"Linkedin"}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-social-linkedin"></i>
                            </InputGroupText>
                            <Input placeholder={'https://'}/>
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{"Facebook"}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-social-facebook"></i>
                            </InputGroupText>
                            <Input placeholder={'https://'}/>
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{"Biographie"}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-newspaper"></i>
                            </InputGroupText>
                            <Input type={'textarea'} placeholder={'Entrer votre biographie'}/>
                        </InputGroup>
                    </div>
                </div>
                <div className={'mt-5'}>
                    <button className={'btn btn-outline-primary'}>Ajouter</button>
                </div>
            </div>
        </Container>
    )
}

export default UserPersonalInfo;