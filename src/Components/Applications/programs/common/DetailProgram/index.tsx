import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import ProgramImage from "@/Components/Applications/programs/common/DetailProgram/ProgramImage"
import ProgramTabs from "@/Components/Applications/programs/common/DetailProgram/ProgramTabs";
import {useRouter} from "next/navigation";
import {fetchProgramById} from "@/Redux/Reducers/programsSlice/programsSlice";


const DetailProgramContainer = () => {

    const {selectedProgram, programData} = useAppSelector(state=> state.programs);
    const router = useRouter();
    const dispatch = useAppDispatch();


    useEffect(() => {
        if(selectedProgram){
            dispatch(fetchProgramById(selectedProgram.id));
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
                        <ProgramImage image={programData?.image} />
                        <ProgramTabs/>
                    </>
                )
            }
        </Container>
    );
}

export default DetailProgramContainer;