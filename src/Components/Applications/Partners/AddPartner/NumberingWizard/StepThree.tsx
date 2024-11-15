import React from 'react'
import {Col, Input, Label} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";

const StepThree = () => {

    const dispatch = useAppDispatch();
    const {status, partnerShipData} = useAppSelector(state=>state.partnerShip)

    return (
        <Col xs="12">
            <div>
                <div className="variation-box">
                    {partnerShipData.map(partnerShip => (
                        <div className="selection-box" key={partnerShip.id}>
                            <Input
                                id={`type${partnerShip.id}`}
                                type="checkbox"
                                checked={partnerShip.id}
                                onChange={() => handleTypeChange(partnerShip.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{partnerShip.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Col>
    )
}
export default StepThree
