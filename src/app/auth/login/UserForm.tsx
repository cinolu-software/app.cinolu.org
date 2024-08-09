
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo_dark.png";
import { useDispatch } from "react-redux";
import { login } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";

const FormulaireUtilisateur = () => {

    const [montrer, setMontrer] = useState(false);
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const gererSoumissionFormulaire = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: motDePasse,
        };
        await dispatch(login(payload)).unwrap()
            .then(()=>{
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

            })
            .catch((error)=>{
                toast.error(
                    <p className="text-white tx-16 mb-0">{error}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
    };

    return (
        <div>
            <div>
                <Link className="logo" href={`/dashboard`}>
                    <img className="img-fluid for-light" src={imageOne.src} alt="page de connexion" />
                    <img className="img-fluid for-dark" src={imageTwo.src} alt="page de connexion" />
                </Link>
            </div>
            <div className="login-main">
                <Form className="theme-form" onSubmit={gererSoumissionFormulaire}>
                    <h4 className={'mb-4'}>{"Connexion"}</h4>

                    <FormGroup>
                        <Label className="col-form-label">{"Adresse e-mail"}</Label>
                        <Input type="email" onChange={(event) => setEmail(event.target.value)} placeholder=""  />
                    </FormGroup>
                    <FormGroup>
                        <Label className="col-form-label">{"Mot de passe"}</Label>
                        <div className="position-relative">
                            <Input type={montrer ? "text" : "password"} onChange={(event) => setMotDePasse(event.target.value)} placeholder=""  />
                            <div className="show-hide" onClick={() => setMontrer(!montrer)}><span className="show"> </span></div>
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-0">
                        <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label className="text-muted" htmlFor="checkbox1">{"Se souvenir du mot de passe"}</Label>
                        </div>
                        <div className="text-end mt-3">
                            <Button color="primary" block className="w-100" type="submit">{"Se connecter"}</Button>
                        </div>
                    </FormGroup>
                </Form>
                <ToastContainer />
            </div>
        </div>
    );

};

export default FormulaireUtilisateur;

