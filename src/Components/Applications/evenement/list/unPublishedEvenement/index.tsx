import React, {useMemo, useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row, Card, CardHeader, CardBody } from "reactstrap";
import { fetchEvenements } from "@/Redux/Reducers/evenement";
import {EvenementPublishedListTableData} from "@/Data/Application/evenement";
import DeleteEventModal from "@/Components/Applications/evenement/list/all/Common/DeleteEventModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ToastContainer} from "react-toastify";
import {inputSearch} from "@/Constant";


const PublishedEventsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {unpublishedProjectData, status} = useAppSelector(state=>state.evenement);
    // @ts-ignore
    const filteredItems = unpublishedProjectData?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{inputSearch}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        dispatch(fetchEvenements());
    }, []);
    return (
        <Container fluid>
            <DeleteEventModal />
            <Card>
                <CardHeader className={"d-flex justify-content-between align-items-center"}>
                    <h4 className={"mb-0"}>Liste d'évènements non publiés</h4>
                </CardHeader>
                <CardBody>
                    {
                        status !== 'succeeded' ? <TableSkeleton/> : (
                            <Row>
                                <Col sm="12">
                                    <div className="list-product-header">
                                    </div>
                                    <div className="list-product">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredItems}
                                                columns={EvenementPublishedListTableData}
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

export default PublishedEventsListContainer;