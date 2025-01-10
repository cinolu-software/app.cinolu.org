import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import ProjectImage from "@/Components/Applications/projects/common/DetailProject/ProjectImage";
import ProjectTabs from "@/Components/Applications/projects/common/DetailProject/ProjectTabs";
import {useRouter} from "next/navigation";
import {fetchProjectById} from "@/Redux/Reducers/projectSlice/projectSlice";


const DetailProjectContainer = () => {

    const {selectedProgram, programData} = useAppSelector(state=> state.project);
    const router = useRouter();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(selectedProgram){
            dispatch(fetchProjectById(selectedProgram.id));
        }
        else {
            router.push('/programs');
        }
    }, [selectedProgram]);

    return (
        <Container fluid>
            <BackButton link={'/programs'} />
            {
                programData && (
                    <>
                        <ProjectImage image={programData?.image} />
                        <ProjectTabs/>
                    </>
                )
            }
        </Container>
    );
}

export default DetailProjectContainer;