import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import {ExpertiseTypesHeader} from "@/Components/Applications/expertises/ExpertiseList";
import { fetchExpertises, setModalDeleteExpertise, deleteExpertise} from "@/Redux/Reducers/userSlice/ExpertiseSlice"
import {ExpertiseListTableDataColumn} from "@/Data/Application/expertises";
import {ExpertisesListTypeTableColumnType} from "@/Types/Users/Coachs/ExpertiseType";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";

import ModalCreateExpertise from "@/Components/Applications/expertises/ModalCreateExpertise";
import ModalUpdateExpertise from "@/Components/Applications/expertises/ModalUpdateExpertise";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import TableSkeleton from "@/CommonComponent/TableSkeleton";


const ProgramsTypesListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch()
    const {status, dataExpertise, isOpenModalDeleteExpertiseType, selectedExpertise } = useAppSelector(state=> state.expertise);


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchExpertises());
        }
    }, [status, dispatch]);

    const filteredExpertise = dataExpertise.filter(expertise =>
        expertise.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <ModalUpdateExpertise />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteExpertiseType}
                entityName="Expertise de coach"
                selectedEntity={selectedExpertise}
                entities={dataExpertise}
                setModalAction={setModalDeleteExpertise as any}
                deleteEntityThunk={deleteExpertise}
            />
            <ModalCreateExpertise/>
            {
                status !== 'succeeded' ? <TableSkeleton/>: (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <ExpertiseTypesHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredExpertise}
                                                columns={ExpertiseListTableDataColumn as TableColumn<ExpertisesListTypeTableColumnType>[]}
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

