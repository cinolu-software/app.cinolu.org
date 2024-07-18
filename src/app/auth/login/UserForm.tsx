import { CreateAccount, DontHaveAccount, EmailAddressLogIn, OrSignInWith, Password, RememberPassword, SignIn, SignInToAccount } from "@/Constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo_dark.png";
import UserSocialApp from "./UserSocialApp";
import { useDispatch, useSelector } from "react-redux";
import { login, selectStatus, selectError } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";

const UserForm = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const loginStatus = useSelector(selectStatus);
  const loginErrors = useSelector(selectError);
  const router = useRouter();

  const toastMessages = () => {
      if (loginStatus === 'succeeded') {
          toast.success(
              <p className="text-white tx-16 mb-0">{"Connexion effectuée avec succès"}</p>,
              {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: false,
                  transition: Flip,
                  theme: "colored",
              }
          );

          router.push('/dashboard');
      }
      if (loginStatus === 'failed') {
          toast.error(
              <p className="text-white tx-16 mb-0">{`${loginErrors}`}</p>,
              {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: false,
                  transition: Flip,
                  theme: "colored",
              }
          );

      }
  }

  const formSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    await dispatch(login(payload));
    toastMessages();
  };

  return (
      <div>
        <div>
          <Link className="logo" href={`/dashboard`}>
            <img className="img-fluid for-light" src={imageOne.src} alt="login page" />
            <img className="img-fluid for-dark" src={imageTwo.src} alt="login page" />
          </Link>
        </div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={formSubmitHandle}>
            <h4>{SignInToAccount}</h4>
            <p>Enter your email & password to login</p>
            <FormGroup>
              <Label className="col-form-label">{EmailAddressLogIn}</Label>
              <Input type="email" onChange={(event) => setEmail(event.target.value)} placeholder="" />
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">{Password}</Label>
              <div className="position-relative">
                <Input type={show ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} placeholder="" />
                <div className="show-hide" onClick={() => setShow(!show)}><span className="show"> </span></div>
              </div>
            </FormGroup>
            <FormGroup className="mb-0">
              <div className="checkbox p-0">
                <Input id="checkbox1" type="checkbox" />
                <Label className="text-muted" htmlFor="checkbox1">{RememberPassword}</Label>
              </div>
              <div className="text-end mt-3">
                <Button color="primary" block className="w-100" type="submit">{SignIn}</Button>
              </div>
            </FormGroup>
            <h6 className="text-muted mt-4 or">{OrSignInWith}</h6>
            <UserSocialApp />
            <p className="mt-4 mb-0 text-center">{DontHaveAccount}
              <Link className="ms-2" href={`/authentication/registersimple`}>{CreateAccount}</Link>
            </p>
          </Form>
          <ToastContainer />
        </div>
      </div>
  );

};

export default UserForm;
