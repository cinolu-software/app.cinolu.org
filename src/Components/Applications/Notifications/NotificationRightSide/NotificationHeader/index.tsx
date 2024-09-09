import { Input, Label } from "reactstrap";
import { Search } from "@/Constant";
import RightDropDown from "./RightDropDown";
import NotificationsNavTab from "./NotificationsNavTab";

const NotificationHeader = () => {
    return (
        <div className="mail-header-wrapper">
            <div className="mail-header">
                <div className="form-check form-check-inline m-0">
                    {/*<Input className="form-check-input checkbox-primary" id="emailCheckbox1" type="checkbox" defaultValue="option1" />*/}
                    {/*<Label className="form-check-label" for="emailCheckbox1" />*/}
                    <NotificationsNavTab />
                </div>
            </div>
            {/*<div className="mail-body">*/}
            {/*    <div className="mail-search d-flex-align-items-center">*/}
            {/*        <Input type="text" placeholder={Search} />*/}
            {/*        <i className="fa fa-search" />*/}
            {/*    </div>*/}
            {/*    <div className="light-square">*/}
            {/*        <i className="fa fa-refresh" />*/}
            {/*    </div>*/}
            {/*    <div className="light-square">*/}
            {/*        <i className="fa fa-trash" />*/}
            {/*    </div>*/}
            {/*    <RightDropDown />*/}
            {/*</div>*/}
        </div>
    );
};

export default NotificationHeader;