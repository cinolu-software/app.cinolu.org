import React, {useMemo, useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row } from "reactstrap";
import {fetchPublishedEvents} from "@/Redux/Reducers/eventSlice/eventSlice";
// import {EventsListTableDataColumn} from "@/Data/Application/events";
import {PublishedEventsListTableDataColumn} from "@/Data/Application/events";
import DeleteEventModal from "@/Components/Applications/events/Common/DeleteEventModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ToastContainer} from "react-toastify";
import {inputSearch} from "@/Constant";


const PublishedEventsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {publishedEventData, publishedEventStatus} = useAppSelector(state=>state.event);
    // @ts-ignore
    const filteredItems = publishedEventData[0]?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{inputSearch}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(publishedEventStatus === "idle" || publishedEventStatus === "loading"){
            dispatch(fetchPublishedEvents())
        }
    }, [publishedEventStatus, dispatch]);

    return (
        <Container fluid>
            <DeleteEventModal />
            {
                publishedEventStatus !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">

                            <div className="list-product-header">
                            </div>
                            <div className="list-product">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredItems}
                                        columns={PublishedEventsListTableDataColumn}
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

export default PublishedEventsListContainer;