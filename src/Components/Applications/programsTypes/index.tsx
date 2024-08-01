import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import { AppDispatch } from "@/Redux/Store";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { ProgramsTypesHeader } from "./ProgramsList";
import { useSelector, useDispatch } from "react-redux";
import { selectOriginalProgramData,selectProgramTypeStatus, fetchProgramsType, selectTransformedProgramDataType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import DeleteProgramsModal from "./DeleteProgramsModal";
import { ProgramsListTableDataColumn } from "@/Data/Application/ProgramsTypes";
import { ProgramsListTypeTableColumnType } from "@/Types/Programs/ProgramsTypeType";
import ModalCreateProgramType from "@/Components/Applications/programsTypes/ModalCreateProgramType";
import UpdateProgramTypeModal from "@/Components/Applications/programsTypes/ModalUpdateProgramsType"


const ProgramsTypesListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const status = useSelector(selectProgramTypeStatus);

    const transformedPrograms = useSelector(selectTransformedProgramDataType);
    const data = useSelector(selectOriginalProgramData);

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
            dispatch(fetchProgramsType());
        }
    }, [status, dispatch]);

    const filteredPrograms = transformedPrograms.filter(program =>
        program.name.toLowerCase().includes(filterText.toLowerCase())
    );



    return (
        <Container fluid>
            <UpdateProgramTypeModal />
            <DeleteProgramsModal />
            <ModalCreateProgramType/>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <ProgramsTypesHeader />
                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredPrograms}
                                        columns={ProgramsListTableDataColumn as TableColumn<ProgramsListTypeTableColumnType>[]}
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
    );
};

export default ProgramsTypesListContainer;

