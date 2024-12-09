import React from "react";
import ProfileHeader from "@/Components/Applications/Profile/ProfileHeader";
import {Container, Card} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";

const Profile = () => {

    return(
        <Container fluid>
            <BackButton link={'/dashboard'}/>
            <h2 className={'mb-4'}>Mon Compte</h2>
            <Card>
                <ProfileHeader/>
            </Card>
        </Container>
    )
}

export default Profile