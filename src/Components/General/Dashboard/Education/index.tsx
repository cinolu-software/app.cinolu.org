import React from "react";
import { Container, Row } from "reactstrap";
import TotalStudents from "./TotalStudents";
import StudyStatistics from "./StudyStatistics";


const EducationContainer = () => {
  return (
    <Container fluid className="dashboard-4">
      <Row>
        <TotalStudents />
        <StudyStatistics />
      </Row>
    </Container>
  );
};

export default EducationContainer;
