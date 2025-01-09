import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Col, Container, Input, Label, Row } from "reactstrap";
import { fetchPublishedPrograms } from "@/Redux/Reducers/projectSlice/projectSlice";
import { ProgramsListTableDataColumn } from "@/Data/Application/Programs/";
import DeleteProgramsModal from "@/Components/Applications/programs/common/DeleteProgramsModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { ToastContainer} from "react-toastify";
import TableSkeleton from "@/CommonComponent/TableSkeleton";
import {CollapseFilterData} from "@/Components/Applications/programs/common/CollapseFilterData";

const PublishedProgramsListContainer = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const { publishedProgramsData, publishedProgramsStatus } = useAppSelector((state) => state.programs);
    const filteredItems = publishedProgramsData?.filter((item)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));


    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (publishedProgramsStatus === "idle" || publishedProgramsStatus === "loading") {
            dispatch(fetchPublishedPrograms());
        }
    }, [publishedProgramsStatus, dispatch]);

    return (
        <Container fluid>
            <DeleteProgramsModal />
            {
                publishedProgramsStatus !== 'succeeded' ? <TableSkeleton/> : (
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
                                        columns={ProgramsListTableDataColumn}
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

export default PublishedProgramsListContainer;

