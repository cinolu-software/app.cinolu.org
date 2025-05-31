import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {  Col, Container, Input, Label, Row } from "reactstrap";
import { fetchEvents } from "@/Redux/Reducers/eventSlice/eventSlice";
import { EventsListTableDataColumn } from "@/Data/Application/events";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {EventsHeader} from "@/Components/Applications/evenement/list/Common/EventsList";
import DeleteEventModal from "@/Components/Applications/evenement/list/Common/DeleteEventModal";

const EventsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {status, dataEvent} = useAppSelector((state)=> state.event);

    const filteredItems = dataEvent?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle" || status === "loading") {
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);

    return (
        <Container fluid>
            <DeleteEventModal />
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
                                                columns={EventsListTableDataColumn}
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
            <ToastContainer/>
        </Container>
    );
}

export default EventsListContainer;