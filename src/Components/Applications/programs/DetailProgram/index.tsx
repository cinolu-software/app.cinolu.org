import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector} from "@/Redux/Hooks";
import ProgramImage from "@/Components/Applications/programs/DetailProgram/ProgramImage";
import ProgamTabs from "@/Components/Applications/programs/DetailProgram/ProgramTabs";
import {useRouter} from "next/navigation";


const DetailProgramContainer = () => {

    const {selectedProgram} = useAppSelector(state=> state.programs);
    const router = useRouter();

    useEffect(() => {
        if(!selectedProgram){
            router.push('/programs');
        }
    }, [selectedProgram]);

    return (
        <Container fluid>
            <BackButton link={'/programs'} />
            <ProgramImage image={selectedProgram?.image} />
            <ProgamTabs/>
        </Container>
    );
}

export default DetailProgramContainer;