import React, {useEffect, useMemo} from 'react';
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { Card, CardBody, Col, Collapse, Input, Row } from "reactstrap";
import {fetchRole} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";

export const CollapseFilterData: React.FC<{setRoleFilter: any}> =  ({setRoleFilter}) => {

  const { filterToggle } = useAppSelector((state) => state.users);
  const {originalRoleData, status} = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchRole());
        }
    }, [status, dispatch]);

    const options = useMemo(() => {
        return originalRoleData.map((role)=> ({
            value: role.name,
            label: role.name
        }))
    }, [originalRoleData]);

  return (
      <Collapse isOpen={filterToggle}>
          <Card className="shadow-none">
              <CardBody className="list-product-body">
                  <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                      <Col>
                          <Input
                              type="select"
                              className="custom-select"
                              onChange={(e) => setRoleFilter(e.target.value)}
                          >
                              {options.map((option, index) => (
                                  <option key={index} value={option.value}>
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
