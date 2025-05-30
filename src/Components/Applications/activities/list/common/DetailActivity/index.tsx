import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import ProjectImage from "@/Components/Applications/activities/list/common/DetailActivity/ActivityImage";
import ProjectTabs from "@/Components/Applications/activities/list/common/DetailActivity/ActivityTabs";
import {useRouter} from "next/navigation";
import {fetchActivityById} from "@/Redux/Reducers/ActivitySlice";


const DetailProjectContainer = () => {


    const {selectedActivity } = useAppSelector(state => state.activity);
    const router = useRouter();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if(selectedActivity){
    //         dispatch(fetchActivityById(selectedActivity.id));
    //     }
    //     else {
    //         router.push('/act/list');
    //     }
    // }, [selectedActivity]);

    return (
        <Container fluid>
            <BackButton link={'/act/list'} />
            {
                selectedActivity && (
                    <>
                        {/*<ProjectImage image={selectedActivity?.image} />*/}
                        {/*<ProjectTabs/>*/}
                    </>
                )
            }
        </Container>
    );
}

export default DetailProjectContainer;