import { Button, Col } from "reactstrap";
import { EmailFilter, Href } from "@/Constant";
import { useState } from "react";
import ProjectsLeftSidebar from "./ProjectsLeftSidebar";
import { ProjectBoxNavType } from "@/Types/Projects/ProjectsType";

const ProjectSidebar: React.FC<ProjectBoxNavType> = ({ navId, setNavId }) => {

  const [open, setOpen] = useState(false);

  return (
    <Col xxl="3" xl="4" className="box-col-12">
      <div className="md-sidebar">
        <Button color="primary" className="md-sidebar-toggle" href={Href} onClick={() => setOpen(!open)}>{"Catégorie"}</Button>
        <div className={`md-sidebar-aside job-left-aside custom-scrollbar ${open ? "open" : ""}`}>
          <ProjectsLeftSidebar navId={navId} setNavId={setNavId} />
        </div>
      </div>
    </Col>
  );


};

export default ProjectSidebar;
