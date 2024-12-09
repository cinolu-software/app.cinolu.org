import React from "react";
import BackButton from "@/CommonComponent/BackButton";
import {Container, Card, CardHeader} from "reactstrap";

const ProfileHeader = () => {

    return(
        <CardHeader>
            <div className={'row profile-header'}>
                <div className={'col-12 bg-light-primary block-backgroud'}></div>
                <div className={'col-12 block-info mt-5'}>
                    <h1 className={'fw-bold'}>Moses Kalunga Ziongo</h1>
                    <p>
                        <h4 className={'text-muted fw-light'}>mosesziongo@gmail.com · Joined July 8, 2024</h4>
                    </p>
                </div>
                <div className={'avatar-profile'}></div>
            </div>
        </CardHeader>
    )
}
export default ProfileHeader;