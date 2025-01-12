import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ProgramTypesHeader from "@/Components/Applications/programs/ProgramsList";
import {fetchProgram, deleteProgram, setModalDeleteProgram} from "@/Redux/Reducers/programSlice/programSlice";
import {ProgramListTypeTableColumnType} from "@/Types/Programs/ProgramType";
import ModalCreateProgram from "@/Components/Applications/programs/ModalCreateProgram";
import UpdateProgramModal from "@/Components/Applications/programs/ModalUpdateProgram";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {ProgramTypeListTableDataColumn} from "@/Data/Application/Programs";

const ProgramsListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch()
    const {isOpenModalDeleteProgram, status, transformedPrograms, originalPrograms, selectedProgram} = useAppSelector(state=>state.program)

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
            dispatch(fetchProgram());
        }
    }, [status, dispatch]);

    const filteredPrograms = transformedPrograms.filter(program =>
        program.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <UpdateProgramModal />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteProgram}
                entityName="programme"
                selectedEntity={selectedProgram}
                entities={originalPrograms}
                setModalAction={setModalDeleteProgram as any}
                deleteEntityThunk={deleteProgram}
            />
            <ModalCreateProgram/>
            {
                status !== 'succeeded' ? <TableSkeleton/>: (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <ProgramTypesHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredPrograms}
                                                columns={ProgramTypeListTableDataColumn as unknown as TableColumn<ProgramListTypeTableColumnType>[]}
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

export default ProgramsListContainer;
