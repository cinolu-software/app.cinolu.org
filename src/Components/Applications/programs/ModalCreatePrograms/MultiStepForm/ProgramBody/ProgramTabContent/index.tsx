import { Col, TabContent, TabPane } from "reactstrap";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import CommonButton from "../CommonButton";
import { useAppSelector } from "@/Redux/Hooks";

const ProgramTabContent = () => {

    const {navId} = useAppSelector((state)=> state.programs);

    return (
        <>
            <Col xxl="8" xl="8" className="box-col-8 position-relative">

                <TabContent activeTab={navId}>
                    <TabPane tabId={1}>
                        <StepOne />
                    </TabPane>
                    <TabPane tabId={2}>
                        <StepTwo />
                    </TabPane>
                    <TabPane tabId={3}>
                        <StepThree />
                    </TabPane>
                    <TabPane tabId={4}>
                        <StepFour />
                    </TabPane>
                </TabContent>

            </Col>
            {/*<CommonButton />*/}
        </>
    );
};

export default ProgramTabContent;