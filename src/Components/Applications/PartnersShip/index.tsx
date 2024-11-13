import React, {useMemo, useState, useEffect} from "react";
import {TableColumn} from "react-data-table-component";
import DataTable from "react-data-table-component";
import {CardBody, Card, Col, Container, Input, Label, Row} from "reactstrap";
import PartnerShipList from "@/Components/Applications/PartnersShip/PartnerShipList";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {PartnerShipListTableColumnType} from "@/Types/PartnerShipTypes/PartnerShipType";
import {PartnerShipListTableDataColumn} from "@/Data/Application/PartnerShip";
import {deletePartnerShip, setModalEditPartnerShip, setModalCreatePartnerShip, fetchPartnerShip} from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";

const PartnersShipListContainer = () => {

    const [filterText, setFilterText] = useState('');
    const dispatch = useAppDispatch();

    const {status, partnerShipData, isOpenModalCreatePartnerShip, isOpenModalDeletePartnerShip, selectedPartnerShip, isOpenModalEditPartnerShip} = useAppSelector(state => state.partnerShip);

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
            dispatch(fetchPartnerShip());
        }
    }, [status, dispatch]);

    const filteredPartnerShip = partnerShipData.filter(partnerShip =>
        partnerShip.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <PartnerShipList />
                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredPartnerShip}
                                        columns={PartnerShipListTableDataColumn as TableColumn<PartnerShipListTableColumnType>[]}
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

export default PartnersShipListContainer;