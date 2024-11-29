import React, {useMemo, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {Card, CardBody, Col, Container, Input, Label, Row} from 'reactstrap';
import {fetchCoaches, setModalDeleteCoach, deleteUser} from '@/Redux/Reducers/userSlice/UserSlice';
import {UserType} from '@/Types/Users/UsersType';
import {CoatchListTableDataColumn} from "@/Data/Application/Users";
import { UsersListTableColumnType } from '@/Types/Users/UsersType';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import DeleteEntityModal from '@/CommonComponent/DeleteEntityModal';
import UpdateCoachModal from "@/Components/Applications/TabAdmin/CoachsList/CoachDetail/UpdateCoachModal";


const CoachsListContainer = () =>{

    const [filterText, setFilterText] = useState('');
    const dispatch = useAppDispatch();
    const {coachsData, statusCoachs, isOpenModalDeleteCoach, selectedCoach} = useAppSelector(state => state.users)

    useEffect(() => {
        if (statusCoachs === 'idle') {
          dispatch(fetchCoaches());
        }
      }, [statusCoachs, dispatch]);
    
    const filteredUsers = coachsData
    .filter((user: UserType) =>
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

              <DeleteEntityModal
                  isOpen={isOpenModalDeleteCoach}
                  entityName="utilisateur"
                  selectedEntity={selectedCoach}
                  entities={coachsData}
                  setModalAction={setModalDeleteCoach}
                  deleteEntityThunk={deleteUser}
              />

              <UpdateCoachModal/>

              <Row>
                  <Col sm="12">
                    <Card>
                      <CardBody>
                        <div className="list-product-header"><h5>Liste des coachs</h5></div>
                        <div className="list-user">
                          <div className="table-responsive">
                            <DataTable
                                className="theme-scrollbar"
                                data={filteredUsers}
                                columns={CoatchListTableDataColumn}
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
}
export default CoachsListContainer