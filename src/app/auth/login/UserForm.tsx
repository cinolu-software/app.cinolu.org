import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer, Flip, Theme } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo_dark.png";
import { useDispatch, useSelector } from "react-redux";
import { login, selectStatus } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";
import {useRouter} from "next/navigation";

const UserForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const status = useSelector(selectStatus);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            displayToast("Veuillez remplir tous les champs.", "error");
            return;
        }

        setLoading(true);
        try {
            await dispatch(login(formData)).unwrap();
            displayToast("Connexion réussie", "success");
             router.push('/dashboard');
        } catch (error) {
            displayToast(error as string, "error");
        } finally {
            setLoading(false);
        }
    };

    const displayToast = (message: string, type: "success" | "error") => {
        const toastOptions = {
            autoClose: 5000,
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false,
            transition: Flip,
            theme: 'colored' as Theme,
        };
        type === "success"
            ? toast.success(<p className="text-white tx-16 mb-0">{message}</p>, toastOptions)
            : toast.error(<p className="text-white tx-16 mb-0">{message}</p>, toastOptions);
    };

    useEffect(() => {
        if (status === "failed") {
            setLoading(false);
        }
    }, [status]);

    return (
        <div>
            <Link className="logo" href={`/dashboard`}>
                <img className="img-fluid for-light" src={imageOne.src} alt="page de connexion" />
                <img className="img-fluid for-dark" src={imageTwo.src} alt="page de connexion" />
            </Link>
            <div className="login-main">
                <Form className="theme-form" onSubmit={handleSubmit}>
                    <h4 className="mb-4">Connexion</h4>
                    <FormGroup>
                        <Label className="col-form-label">Adresse e-mail</Label>
                        <Input
                            type="email"
                            placeholder="Votre email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-form-label">Mot de passe</Label>
                        <div className="position-relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Votre mot de passe"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="show-hide" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute top-50 end-0 translate-middle-y cursor-pointer`} />
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label className="text-muted" htmlFor="checkbox1">Se souvenir du mot de passe</Label>
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
