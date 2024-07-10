import {useEffect} from "react";
import SVG from "@/CommonComponent/SVG";
import { LetterBoxSidebar } from "@/Data/Application/Projects";
import { useAppSelector } from "@/Redux/Hooks";
import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import { ProjectBoxNavType } from "@/Types/Projects/ProjectsType";
import {selectTransformedCategoryData, selectCategoryStatus, selectOriginalCategoryData, fetchCategory} from "@/Redux/Reducers/projectSlice/projectCategorySlice";
import {useSelector, useDispatch} from "react-redux";


const ProjectsNavMenu: React.FC<ProjectBoxNavType> = ({ navId, setNavId }) => {

  const {inboxEmail} = useAppSelector((state)=>state.letterBox);

  const transformedCategoryData = useSelector(selectTransformedCategoryData);
  const dispatch = useDispatch();

  const status = useSelector(selectCategoryStatus);

  let starBadges = inboxEmail.filter((data)=> data.star === true && 1);

  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchCategory())
    }
  }, [])

  console.log(inboxEmail)

  return (

    <Nav pills tabs className="main-menu email-category border-0">
      {transformedCategoryData.map((data, i) => (
        <NavItem key={i}>
          <NavLink className={`border-0 ${navId === data.id ? "active" : ""}`} onClick={() => setNavId(data.id)}>
            <SVG className={`stroke-icon ${data.color ? `stroke-${data.color}` : ""}`} iconId={data.icon} />
            <div>
              {data.title}
              {data.badge && <Badge color="light-primary">{data.title === 'L-Impact' ? inboxEmail.length : starBadges.length}</Badge>}
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );

};

export default ProjectsNavMenu;

