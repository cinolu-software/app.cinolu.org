import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setCreateFomValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import {fetchEventsType} from "@/Redux/Reducers/eventSlice/EventTypeSlice";
import { StepPropsType} from "@/Types/Events";
import {eventProgramSelect, eventType, eventTextDescription} from "@/Constant";

const StepThree: React.FC<StepPropsType> = ({ createFormValue }) => {

    const dispatch = useAppDispatch();
    const {dataEventType, status} = useAppSelector(state=>state.eventType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEventsType());
        }
    }, [dispatch, status]);

    const handleTypeChange = (typeId: string) => {
        if (!createFormValue) return;
        const updatedTypes = createFormValue.types.includes(typeId)
            ? createFormValue.types.filter((id: string) => id !== typeId)
            : [...createFormValue.types, typeId];
        dispatch(setCreateFomValue({ field: 'types', value: updatedTypes }));
    };

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {eventProgramSelect} <span className="txt-primary">{eventType}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {eventTextDescription}
                    </p>
                </div>
                <div className="variation-box">
                    {dataEventType.map(type => (
                        <div className="selection-box" key={type.id}>
                            <Input
                                id={`type${type.id}`}
                                type="checkbox"
                                checked={createFormValue?.types.includes(type.id)}
                                onChange={() => handleTypeChange(type.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{type.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};


export default StepThree;

