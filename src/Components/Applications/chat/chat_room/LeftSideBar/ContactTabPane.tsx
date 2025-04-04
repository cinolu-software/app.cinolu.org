import SVG from "@/CommonComponent/SVG";
import {NameAndPhoneNumber} from "@/Constant";
import React from 'react';
import {Mic} from "react-feather";
import {Button, Input} from "reactstrap";
import ContactList from "./ContactList";


const ContactTabPane = () => {
    return (
        <>
            <div className="common-space">
                <p>Contacts</p>
                <div className="header-top">
                    <Button tag="a" color="transparent" className="badge-light-primary f-w-500" >
                        <i className="fa fa-plus" />
                    </Button>
                </div>
            </div>
            <div className="search-contacts">
                <Input type="text" placeholder={NameAndPhoneNumber} />
                <SVG iconId="stroke-search" />
                <Mic className="mic-search" />
            </div>
            <ContactList/>
        </>
    );
};
export default ContactTabPane;