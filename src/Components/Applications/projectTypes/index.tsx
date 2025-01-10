import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ProjectTypesHeader from "@/Components/Applications/projectTypes/ProjectsList";
import { useSelector, useDispatch } from "react-redux";
import { selectOriginalProjectData ,selectProjectTypeStatus, fetchProjectType, selectTransformedProjectDataType, setModalDeleteProjectTypes, deleteProjectType } from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import {ProjectListTypeTableColumnType} from "@/Types/Projects/ProjectTypeType";
import ModalCreateProjectType from "@/Components/Applications/projectTypes/ModalCreateProjectType";
import UpdateProjectTypeModal from "@/Components/Applications/projectTypes/ModalUpdateProjectType";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ProjectTypeListTableDataColumn} from "@/Data/Application/ProjectTypes";



const ProgramsTypesListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch()
    const status = useSelector(selectProjectTypeStatus);
    const transformedProject = useSelector(selectTransformedProjectDataType);
    const data = useSelector(selectOriginalProjectData);
    const {isOpenModalDeleteProjectType, selectedProjectType, originalTypeProjectData} = useAppSelector(state => state.projectType)


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle" || status === "loading") {
            dispatch(fetchProjectType());
        }
    }, [status, dispatch]);

    const filteredPrograms = transformedProject.filter(project =>
        project.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <UpdateProjectTypeModal />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteProjectType}
                entityName="type de programme"
                selectedEntity={selectedProjectType}
                entities={originalTypeProjectData}
                setModalAction={setModalDeleteProjectTypes as any}
                deleteEntityThunk={deleteProjectType}
            />
            <ModalCreateProjectType/>
            {
                status !== 'succeeded' ? <TableSkeleton/>: (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <ProjectTypesHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredPrograms}
                                                columns={ProjectTypeListTableDataColumn as unknown as TableColumn<ProjectListTypeTableColumnType>[]}
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
                )
            }
        </Container>
    );
};

export default ProgramsTypesListContainer;

