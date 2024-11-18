import React, {useEffect} from 'react'
import {Col, Input, Label} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";
import {StepProps} from "@/Types/PartnerType/PartnerType";
import {setFormValue} from "@/Redux/Reducers/PartnersSlice/partnerSlice";

const StepThree : React.FC<StepProps> = ({formValue , getPartnerData}) => {


    const dispatch = useAppDispatch();
    const {status, partnerShipData} = useAppSelector(state=>state.partnerShip);
    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPartnerShip());
        }
    }, [dispatch]);

    return (
        <Col xs="12">
            <section className={'main-upgrade'}>
                <div className="variation-box">
                        {partnerShipData.map(partnerships => (
                            <div className="selection-box" key={partnerships.id}>
                                <Input
                                    id={`type${partnerships.id}`}
                                    type="checkbox"
                                    name="partnership"
                                    value={JSON.stringify(partnerships)}
                                    onChange={(e) =>
                                        dispatch(
                                            setFormValue({
                                                field : 'partnerships',
                                                value : e.target.checked
                                                    ? [...formValue.partnerships, partnerships]
                                                    : formValue.partnerships.filter((p: { id: string; }) => p.id !== partnerships.id),
                                            })
                                        )
                                    }
                                />
                                <div className="custom--mega-checkbox">
                                    <ul>
                                        <li>{partnerships.name}</li>
                                    </ul>
                                </div>
                            </div>))}

                </div>
            </section>
        </Col>
    )
}
export default StepThree
