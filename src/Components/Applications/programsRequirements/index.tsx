import React, { useMemo, useState, useEffect } from "react";
import { AppDispatch } from "@/Redux/Store";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { ProgramsHeader } from "./ProgramsList";
import { useSelector, useDispatch } from "react-redux";
import { selectProgramStatus, fetchPrograms, selectTransformedProgramData } from "@/Redux/Reducers/programsSlice/programsSlice";
import { ProgramsListTableDataColumn } from "@/Data/Application/ProgramsTypes";
import CreateProgramsModal from "./CreateProgramsModal";
import UpdateProgramsModal from "./UpdateProgramsModal";
import DeleteProgramsModal from "./DeleteProgramsModal";

const ProgramsListContainer = () => {

  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector(selectProgramStatus);
  const transformedPrograms = useSelector(selectTransformedProgramData);

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

  const filteredPrograms = transformedPrograms.filter(program =>
      program.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
      <Container fluid>
        <CreateProgramsModal />
        <UpdateProgramsModal />
        <DeleteProgramsModal />
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header">
                  <ProgramsHeader />
                </div>
                <div className="list-program">
                  <div className="table-responsive">
                    <DataTable
                        className="theme-scrollbar"
                        data={filteredPrograms}
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
      </Container>
  );
};

export default ProgramsListContainer;
