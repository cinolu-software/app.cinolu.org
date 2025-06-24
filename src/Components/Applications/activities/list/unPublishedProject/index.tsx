import React, { useMemo, useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row, Card, CardBody, CardHeader } from "reactstrap";
import {fetchActivities, fetchPublishedActivities} from "@/Redux/Reducers/ActivitySlice";
import { ActivityPublishedListTableDataColumn } from "@/Data/Application/activity";
import DeleteProjectModal from "@/Components/Applications/activities/list/allProject/common/DeleteProjectsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {CollapseFilterData} from "@/Components/Applications/activities/list/allProject/common/CollapseFilterData";

const PublishedProjectListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {unPublishedProjectData,status } = useAppSelector((state) => state.activity);
    const filteredItems = unPublishedProjectData?.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center me-2">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                    className={'border border-primary'}
                    type="search"
                    value={filterText}
                />
            </div>
        );
    }, [filterText]);


    useEffect(() => {
        if (status === "idle" || status === "loading") {
            dispatch(fetchActivities());
        }
    }, [status, dispatch]);


    return (
        <Container fluid>
            <DeleteProjectModal />
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Liste des projets non publiés</h4>
                </CardHeader>
                <CardBody>
                    {
                        status !== 'succeeded' ? <TableSkeleton/> : (
                            <Row>
                                <Col sm="12">
                                    <div className="list-product-header">
                                        <CollapseFilterData/>
                                    </div>
                                    <div className="list-product">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredItems}
                                                columns={ActivityPublishedListTableDataColumn}
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
};

export default PublishedProjectListContainer;
