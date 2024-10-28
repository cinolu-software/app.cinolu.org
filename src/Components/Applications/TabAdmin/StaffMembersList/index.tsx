import React, {useMemo, useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';
import {Card, CardBody, Col, Container, Input, Label, Row} from 'reactstrap';
import {fetchStaffMembers, setModalDeleteUser, deleteUser} from '@/Redux/Reducers/userSlice/UserSlice';
import {StaffMemberType} from '@/Types/Users/UsersType';
import {UsersListTableDataColumn} from "@/Data/Application/Users";
import { UsersListTableColumnType } from '@/Types/Users/UsersType';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import DeleteEntityModal from '@/CommonComponent/DeleteEntityModal';


const StaffMembersListContainer = () =>{

    const [filterText, setFilterText] = useState('');
    const dispatch = useAppDispatch();
    const {staffMemberData, statusStaff, isOpenModalDeleteUser, selectedUser} = useAppSelector(state => state.users)

    useEffect(() => {
        if (statusStaff === 'idle') {
            dispatch(fetchStaffMembers());
        }
    }, [statusStaff, dispatch]);

    const filteredUsers = staffMemberData
        .filter((user: UsersListTableColumnType) =>
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
                isOpen={isOpenModalDeleteUser}
                entityName="utilisateur"
                selectedEntity={selectedUser}
                entities={staffMemberData}
                setModalAction={setModalDeleteUser}
                deleteEntityThunk={deleteUser}
            />
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <h5>Liste des coachs</h5>
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
}

export default StaffMembersListContainer