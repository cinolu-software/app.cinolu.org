"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { getProfile } from "@/Redux/Reducers/AuthSlice";

const UserLogin = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { statusAuth, isAuthenticated, user } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (statusAuth === "succeeded" && isAuthenticated && user) {
            router.push('/dashboard')
        } else if (statusAuth === "failed") {
            router.push("http://localhost:3000/");
            // router.push('https://cinolu.org/')
        }
    }, [statusAuth, isAuthenticated, user, router]);

    return (
        <Container fluid className="p-0">
            <Row className="m-0">
                <Col xs="12" className="p-0">
                    <div className="login-card login-dark">
                        {statusAuth === "loading" &&
                            (
                                <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
                            )
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLogin;
