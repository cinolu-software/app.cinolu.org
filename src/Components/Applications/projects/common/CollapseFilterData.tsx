import React, { useEffect, useMemo } from "react";
import { Card, CardBody, Col, Collapse, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgramsType } from "@/Redux/Reducers/projectSlice/programsTypeSlice";

export const CollapseFilterData = () => {

    const { filterToggle } = useAppSelector((state) => state.programs);
    const { transformedProgramsData, status } = useAppSelector((state) => state.programsType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    const options = useMemo(() => {
        return transformedProgramsData.map((typeProgram) => ({
            value: typeProgram.name,
            label: typeProgram.name,
        }));
    }, [transformedProgramsData]);



    return (
        <Collapse isOpen={filterToggle}>
            <Card className="shadow-none">
                <CardBody className="list-product-body">
                    <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                        <Col>

                            <Input
                                type="select"
                                className={'custom-sel'}
                            >
                                <option>Type de programme</option>
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Input>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Collapse>
    );
};
