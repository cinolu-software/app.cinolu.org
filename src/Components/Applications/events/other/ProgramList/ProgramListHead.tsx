import {AllPrograms, CreateNewProgram, DoingProgram, DoneProgram, Href} from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setActiveTab } from "@/Redux/Reducers/otherSlice/otherSlice";
import Link from "next/link";
import { CheckCircle, Info, PlusSquare, Target } from "react-feather";
import { Button, Card, Col, FormGroup, Nav, NavItem, NavLink, Row } from "reactstrap";


export const ProgramListHead = () => {

    const {activeTab} = useAppSelector((state)=>state.otherProgram)

    const dispatch = useAppDispatch()


    return (
        <Card>
            <Row>
                <Col md="6" className="p-0 d-flex">
                    <Nav tabs className="border-tab" id="top-tab">
                        <NavItem><NavLink href={Href} className={activeTab === '1' ? 'active' : ''} onClick={() => dispatch(setActiveTab("1"))}><Target />{AllPrograms}</NavLink></NavItem>
                        <NavItem><NavLink href={Href} className={activeTab === '2' ? 'active' : ''} onClick={() => dispatch(setActiveTab("2"))}><Info />{DoingProgram}</NavLink></NavItem>
                        <NavItem><NavLink href={Href} className={activeTab === '3' ? 'active' : ''} onClick={() => dispatch(setActiveTab("3"))}><CheckCircle />{DoneProgram}</NavLink></NavItem>
                    </Nav>
                </Col>
                <Col md="6">
                    <FormGroup className="m-0 me-0"></FormGroup>
                    <Link className="btn btn-primary" href={`/project/new_project`}><PlusSquare />{CreateNewProgram}</Link>
                </Col>
            </Row>
        </Card>
    );

};
