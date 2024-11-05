import { Href, ImagePath } from "@/Constant";
import { UserProfileAppCallBackType } from '@/Types/Users/Profile/UserProfileType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { Card, Row, CardBody, Col, Nav, NavItem, NavLink, CardHeader, Button,  } from "reactstrap";
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
                        <CardHeader className="text-center py-5 position-relative bg-gradient shadow-sm rounded-top">
                            <div className="position-relative d-inline-block">
                                <img
                                    className="rounded-circle border border-3 border-light shadow-lg"
                                    src={`${ImagePath}/avtar/11.jpg`}
                                    alt="Profile Image"
                                    width="120" height="120"
                                    style={{ objectFit: 'cover' }}
                                />

                                <span className="position-absolute bottom-0 end-0 translate-middle p-2 bg-success border border-light rounded-circle">
                                    <span className="visually-hidden">En ligne</span>
                                </span>
                            </div>
                            <h5 className="mt-3 text-uppercase font-weight-bold" style={{ color: '#343a40', letterSpacing: '1px' }}>
                                {user?.name}
                            </h5>
                            <p className="text-muted mb-2">
                                {user?.roles.map((role: any) => role.name).join(', ')}
                            </p>

                            <div className="d-flex justify-content-center mb-3">
                                <span className="border border-light rounded-pill" style={{ width: '40px' }}></span>
                            </div>

                        </CardHeader>
                        <CardBody>
                            <Nav tabs justified>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${basicTab === "1" ? "active" : ""}`}
                                             onClick={() => setBasicTab("1")}>
                                        <i className="icofont icofont-man-in-glasses"></i> Biographie
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${basicTab === "2" ? "active" : ""}`}
                                             onClick={() => setBasicTab("2")}>
                                        <i className="icofont icofont-book-alt"></i> Expérience
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${basicTab === "3" ? "active" : ""}`}
                                             onClick={() => setBasicTab("3")}>
                                        <i className="icofont icofont-book-alt"></i> Contact
                                    </NavLink>
                                </NavItem>

                            </Nav>
                            <UserProfilTabContent basicTab={basicTab} user={user} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default UserProfile;
