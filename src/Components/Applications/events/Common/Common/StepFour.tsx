import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setCreateFomValue } from "@/Redux/Reducers/eventSlice/eventSlice";
import { fetchStaffMembers } from "@/Redux/Reducers/userSlice/UserSlice";
import { StepPropsType } from "@/Types/Events";

const StepFour: React.FC<StepPropsType> = ({ createFormValue }) => {
    const dispatch = useAppDispatch();
    const { staffMemberData, statusStaff } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (statusStaff === "idle") {
            dispatch(fetchStaffMembers());
        }
    }, [dispatch, statusStaff]);

    const handleResponsibleChange = (responsibleId: string) => {
        console.log("Selected responsible ID:", responsibleId);
        dispatch(setCreateFomValue({ field: "responsible", value: responsibleId }));
    };

    console.log(createFormValue);

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        Sélectionner <span className="txt-primary">le responsable de cet événement</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur un membre du staff pour le définir comme responsable.
                    </p>
                </div>
                <div className="variation-box">
                    {statusStaff === "loading" ? (
                        <p>Chargement des membres du staff...</p>
                    ) : (
                        staffMemberData?.map((staff) => (
                            <div className="selection-box" key={staff.id}>
                                <Input
                                    id={`responsible${staff.id}`}
                                    type="checkbox"
                                    checked={createFormValue?.responsible === staff.id}
                                    onChange={() => handleResponsibleChange(staff.id)}
                                />
                                <div className="custom--mega-checkbox">
                                    <ul>
                                        <li>{staff.name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </Col>
    );
};

export default StepFour;


