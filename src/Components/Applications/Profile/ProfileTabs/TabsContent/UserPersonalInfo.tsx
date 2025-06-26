import React, { useState, useEffect } from "react";
import {Container, Label, InputGroup, InputGroupText, Input, Button} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchPositions } from "@/Redux/Reducers/userSlice/PositionSlice";
import { fetchExpertises } from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import { addDetails } from "@/Redux/Reducers/AuthSlice";
import { Flip, toast } from "react-toastify";


interface Socials {
    Facebook: string;
    Linkedin: string;
}

interface FormData {
    bio: string;
    socials: Socials;
    expertises: string[];
    positions: string[];
}

const UserPersonalInfo: React.FC = () => {

    const { dataPosition, statusPosition } = useAppSelector((state) => state.position);
    const { dataExpertise, status } = useAppSelector((state) => state.expertise);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<FormData>({
        bio: user?.detail?.bio || "",
        socials: user?.detail?.socials || { Facebook: "", Linkedin: "" },
        expertises: [],
        positions: [],
    });

    useEffect(() => {
        if (statusPosition === "idle") {
            dispatch(fetchPositions());
        }
        if (status === "idle") {
            dispatch(fetchExpertises());
        }
    }, [dispatch, statusPosition, status]);

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const data = {
                bio: formData.bio,
                socials: formData.socials,
                expertises: formData.expertises,
                positions: formData.positions,
            };
            // @ts-ignore
            await dispatch(addDetails(data));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Détails mis à jour avec succès !"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur lors de la mise à jour des détails !"}</p>,
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

    return (
        <Container fluid className="mt-5">
            <div>
                <h5 className="mb-3">Informations Personnelles</h5>
                <div>
                    <div className="mb-3 m-form__group">
                        <Label>LinkedIn</Label>
                        <InputGroup>
                            <InputGroupText className="list-light-primary">
                                <i className="icofont icofont-social-linkedin"></i>
                            </InputGroupText>
                            <Input
                                placeholder="https://"
                                value={formData.socials.Linkedin}
                                onChange={(e) =>
                                    handleInputChange("socials", {
                                        ...formData.socials,
                                        Linkedin: e.target.value,
                                    })
                                }
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-3 m-form__group">
                        <Label>Facebook</Label>
                        <InputGroup>
                            <InputGroupText className="list-light-primary">
                                <i className="icofont icofont-social-facebook"></i>
                            </InputGroupText>
                            <Input
                                placeholder="https://"
                                value={formData.socials.Facebook}
                                onChange={(e) =>
                                    handleInputChange("socials", {
                                        ...formData.socials,
                                        Facebook: e.target.value,
                                    })
                                }
                            />
                        </InputGroup>
                    </div>

                    <div className="mb-3 m-form__group">
                        <Label>Biographie</Label>
                        <InputGroup>
                            <InputGroupText className="list-light-primary">
                                <i className="icofont icofont-newspaper"></i>
                            </InputGroupText>
                            <Input
                                type="textarea"
                                placeholder="Entrer votre biographie"
                                value={formData.bio}
                                onChange={(e) => handleInputChange("bio", e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    {user?.roles?.includes("staff") && (
                        <div className="mb-3 m-form__group">
                            <Label>Positions</Label>
                            <Input
                                type="select"
                                multiple
                                value={formData.positions}
                                onChange={(e) => {
                                    const target = e.target as unknown as HTMLSelectElement;
                                    handleInputChange(
                                        "positions",
                                        Array.from(target.selectedOptions, (option) => option.value)
                                    );
                                }}
                            >
                                {dataPosition.map((position) => (
                                    <option key={position.id} value={position.id}>
                                        {position.name}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    )}

                    {user?.roles?.includes("coach") && (
                        <div className="mb-3 m-form__group">
                            <Label>Domaines d'expertise</Label>
                            <Input
                                type="select"
                                multiple
                                value={formData.expertises}
                                onChange={(e) => {
                                    const target = e.target as unknown as HTMLSelectElement;
                                    handleInputChange(
                                        "expertises",
                                        Array.from(target.selectedOptions, (option) => option.value)
                                    );
                                }}
                            >
                                {dataExpertise.map((expertise) => (
                                    <option key={expertise.id} value={expertise.id}>
                                        {expertise.name}
                                    </option>
                                ))}
                            </Input>
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    <Button color="primary" onClick={handleSubmit}>
                        Ajouter / Mettre à jour
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default UserPersonalInfo;
