import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row } from "reactstrap";
import {fetchPublishedActivities} from "@/Redux/Reducers/ActivitySlice";
import { ActivityPublishedListTableDataColumn } from "@/Data/Application/activity";
import DeleteProjectModal from "@/Components/Applications/activities/list/common/DeleteProjectsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {CollapseFilterData} from "@/Components/Applications/activities/list/common/CollapseFilterData";

const PublishedProjectListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {publishedProjectData,fetchPublishedStatus } = useAppSelector((state) => state.activity);
    const filteredItems = publishedProjectData?.filter((item: { name: string; })=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));


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
        if (fetchPublishedStatus === 'idle' || fetchPublishedStatus === 'loading') {
            dispatch(fetchPublishedActivities());
        }
    }, [ fetchPublishedStatus, dispatch]);


    return (
        <Container fluid>
            <DeleteProjectModal />
            {
                fetchPublishedStatus !== 'succeeded' ? <TableSkeleton/> : (
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
            <ToastContainer/>
        </Container>
    );
};

export default PublishedProjectListContainer;


