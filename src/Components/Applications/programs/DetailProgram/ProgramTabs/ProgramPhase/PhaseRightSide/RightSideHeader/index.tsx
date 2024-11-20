import {Input, Label} from 'reactstrap';
import RightDropDown from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/RightSideHeader/RightDropDown";
import RightSideNavTab from "@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramPhase/PhaseRightSide/RightSideHeader/RightSideNavTab";

const RightSideHeader = () => {
    return (
        <div className="mail-header-wrapper">
            <div className="mail-header">
                <div className="form-check form-check-inline m-0">
                    <Label className="form-check-label" for="emailCheckbox1" />
                    <RightSideNavTab />
                </div>
            </div>
        </div>
    );
}

export default RightSideHeader;