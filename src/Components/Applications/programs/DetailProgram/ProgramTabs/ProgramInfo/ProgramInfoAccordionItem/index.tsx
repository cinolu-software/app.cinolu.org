import React from 'react';
import { ChevronDown } from 'react-feather';
import { AccordionHeader, AccordionItem, AccordionBody } from 'reactstrap';

interface ProgramInfoAccordionItemProps {
    id: string;
    Icon: React.ReactNode; // Accepte des instances JSX directement
    title: string;
    ContentComponent?: React.ComponentType<any>; // Plus flexible
    children?: React.ReactNode;
}

const ProgramInfoAccordionItem: React.FC<ProgramInfoAccordionItemProps> = ({
                                                                               id,
                                                                               Icon,
                                                                               title,
                                                                               ContentComponent,
                                                                               children,
                                                                           }) => {
    return (
        <AccordionItem className="bg-light">
            <AccordionHeader
                targetId={id}
                className="gap-2 bg-light-primary text-primary accordion-header"
            >
                {Icon} {/* Rend directement l'icône */}
                <span className="text-success ms-2 fw-bold">{title}</span>
                <ChevronDown className="svg-color text-success" />
            </AccordionHeader>
            <AccordionBody accordionId={id}>
                {ContentComponent ? <ContentComponent /> : children}
            </AccordionBody>
        </AccordionItem>
    );
};

export default ProgramInfoAccordionItem;
