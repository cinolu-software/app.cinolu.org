import {Href, ImagePath} from "@/Constant";
import { UserProfileAppCallBackType } from '@/Types/Users/Profile/UserProfileType';
import Link from 'next/link';
import {Card, Col, Row} from 'reactstrap';
import NavBarMain from "./NavBarMain";
import UserProfileIcon from "./UserProfileIcon";
import {imageBaseUrl} from "@/services/axios";
import {useAppSelector} from "@/Redux/Hooks";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";


const UserProfile : React.FC<UserProfileAppCallBackType> = ({callback , user}) => {

    const router = useRouter()

    useEffect(() => {
        if(!user) router.push('/users/admin/coachs')
    }, []);


    return (
        <>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/users/admin/coachs'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i>
                        Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col sm="12" className="box-col-12">
                    <Card className="hovercard text-center">
                        <div className="cardheader socialheader" />
                        <div className="user-image">
                            <div className="avatar">
                                <img alt="user" src={user?.profile ? `${imageBaseUrl}/profiles/${user?.profile}` : "/assets/images/avtar/avatar.jpg"} />
                            </div>
                            <div className="icon-wrapper">
                                <Link href={Href}><i className="icofont icofont-pencil-alt-5" /></Link>
                            </div>
                            <UserProfileIcon />
                        </div>
                        <div className="info market-tabs p-0">
                            <NavBarMain callback={callback}  user={user}/>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default UserProfile
