import React from 'react';
import {ChevronDown} from "react-feather";
import { AccordionHeader, AccordionItem, AccordionBody} from "reactstrap";


const ProgramInfoAccordionItem : React.FC<{item: any}> = ({item}) => {
    return (
        <AccordionItem className={item.accordionItemClass}>
            <AccordionHeader targetId={item.id} className={item.accordionHeaderClass}>
                {item.iconWithTitle && item.iconWithTitle}
                <span className={item.spanClass}>{item.accordionHeading}</span>
                {item.icon && <ChevronDown className={`svg-color ${item.spanClass}`} />}
            </AccordionHeader>
            <AccordionBody accordionId={item.id}>{item.bodyText}</AccordionBody>
        </AccordionItem>
    );
}

export default ProgramInfoAccordionItem