import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { ComposeMessage, FromHeading, Href, SaveAsDraft, Send } from "@/Constant";
import SimpleMdeReact from 'react-simplemde-editor';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NotificationsInput from './NotificationSubInput';
import { useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { AddNewNotificationInterface } from '@/Types/Notifications/NotificationType';
import { addNewNotifaction, setNotificationValidation, setComposeNotification } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import Link from 'next/link';

const ComposeNotificationModal: React.FC = () => {

    const [ccShow, setCcShow] = useState(false);
    const [bccShow, setBccShow] = useState(false);
    const { composeNotification, notificationValidation} = useAppSelector(state => state.notifications);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddNewNotificationInterface>();


    const onSubmitForm: SubmitHandler<AddNewNotificationInterface> = (data) => {
        dispatch(addNewNotifaction(data));
        dispatch(setComposeNotification(false));
        dispatch(setNotificationValidation(true));
        reset();
    }

    return (
        <Modal isOpen={composeNotification} className={`${composeNotification ? "show" : ""}`} size="lg"  id="compose_mail" >
            <ModalHeader toggle={()=>dispatch(setComposeNotification(false))}> {ComposeMessage} </ModalHeader>
            <ModalBody className="compose-modal">
                <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(onSubmitForm)}>
                    <FormGroup>
                        <Row>
                            <Col sm="2">
                                <Label className="col-form-label" htmlFor="composeFrom" check>{FromHeading} :</Label>
                            </Col>
                            <Col sm="10">
                                <Input id="composeFrom" type="email"/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col sm="2">
                                <Label className="col-form-label" htmlFor="composeTo" check>To :</Label>
                            </Col>
                            <Col sm="10">
                                {/*<input className={`form-control ${notificationValidation && `${errors.userEmail ? "is-invalid":"is-valid"}`}`} type="email" {...register("userEmail", { required: true })} autoComplete="off"/>*/}
                                <div className="add-bcc">
                                    <div className="d-flex gap-2">
                                        <Link className="btn" href={Href} onClick={()=>setCcShow(!ccShow)} > Cc</Link>
                                        <Link className="btn" href={Href} onClick={()=>setBccShow(!bccShow)}> Bcc </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                    <NotificationsInput ccShow={ccShow} bccShow={bccShow} />
                    <FormGroup>
                        <Row>
                            <Col sm="2">
                                <Label className="col-form-label" for="composeSubject" check >Subject :</Label>
                            </Col>
                            <Col sm="10">
                                <input className={`form-control ${notificationValidation && `${errors.subject ? "is-invalid":"is-valid"}`}`} type="textarea" {...register("subject", { required: true })} autoComplete="off"/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <div className="toolbar-box border-0">
                        <div id="editor">
                            <SimpleMdeReact id="editor_container" placeholder="Enter Your Messages..." options={{ autofocus: true, spellChecker: false }} />
                        </div>
                    </div>
                    <ModalFooter>
                        <Button color="light" onClick={()=>dispatch(setNotificationValidation(false))}>{SaveAsDraft}</Button>
                        <Button color="primary" type="submit" onClick={()=>dispatch(setComposeNotification(true))}>{Send}</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    )

}

export default ComposeNotificationModal;