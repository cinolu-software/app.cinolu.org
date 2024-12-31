import React, {useEffect, useState} from "react";
import {Card, NavItem, Nav, NavLink, CardBody,} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {fetchPrograms, fetchPublishedPrograms} from "@/Redux/Reducers/programsSlice/programsSlice";
import {Href, userProfileBasicInfo, userProfileImage, publishedPrograms, allPrograms} from "@/Constant";
import TabsContent from "@/Components/Applications/programs/TabsContent";


const Programs = () => {

    const {status, publishedProgramsStatus} = useAppSelector(state=>state.programs);
    const [basicTab, setBasicTab] = useState("1");

    return (
        <Card>
            <CardBody>
                <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                    <NavItem>
                        <NavLink href={Href} className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                            <i className="icofont icofont-files"></i>{allPrograms}
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href={Href} className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                            <i className="icofont icofont-ui-clip-board"></i>{publishedPrograms}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabsContent basicTab={basicTab}/>
            </CardBody>
        </Card>
    )

}

export default Programs