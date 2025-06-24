import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {  Col, Container, Input, Label, Row, Card, CardBody, CardHeader } from "reactstrap";
import {fetchActivities} from "@/Redux/Reducers/ActivitySlice";
import { ActivityListTableDataColumn } from "@/Data/Application/activity";
import DeleteProjectModal from "@/Components/Applications/activities/list/allProject/common/DeleteProjectsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ProjectHeader} from "@/Components/Applications/activities/list/allProject/common/ProjectList";
import {CollapseFilterData} from "@/Components/Applications/activities/list/allProject/common/CollapseFilterData";


const ProjectListContainer = () => {

    const [filterText, setFilterText] = useState("");


    const dispatch = useAppDispatch();

    const {status, originalProjectData} = useAppSelector(state=> state.activity);

    const filteredItems = originalProjectData?.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

    useEffect(() => {
        dispatch(fetchActivities());
    }, []);


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input className={'border border-primary'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);


    return (
        <Container fluid>
            <DeleteProjectModal />
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Liste des projets</h4>
                </CardHeader>
                <CardBody>
                    {
                        status !== 'succeeded' ? <TableSkeleton/> : (
                            <Row>
                                <Col sm="12">

                                    <div className="list-product-header">
                                        <ProjectHeader />
                                        <CollapseFilterData/>
                                    </div>
                                    <div >
                                        <div>
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredItems as any[]}
                                                columns={ActivityListTableDataColumn}
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

export default ProjectListContainer;
