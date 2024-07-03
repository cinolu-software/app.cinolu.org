import { Button, Card, CardBody } from "reactstrap";
import ProjectsNavMenu from "./ProjectsNavMenu";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setComposeEmail } from "@/Redux/Reducers/projectSlice/projectSlice";
import { LetterBoxNavType } from "@/Types/Projects/ProjectsType";

const ProjectsLeftSidebar: React.FC<LetterBoxNavType> = ({ navId, setNavId }) => {

  const {composeEmail} = useAppSelector((state)=>state.project);

  const dispatch = useAppDispatch();

  return (
    <div className="email-left-aside">
      <Card>
        <CardBody>
          <div className="email-app-sidebar">
            <Button color="primary" className="emailbox" onClick={()=>dispatch(setComposeEmail(!composeEmail))} >
              <i className="fa fa-plus"/>{'Ajouter Une Cathégorie'}
            </Button>
            <ProjectsNavMenu navId={navId} setNavId={setNavId} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectsLeftSidebar;
