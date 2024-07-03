import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import ProjectSidebar from "./ProjectsSidebar";
import ProjectRightSide from "./ProjectsRightSide";

const ProjectContainer = () => {

  const [navId, setNavId]= useState("1");

  return (
    <Container fluid>
      <div className="email-wrap email-main-wrapper">
        <Row>
          <ProjectSidebar navId={navId} setNavId={setNavId} />
          <ProjectRightSide navId={navId} />
        </Row>
      </div>
    </Container>
  );
};

export default ProjectContainer;
