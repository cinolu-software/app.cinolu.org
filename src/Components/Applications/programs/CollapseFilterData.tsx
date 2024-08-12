import React, { useEffect, useMemo } from "react";
import { Card, CardBody, Col, Collapse, Row } from "reactstrap";
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";

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




    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: '8px',
            borderColor: '#15803D',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#2B6442',
            },
            padding: '5px',
            minHeight: '40px',
            fontSize: '14px',
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: '8px',
            marginTop: '0',
            zIndex: 9999,
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#15803D' : state.isFocused ? '#D0DDD5' : null,
            color: state.isSelected ? '#FFFFFF' : '#000000',
            padding: '10px',
            fontSize: '14px',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            fontSize: '14px',
            color: '#6c757d',
        }),
        input: (provided: any) => ({
            ...provided,
            fontSize: '14px',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#15803D',
            fontSize: '14px',
            overflow: 'visible',
        }),
    };

    return (
        <Collapse isOpen={filterToggle}>
            <Card className="shadow-none">
                <CardBody className="list-product-body">
                    <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                        <Col>
                            <Select
                                options={options}
                                styles={customStyles}
                                placeholder="Type de programme"
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Collapse>
    );
};
