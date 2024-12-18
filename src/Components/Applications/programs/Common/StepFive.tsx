import React, { useEffect } from 'react';
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setNewFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import { StepPropsType, StepFiveProps} from "@/Types/Programs/ProgramsType";

const StepFive: React.FC<StepPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();
    const { partnerData, status } = useAppSelector((state) => state.partner);
    const { formValue } = useAppSelector((state) => state.programs);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPartner());
        }
    }, [dispatch, status]);

    const handlePartnerChange = (partnerId: string) => {
        if (!data) return;
        const updatedPartners = data.partners.includes(partnerId)
            ? data.partners.filter((id: string) => id !== partnerId)
            : [...data.partners, partnerId];

        dispatch(setNewFormValue({ field: 'partners', value: updatedPartners }));
    };


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        Sélectionner <span className="txt-primary">les partenaires du programme</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur les partenaires que vous souhaitez associer à ce programme.
                    </p>
                </div>

                <div className="variation-box">
                    {partnerData.map((partner) => (
                        <div className="selection-box" key={partner.id}>
                            <Input
                                id={`partner${partner.id}`}
                                type="checkbox"
                                checked={data.partners.includes(partner.id)}
                                onChange={() => handlePartnerChange(partner.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{partner.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepFive;