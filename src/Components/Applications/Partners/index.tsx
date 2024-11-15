import React, {useMemo, useState, useEffect} from "react";
import {TableColumn} from "react-data-table-component";
import DataTable from "react-data-table-component";
import {CardBody, Card, Col, Container, Input, Label, Row} from "reactstrap";
import PartnersList from "@/Components/Applications/TabAdmin/PartnersList";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {PartnerListTableColumnType} from "@/Types/PartnerType/PartnerType";
import {PartnerListTableDataColumn} from "@/Data/Application/Partner";
import {setModalEditPartner, setModalDeletePartner, setModalCreatePartner, fetchPartner} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import PartnerList from "@/Components/Applications/Partners/PartnerList";



const PartnersListContainer = () => {
    const [filterText, setFilterText] = useState('');
    const dispatch = useAppDispatch();
    const {
        status,
        partnerData,
        isOpenModalDeletePartner,
        isOpenModalCreatePartner,
        isOpenModalEditPartner,
        selectedPartner,

    } = useAppSelector(state => state.partner);

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
            dispatch(fetchPartner());
        }
    }, [status, dispatch]);
    const filteredPartner = partnerData.filter(partner =>
        partner.name.toLowerCase().includes(filterText.toLowerCase())
    );



    return (
        <Container fluid>

            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">
                                <PartnerList />
                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    <DataTable
                                        className="theme-scrollbar"
                                        data={filteredPartner}
                                        columns={PartnerListTableDataColumn as TableColumn<PartnerListTableColumnType>[]}
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
    )
}

export default PartnersListContainer