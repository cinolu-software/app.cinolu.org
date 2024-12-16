import React, { useEffect, useState } from 'react';
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setNewFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import { StepPropsType } from "@/Types/Programs/ProgramsType";

const StepFive: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { partnerData, status } = useAppSelector((state) => state.partner);
    const [normalizedData, setNormalizedData] = useState<string[]>([]);


    useEffect(() => {
        if (data && Array.isArray(data.partners)) {
            const normalizedPartners = data.partners.map((partner) =>
                typeof partner === 'string' ? partner : partner.id
            );

            setNormalizedData(normalizedPartners);
        }
    }, [data]);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPartner());
        }
    }, [dispatch, status]);


    const handlePartnerChange = (partnerId: string) => {
        const isAlreadySelected = normalizedData.includes(partnerId);

        const updatedPartners = isAlreadySelected
            ? normalizedData.filter((id) => id !== partnerId)
            : [...normalizedData, partnerId];

        setNormalizedData(updatedPartners);
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
                                checked={normalizedData.includes(partner.id)}
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