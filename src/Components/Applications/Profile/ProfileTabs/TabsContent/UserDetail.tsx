import React, { useState, useEffect, useRef } from "react";
import { Container, Label, InputGroup, InputGroupText, Input, Form, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProfile } from "@/Redux/Reducers/AuthSlice";
import { UpdateProfilePayload } from "@/Types/AuthType";
import { fetchPositions } from "@/Redux/Reducers/userSlice/PositionSlice";
import { fetchExpertises } from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import { addDetails } from "@/Redux/Reducers/AuthSlice";
import { Flip, toast } from "react-toastify";
import {userDetailTitle, userDetailNameLabel, userDetailNamePlaceholder, userDetailEmailLabel, userDetailEmailPlaceholder, userDetailPhoneLabel, userDetailPhonePlaceholder, userDetailAddressLabel, userDetailAddressPlaceholder, userDetailUpdateButton,
    userDetailLoading, personalInfoTitle, personalInfoLinkedInLabel, personalInfoLinkedInPlaceholder, personalInfoFacebookLabel, personalInfoFacebookPlaceholder, personalInfoBioLabel, personalInfoBioPlaceholder, staffPositionsLabel,
    coachExpertisesLabel, updateProfileSuccess, updateProfileError, updateDetailsSuccess, updateDetailsError, updateDetailsButton} from "@/Constant";
import {useTranslation} from "react-i18next";



const UserDetail = () => {
    
    const { user } = useAppSelector((state) => state.auth);

    const { dataPosition, statusPosition } = useAppSelector((state) => state.position);
    const { dataExpertise, status } = useAppSelector((state) => state.expertise);
    const dispatch = useAppDispatch();
    const { t } = useTranslation("common");
    const [loading, setLoading] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
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

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const completePayload: UpdateProfilePayload = {
            name: nameRef.current?.value || user?.name || "",
            email: emailRef.current?.value || user?.email || "",
            phone_number: phoneRef.current?.value || user?.phone_number || "",
            address: addressRef.current?.value || user?.address || "",
        };

        try {
            await dispatch(updateProfile(completePayload));
            toast.success(
                <p className="text-white tx-16 mb-0">{updateProfileSuccess}</p>,
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
                <p className="text-white tx-16 mb-0">{updateProfileError}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePersonalInfoSubmit = async () => {
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
                <p className="text-white tx-16 mb-0">{updateDetailsSuccess}</p>,
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
                <p className="text-white tx-16 mb-0">{updateDetailsError}</p>,
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
                <h5 className="mb-3">{userDetailTitle}</h5>
                <Form onSubmit={handleProfileUpdate}>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{userDetailNameLabel}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-id-card"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={userDetailNamePlaceholder}
                                innerRef={nameRef}
                                defaultValue={user?.name}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{userDetailEmailLabel}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-email"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={userDetailEmailPlaceholder}
                                innerRef={emailRef}
                                defaultValue={user?.email}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{userDetailPhoneLabel}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-ui-call"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={userDetailPhonePlaceholder}
                                innerRef={phoneRef}
                                defaultValue={user?.phone_number}
                            />
                        </InputGroup>
                    </div>
                    <div className={'mb-3 m-form__group'}>
                        <Label>{userDetailAddressLabel}</Label>
                        <InputGroup>
                            <InputGroupText className={'list-light-primary'}>
                                <i className="icofont icofont-location-pin"></i>
                            </InputGroupText>
                            <Input
                                type={'text'}
                                placeholder={userDetailAddressPlaceholder}
                                innerRef={addressRef}
                                defaultValue={user?.address}
                            />
                        </InputGroup>
                    </div>
                    <Button color="primary" type="submit" disabled={loading} className={'mb-5 mt-5'} outline >
                        {loading ? userDetailLoading : userDetailUpdateButton}
                    </Button>
                </Form>
            </div>
            <hr/>

            <div>
                <h5 className="mb-3 mt-5">{t(personalInfoTitle)}</h5>
                <div>
                    <div>
                        <div className="mb-3 m-form__group">
                            <Label>{personalInfoLinkedInLabel}</Label>
                            <InputGroup>
                                <InputGroupText className="list-light-primary">
                                    <i className="icofont icofont-social-linkedin"></i>
                                </InputGroupText>
                                <Input
                                    placeholder={personalInfoLinkedInPlaceholder}
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
                            <Label>{personalInfoFacebookLabel}</Label>
                            <InputGroup>
                                <InputGroupText className="list-light-primary">
                                    <i className="icofont icofont-social-facebook"></i>
                                </InputGroupText>
                                <Input
                                    placeholder={personalInfoFacebookPlaceholder}
                                    value={formData.socials.Facebook}
                                    onChange={(e) =>
                                        handleInputChange("socials", {
                                            ...forAmData.socials,
                                            Facebook: e.target.value,
                                        })
                                    }
                                />
                            </InputGroup>
                        </div>

                        <div className="mb-3 m-form__group">
                            <Label>{personalInfoBioLabel}</Label>
                            <InputGroup>
                                <InputGroupText className="list-light-primary">
                                    <i className="icofont icofont-newspaper"></i>
                                </InputGroupText>
                                <Input
                                    type="textarea"
                                    placeholder={personalInfoBioPlaceholder}
                                    value={formData.bio}
                                    onChange={(e) => handleInputChange("bio", e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        {user?.roles?.includes("staff") && (
                            <div className="mb-3 m-form__group">
                                <Label>{staffPositionsLabel}</Label>
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
                                <Label>{coachExpertisesLabel}</Label>
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
                        <Button color="primary" onClick={handlePersonalInfoSubmit} outline>
                            {updateDetailsButton}
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserDetail;