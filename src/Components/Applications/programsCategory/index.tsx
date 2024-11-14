import React, {useMemo, useState, useEffect} from 'react';
import {TableColumn} from "react-data-table-component";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ModalCreateProgramCategory from "@/Components/Applications/programsCategory/ModalCreateProgramCategory";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchCategory, deleteCategory, setModalDeleteCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";
import {ProgramsCategoryListTableDataColumn} from "@/Data/Application/ProgramsCategory";
import {ProgramCategoryHeader} from "@/Components/Applications/programsCategory/ProgramCategoryHeader";
import UpdateProgramCategory from "@/Components/Applications/programsCategory/ModalUpdateProgramCategory";



const ProgramsCategoryListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState('');

    const dispatch = useAppDispatch();

    const {status, isOpenModalDeleteCategory, selectedCategory, programsCategoryData, } = useAppSelector(state => state.programCategory);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchCategory());
        }
    }, [status, dispatch]);


    const filteredProgramCategory = programsCategoryData?.filter(programCategory => programCategory.name.toLowerCase()?.includes(filterText.toLowerCase()));


    return (
        <Container fluid>

            <ModalCreateProgramCategory />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteCategory}
                entityName={'Catégorie de programme'}
                selectedEntity={selectedCategory}
                entities={programsCategoryData}
                deleteEntityThunk={deleteCategory}
                setModalAction={setModalDeleteCategory as any}
            />
            <UpdateProgramCategory/>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <ProgramCategoryHeader />
                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredProgramCategory}
                                        columns={ ProgramsCategoryListTableDataColumn }
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
    )
}

export default ProgramsCategoryListContainer;