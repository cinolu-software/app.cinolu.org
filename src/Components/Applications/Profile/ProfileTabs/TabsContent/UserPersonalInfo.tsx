import React, {useState, useRef, useEffect} from 'react';
import {Container, Label, InputGroup, InputGroupText, Input, Form, Spinner} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {updateProfile} from "@/Redux/Reducers/AuthSlice";
import {UpdateProfilePayload} from "@/Types/AuthType";
import { Flip, toast } from "react-toastify";
import {fetchPositions} from "@/Redux/Reducers/userSlice/PositionSlice";
import {fetchExpertises} from "@/Redux/Reducers/userSlice/ExpertiseSlice";


const UserPersonalInfo = () => {

    const { dataPosition, statusPosition } = useAppSelector(state=>state.position);
    const {dataExpertise, status} = useAppSelector(state => state.expertise);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if(statusPosition === 'idle'){
            dispatch(fetchPositions());
        }

        if(status === 'idle'){
            dispatch(fetchExpertises());
        }
    }, []);

    console.log("userConnected",user);
    console.log("dataPosition===>|",dataPosition);
    console.log("dataExpertise===>|",dataExpertise);




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