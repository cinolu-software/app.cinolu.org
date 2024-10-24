import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { fetchUsers, setModalDeleteUser, deleteUser } from "@/Redux/Reducers/userSlice/UserSlice";
import CreateNewUserModal from "@/Components/Applications/TabAdmin/AdminList/CreateAdminModal";
import { UserType } from "@/Types/Users/UsersType";
import {UsersListTableDataColumn} from "@/Data/Application/Users";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {AdminListFilterHeader} from "@/Components/Applications/TabAdmin/AdminList/AdminListFilterHeader";
import {CollapseFilterData} from "@/Components/Applications/TabAdmin/AdminList/CollapseFilterData";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";

const AdminListContainer: React.FC = () => {

  const [filterText, setFilterText] = useState("");
  const dispatch = useAppDispatch();
  const {usersData, status, isOpenModalDeleteUser, selectedUser} = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

    const filteredUsers = usersData
        .filter((user: UserType) =>
            user?.roles?.some(role => role.name === 'admin') &&
            (user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                user.email.toLowerCase().includes(filterText.toLowerCase()))
        );

  const subHeaderComponentMemo = useMemo(() => {
    return (
        <div className="dataTables_filter d-flex align-items-center">
          <Label className="me-2">Chercher:</Label>
          <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
              type="search"
              value={filterText}
          />
        </div>
    );
  }, [filterText]);


  return (
      <Container fluid>
          <CreateNewUserModal />
          <DeleteEntityModal
              isOpen={isOpenModalDeleteUser}
              entityName="utilisateur"
              selectedEntity={selectedUser}
              entities={usersData}
              setModalAction={setModalDeleteUser}
              deleteEntityThunk={deleteUser}
          />
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="list-product-header">
                  <h5>Liste des Utilisateurs</h5>
                  <AdminListFilterHeader/>
                  <CollapseFilterData/>
                </div>
                <div className="list-user">
                  <div className="table-responsive">
                    <DataTable
                        className="theme-scrollbar"
                        data={filteredUsers}
                        columns={UsersListTableDataColumn}
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

export default AdminListContainer;

