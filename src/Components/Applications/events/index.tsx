// import React, { useMemo, useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
// import {EventsHeader} from "@/Components/Applications/events/EventsList";
// import {fetchEvents} from "@/Redux/Reducers/eventSlice/eventSlice";
// import {EventsListTableDataColumn} from "@/Data/Application/events";
// import DeleteEventModal from "@/Components/Applications/events/DeleteEventModal";
// import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
// import {RootState} from "@/Redux/Store";
// import { ToastContainer} from "react-toastify";
// import TableSkeleton from "@/CommonComponent/TableSkeleton";


// const EventsListContainer = () => {

//     const [filterText, setFilterText] = useState("");
//     const dispatch = useAppDispatch();
//     const {status, dataEvent} = useAppSelector((state)=> state.event);
//     const filteredItems = dataEvent?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
//     const subHeaderComponentMemo = useMemo(() => {
//         return (
//             <div className="dataTables_filter d-flex align-items-center">
//                 <Label className="me-2">{"Chercher"}:</Label>
//                 <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
//             </div>
//         );
//     }, [filterText]);

//     useEffect(() => {
//         if (status === "idle" || status === "loading") {
//             dispatch(fetchEvents());
//         }
//     }, [status, dispatch]);

//     return (
//         <Container fluid>
//             <DeleteEventModal />
//             {
//                 status !== 'succeeded' ? <TableSkeleton/> : (
//                     <Row>
//                         <Col sm="12">
//                             <Card>
//                                 <CardBody>
//                                     <div className="list-product-header">
//                                         <EventsHeader />
//                                     </div>
//                                     <div className="list-product">
//                                         <div className="table-responsive">
//                                             <DataTable
//                                                 className="theme-scrollbar"
//                                                 data={filteredItems as any}
//                                                 columns={EventsListTableDataColumn}
//                                                 striped
//                                                 highlightOnHover
//                                                 pagination
//                                                 subHeader
//                                                 subHeaderComponent={subHeaderComponentMemo}
//                                             />
//                                         </div>
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 )
//             }
//             <ToastContainer/>
//         </Container>
//     );
// };

// export default EventsListContainer;

import React, { useState } from "react";
import { Card, NavItem, Nav, NavLink, CardBody } from "reactstrap";
import { publishedEvents, allEvents, Href } from "@/Constant";
import TabsContent from "@/Components/Applications/events/TabsContent";


const Events = () => {
    const [basicTab, setBasicTab] = useState('1');

    return (
        <Card>
            <CardBody>
                <Nav tabs className="border-tab border-0 mb-0 nav-primary">
                    <NavItem>
                        <NavLink href={Href} className={`nav-border pt-0 nav-danger ${basicTab === "1" ? "active" : ""}`} onClick={() => setBasicTab("1")}>
                            <i className="icofont icofont-files"></i>{allEvents}
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink href={Href} className={`nav-border nav-danger ${basicTab === "2" ? "active" : ""}`} onClick={() => setBasicTab("2")}>
                            <i className="icofont icofont-ui-clip-board"></i>{publishedEvents}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabsContent basicTab={basicTab}/>
            </CardBody>
        </Card>
    )
}

export default Events
