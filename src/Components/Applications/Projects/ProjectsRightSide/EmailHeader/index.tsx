import { Input, Label } from "reactstrap";
import EmailNavTab from "./EmailNavTab";
import { Search } from "@/Constant";
import RightDropDown from "./RightDropDown";

const EmailHeader = () => {
  return (
    <div className="mail-header-wrapper">
      <div className="mail-header">
        <div className="form-check form-check-inline m-0">
          <EmailNavTab />
        </div>
      </div>
      <div className="mail-body">
        <div className="mail-search d-flex-align-items-center">
          <Input type="text" placeholder={"Recherche..."} />
          <i className="fa fa-search" />
        </div>
      </div>
    </div>
  );
};

export default EmailHeader;
