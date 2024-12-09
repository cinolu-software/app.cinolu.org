import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { ProgramsHeader } from "./ProgramsList";
import {  fetchPrograms } from "@/Redux/Reducers/programsSlice/programsSlice";
import { ProgramsListTableDataColumn } from "@/Data/Application/Programs/";
import DeleteProgramsModal from "./DeleteProgramsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {RootState} from "@/Redux/Store";
import {CollapseFilterData} from "./CollapseFilterData";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";



const ProgramsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {status, originalProgramsData } = useAppSelector((state: RootState) => state.programs);
    const filteredItems = originalProgramsData?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPrograms());
        }
    }, [status, dispatch]);


    return (
        <Container fluid>
            <DeleteProgramsModal />
            {
                status !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <ProgramsHeader />
                                        <CollapseFilterData/>
                                    </div>
                                    <div className="list-product">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredItems}
                                                columns={ProgramsListTableDataColumn}
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

            <ToastContainer/>
        </Container>
    );
};

export default ProgramsListContainer;

