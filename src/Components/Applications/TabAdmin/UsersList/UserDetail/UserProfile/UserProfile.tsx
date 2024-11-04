import { Href, ImagePath } from "@/Constant";
import { UserProfileAppCallBackType } from '@/Types/Users/Profile/UserProfileType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { Card, Row, CardBody, Col, Nav, NavItem, NavLink, CardHeader } from "reactstrap";
import UserProfilTabContent from "@/Components/Applications/TabAdmin/UsersList/UserDetail/UserProfilContext";

const UserProfile: React.FC<UserProfileAppCallBackType> = ({ callback, user }) => {
    const router = useRouter();
    const [basicTab, setBasicTab] = useState("1");

    useEffect(() => {
        if (!user) router.push('/users/admin/coachs');
    }, []);

    return (
        <>
            <Row className="mb-4">
                <Col className="d-flex justify-content-end">
                    <Link href="/users/admin/coachs" className='btn btn-outline-primary'>
                        <i className="bi bi-arrow-left"></i> Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col  className="mx-auto">
                    <Card className="shadow-sm">
                        <CardHeader className="text-center py-4">
                            <img className="rounded-circle"
                                 src={`${ImagePath}/avtar/11.jpg`}
                                 alt="Profile Image"
                                 width="150" height="150" />
                            <h5 className="mt-3">{user?.name}</h5>
                            <p className="text-muted">{user?.role}</p>
                        </CardHeader>
                        <CardBody>
                            <Nav tabs justified>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${basicTab === "1" ? "active" : ""}`}
                                             onClick={() => setBasicTab("1")}>
                                        <i className="icofont icofont-man-in-glasses"></i> Profil
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${basicTab === "2" ? "active" : ""}`}
                                             onClick={() => setBasicTab("2")}>
                                        <i className="icofont icofont-book-alt"></i> Modifier
                                    </NavLink>
                                </NavItem>

                                {/*<NavItem>*/}
                                {/*    <NavLink className={`txt-secondary ${basicTab === "3" ? "active" : ""}`}*/}
                                {/*             onClick={() => setBasicTab("3")}>*/}
                                {/*        <i className="icofont icofont-contacts"></i> Contact*/}
                                {/*    </NavLink>*/}
                                {/*</NavItem>*/}
                            </Nav>
                            <UserProfilTabContent basicTab={basicTab} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default UserProfile;
