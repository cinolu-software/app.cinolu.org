import React, { useMemo, useState, useEffect } from "react";
import { AppDispatch } from "@/Redux/Store";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { RoleHeader } from "./CategoryList";
import {useSelector, useDispatch} from "react-redux";
import {selectCategoryStatus, fetchCategory, selectTransformedCategoryData} from "@/Redux/Reducers/projectSlice/projectCategorySlice";
import {CategoryListTableDataColumn} from "@/Data/Application/Projects/ProjectsCategory"
import CreateCategoryModal from "./CreateCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";


const CategoryListContainer = () => {

  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector(selectCategoryStatus);
  const transformedCategories = useSelector(selectTransformedCategoryData);


  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{"Chercher"}:</Label>
        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
      </div>
    );
  }, [filterText]);

  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchCategory())
    }
  }, []);


  return (
    <Container fluid>
      <CreateCategoryModal/>
      <UpdateCategoryModal/>
      <DeleteCategoryModal/>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product-header">
                <RoleHeader />
              </div>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable className="theme-scrollbar" data={transformedCategories} columns={CategoryListTableDataColumn} striped highlightOnHover pagination  subHeader subHeaderComponent={subHeaderComponentMemo} />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default CategoryListContainer;
