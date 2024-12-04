import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { EventsTypesHeader } from "./EventsList";
import {fetchEventsType, setModalDeleteEventTypes, deleteEventType} from "@/Redux/Reducers/eventSlice/EventTypeSlice"
import {EventsListTableDataColumn} from "@/Data/Application/eventTypes";
import {EventsListTypeTableColumnType} from "@/Types/EventsType/eventsTypeType";
import ModalCreateProgramType from "@/Components/Applications/programsTypes/ModalCreateProgramType";
import UpdateProgramTypeModal from "@/Components/Applications/programsTypes/ModalUpdateProgramsType";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalDeleteProgramTypes} from "@/Redux/Reducers/programsSlice/programsTypeSlice";


const ProgramsTypesListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch()
    const {status, dataEventType, isOpenModalDeleteEventType, isOpenModalEditEventType, selectedEventType } = useAppSelector(state=>state.eventType);


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEventsType());
        }
    }, [status, dispatch]);

    const filteredEvents = dataEventType.filter(event =>
        event.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <UpdateProgramTypeModal />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteEventType}
                entityName="type d'événement"
                selectedEntity={selectedEventType}
                entities={dataEventType}
                setModalAction={setModalDeleteProgramTypes as any}
                deleteEntityThunk={deleteEventType}
            />
            <ModalCreateProgramType/>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <EventsTypesHeader />
                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredEvents}
                                        columns={EventsListTableDataColumn as TableColumn<EventsListTypeTableColumnType>[]}
                                        striped
                                        highlightOnHover
                                        pagination
                                        subHeader
                                        subHeaderComponent={subHeaderComponentMemo}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProgramsTypesListContainer;

