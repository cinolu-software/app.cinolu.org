import { TableColumn } from 'react-data-table-component';
import React, { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";

import {PositionTypesHeader} from "@/Components/Applications/positions/PositionsList";
import {setModalDeletePosition ,fetchPositions, deletePosition} from "@/Redux/Reducers/userSlice/PositionSlice";
import {PositionListTableDataColumn} from "@/Data/Application/positions";
import {PositionsListTypeTableColumnType} from "@/Types/Users/Members/PositionsType";
import ModalCreatePosition from "@/Components/Applications/positions/ModalCreatePosition";
import ModalUpdatePosition from "@/Components/Applications/positions/ModalUpdatePosition";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import TableSkeleton from "@/CommonComponent/TableSkeleton";


const PositionListContainer: React.FC = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch()
    const {statusPosition, dataPosition, selectedPosition, isOpenModalDeletePosition} = useAppSelector(state=>state.position)

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if (statusPosition === "idle" || statusPosition === "loading") {
            dispatch(fetchPositions());
        }
    }, [statusPosition, dispatch]);

    const filteredPosition = dataPosition.filter(position =>
        position.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <ModalUpdatePosition />
            <DeleteEntityModal
                isOpen={isOpenModalDeletePosition}
                entityName="job title"
                selectedEntity={selectedPosition}
                entities={dataPosition}
                setModalAction={setModalDeletePosition as any}
                deleteEntityThunk={deletePosition}
            />
            <ModalCreatePosition/>
            {
                statusPosition !== 'succeeded' ? <TableSkeleton/>: (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <PositionTypesHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredPosition}
                                                columns={PositionListTableDataColumn as TableColumn<PositionsListTypeTableColumnType>[]}
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

export default PositionListContainer;

