import React, {useMemo, useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ModalCreateProjectCategory from "@/Components/Applications/projectCategory/ModalCreateProjectCategory";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchCategory, deleteCategory, setModalDeleteCategory} from "@/Redux/Reducers/projectSlice/ProjectCategory";
import {ProjectCategoryListTableDataColumn} from "@/Data/Application/ProjectCategory";
import {ProjectCategoryHeader} from "@/Components/Applications/projectCategory/ProjectCategoryHeader";
import UpdateProjectCategory from "@/Components/Applications/projectCategory/ModalUpdateProjectCategory";
import TableSkeleton from "@/CommonComponent/TableSkeleton";



const ProjectCategoryListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState('');

    const dispatch = useAppDispatch();

    const {status, isOpenModalDeleteCategory, selectedCategory, projectCategoryData, } = useAppSelector(state => state.projectCategory);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(status === "idle" || status === "loading"){
            dispatch(fetchCategory());
        }
    }, [status, dispatch]);

    const filteredProjectCategory = projectCategoryData?.filter(projectCategory => projectCategory.name?.toLowerCase()?.includes(filterText.toLowerCase()));

    return (
        <Container fluid>

            <ModalCreateProjectCategory />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteCategory}
                entityName={'Catégorie de projet'}
                selectedEntity={selectedCategory}
                entities={projectCategoryData}
                deleteEntityThunk={deleteCategory}
                setModalAction={setModalDeleteCategory as any}
            />
            <UpdateProjectCategory/>
            {
                status !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <ProjectCategoryHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredProjectCategory}
                                                columns={ ProjectCategoryListTableDataColumn }
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
    )
}

export default ProjectCategoryListContainer;