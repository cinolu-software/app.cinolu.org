import React, {useEffect} from 'react';
import {Container} from "reactstrap";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {useRouter} from "next/navigation";
import BackButton from "@/CommonComponent/BackButton";

const DetailEvent = () => {

    return(
        <Container fluid>
            <BackButton link={'/evenement/list'} />
        </Container>
    )
}

export default DetailEvent;