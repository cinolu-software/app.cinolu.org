import { Button, Card, CardBody } from "reactstrap";
import ProjectsNavMenu from "./ProjectsNavMenu";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateCategory } from "@/Redux/Reducers/projectSlice/projectSlice";
import { ProjectBoxNavType } from "@/Types/Projects/ProjectsType";

const ProjectsLeftSidebar: React.FC<ProjectBoxNavType> = ({ navId, setNavId }) => {

  const {modalCreateCategory} = useAppSelector((state)=>state.project);


  const dispatch = useAppDispatch();

  return (

    <div className="email-left-aside">
      <Card>
        <CardBody>
          <div className="email-app-sidebar">
            <Button color="primary" className="emailbox" onClick={()=>dispatch(setModalCreateCategory(!modalCreateCategory))} >
              <i className="fa fa-plus"/>{'Ajouter une Catégorie'}
            </Button>
            <ProjectsNavMenu navId={navId} setNavId={setNavId} />
          </div>
        </CardBody>
      </Card>
    </div>

  );
};

export default ProjectsLeftSidebar;
