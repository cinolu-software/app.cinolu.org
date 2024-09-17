import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo_dark.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";
import { selectStatus } from "@/Redux/Reducers/AuthSlice";
import axiosInstance from "@/services/axios";
import Cookies from "js-cookie";




const UserForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const status = useSelector(selectStatus);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const payload = {
            email: email,
            password: password,
        };

        try {
            await dispatch(login(payload)).unwrap();
            router.push('/dashboard');

        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{error as string}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true);
        } else if (status === 'failed') {
            setLoading(false);
        }
    }, [status]);



    return (
        <div>
            <div>
                <Link className="logo" href={`/dashboard`}>
                    <img className="img-fluid for-light" src={imageOne.src} alt="page de connexion" />
                    <img className="img-fluid for-dark" src={imageTwo.src} alt="page de connexion" />
                </Link>
            </div>
            <div className="login-main">
                <Form className="theme-form" onSubmit={handleSubmit}>
                    <h4 className={'mb-4'}>{"Connexion"}</h4>

                    <FormGroup>
                        <Label className="col-form-label">{"Adresse e-mail"}</Label>
                        <Input type="email" placeholder="Votre email" name="email" required />
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-form-label">{"Mot de passe"}</Label>
                        <div className="position-relative">
                            <Input type={showPassword ? "text" : "password"} name="password" placeholder="Votre mot de passe" required />
                            <div className="show-hide" onClick={() => setShowPassword(!showPassword)}>
                                <span className="show"> </span>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label className="text-muted" htmlFor="checkbox1">{"Se souvenir du mot de passe"}</Label>
                        </div>
                        <div className="text-end mt-3">
                            <Button color="primary" block className="w-100" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" /> : "Se connecter"}
                            </Button>
                        </div>
                    </FormGroup>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UserForm;

