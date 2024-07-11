import React, { useMemo, useState, useEffect } from "react";

import { AppDispatch } from "@/Redux/Store";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { RoleHeader } from "./RoleList";
import {useSelector, useDispatch} from "react-redux";
import {selectRoleStatus, fetchRole, selectTransformedRoles} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import {RoleListTableDataColumn} from "@/Data/Application/RolesData";
import CreateRoleModal from "@/Components/Applications/TabAdmin/RolesList/CreateRoleModal";
import UpdateRoleModal from "@/Components/Applications/TabAdmin/RolesList/UpdateRoleModal";


const RoleListContainer = () => {

  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectRoleStatus);
  const transformedRoles = useSelector(selectTransformedRoles);


  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{"Chercher"}:</Label>
        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
      </div>
    );
  }, [filterText]);

  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchRole())
    }
  }, []);


  return (
    <Container fluid>
      <CreateRoleModal/>
      <UpdateRoleModal/>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product-header">
                <RoleHeader />
              </div>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable className="theme-scrollbar" data={transformedRoles} columns={RoleListTableDataColumn} striped highlightOnHover pagination selectableRows subHeader subHeaderComponent={subHeaderComponentMemo} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default RoleListContainer;
