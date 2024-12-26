import React from "react";
import {Container, Card} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import ProfileTabs from "@/Components/Applications/Profile/ProfileTabs";
import ProfileHeader from "@/Components/Applications/Profile/ProfileHeader";

const Profile = () => {

    return(
        <Container fluid>
            <BackButton link={'/dashboard'}/>
            <Card>
                <ProfileHeader/>
                <ProfileTabs />
            </Card>
        </Container>
    )
}

export default Profile;