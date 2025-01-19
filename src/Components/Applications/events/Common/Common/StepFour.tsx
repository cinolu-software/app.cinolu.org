import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setCreateFomValue } from "@/Redux/Reducers/eventSlice/eventSlice";
import { fetchStaffMembers } from "@/Redux/Reducers/userSlice/UserSlice";
import { StepPropsType } from "@/Types/Events";
import {eventResponsible, eventSelect, eventSelectLoading, eventSelectResponsible} from "@/Constant";

const StepFour: React.FC<StepPropsType> = ({ createFormValue }) => {
    const dispatch = useAppDispatch();
    const { staffMemberData, statusStaff } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (statusStaff === "idle") {
            dispatch(fetchStaffMembers());
        }
    }, [dispatch, statusStaff]);

    const handleResponsibleChange = (responsibleId: string) => {
        dispatch(setCreateFomValue({ field: "responsible", value: responsibleId }));
    };


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {eventSelect} <span className="txt-primary">{eventResponsible}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {eventSelectResponsible}
                    </p>
                </div>
                <div className="variation-box">
                    {statusStaff === "loading" ? (
                        <p>{eventSelectLoading}</p>
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


