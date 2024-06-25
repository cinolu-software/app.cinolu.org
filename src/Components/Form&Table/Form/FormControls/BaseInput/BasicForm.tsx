import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import {selectErrorUpdatePassword, updatePassword, selectStatusUpdatePassword} from "@/Redux/Reducers/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import {UpdateProfilePassword} from "@/Types/AuthType";


const BasicForm = () => {

  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const statusUpdate = useSelector(selectStatusUpdatePassword);
  const updateError = useSelector(selectErrorUpdatePassword);

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

  const handlePasswordUpdate = async(e: any) => {

    const payload : UpdateProfilePassword = {
      old_password: oldPassword || '',
      password: password || '',
      password_confirm: passwordConfirm || ''
    }

    await dispatch(updatePassword(payload)).unwrap();
  }

  return (

    <Col md="12">
      <Form  className={"mt-3"}>
        <Row className="g-3 ms-2">
          <Col md="12">
            <Label check>{"Ancien Mot de passe"}</Label>
            <Input type="password" placeholder={"Ancien Mot de passe"} onChange={(e: any) => setOldPassword(e.target.value)}/>
          </Col>
          <Col ms="12">
            <Label check>{"Nouveau Mot de passe"}</Label>
            <Input type="password" placeholder={"Nouveau Mot de passe"} onChange={(e:any) => setPassword(e.target.value)} />
          </Col>
          <Col ms="12">
            <Label check>{"Entrez à nouveau le Mot de passe"}</Label>
            <Input type="password" placeholder={"Entrez à nouveau le Mot de passe"} onChange={(e:any) => setPasswordConfirm(e.target.value)} />
          </Col>

          <Col sm="12"><Button color="primary" onClick={handlePasswordUpdate}>{"Modifier le mot de passe"}</Button></Col>
        </Row>
      </Form>
    </Col>
  );
};

export default BasicForm;
