import React, {useState, useMemo} from 'react';
import {ReceiveProgramsType, ReceiveProgramsTypeTable} from "@/Types/Programs/ProgramsType";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {Card, CardBody, Col, Input, Label, Row} from "reactstrap";
import {ProgramsHeader} from "@/Components/Applications/programs/common/ProgramsList";
import {CollapseFilterData} from "@/Components/Applications/programs/common/CollapseFilterData";
import DataTable from "react-data-table-component";
import {ProgramsListTableDataColumn} from "@/Data/Application/Programs";

const ProgramsListContainer: React.FC<ReceiveProgramsTypeTable> = ({programs, programStatus}) => {

    const [filterText, setFilterText] = useState("");
    const filteredItems = programs?.filter((item : ReceiveProgramsType)=>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    const subHeaderComponentMemo = useMemo(()=>{
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
            </div>
        );
    }, [filterText]);


    return (
        <>
            <Row>
                <Col sm="12">6t
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
        </>
    )
}

export default ProgramsListContainer;