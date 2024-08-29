import { useAppSelector } from "@/Redux/Hooks";
import { Card, CardBody, Row, TabContent, TabPane } from "reactstrap";
import { CommonProgramListCard } from "../Common/CommonProgramListCard";

const ProjectListTabContent = () => {

    const { activeTab, createdFormData } = useAppSelector((state) => state.otherProgram);

    return (
        <Card>
            <CardBody>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            {createdFormData.map((item, i) => (
                                <CommonProgramListCard item={item} key={i} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            {createdFormData.filter((item) => item.badge === "Doing").map((item, i) => (
                                <CommonProgramListCard item={item} key={i} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            {createdFormData.filter((item) => item.badge === "Done").map((item, i) => (
                                <CommonProgramListCard item={item} key={i} />
                            ))}
                        </Row>
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>
    );
};

export default ProjectListTabContent;