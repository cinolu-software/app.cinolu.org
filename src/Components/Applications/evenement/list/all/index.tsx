import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {  Col, Container, Input, Label, Row, Card, CardBody, CardHeader } from "reactstrap";
import {fetchEvenements} from "@/Redux/Reducers/evenement";
import {EvenementListTableDataColumn} from "@/Data/Application/evenement";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {EventsHeader} from "@/Components/Applications/evenement/list/all/Common/EventsList";
import DeleteEventModal from "@/Components/Applications/evenement/list/all/Common/DeleteEventModal";

const EventsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {status, originalProjectData} = useAppSelector((state)=> state.evenement);

    useEffect(() => {
        dispatch(fetchEvenements());
    }, []);

    const filteredItems = originalProjectData?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);



    return (
        <Container fluid>
            <DeleteEventModal />
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className={'mb-0'}>Liste d'évènements</h4>
                </CardHeader>
                <CardBody>
                    {
                        status !== 'succeeded' ? <TableSkeleton/> : (
                            <Row>
                                <Col sm="12">
                                    <div className="list-product-header">
                                        <EventsHeader />
                                    </div>
                                    <div className="list-product">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredItems as any}
                                                columns={EvenementListTableDataColumn}
                                                striped
                                                highlightOnHover
                                                pagination
                                                subHeader
                                                subHeaderComponent={subHeaderComponentMemo}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                </CardBody>
            </Card>

            <ToastContainer/>
        </Container>
    );
}

export default EventsListContainer;