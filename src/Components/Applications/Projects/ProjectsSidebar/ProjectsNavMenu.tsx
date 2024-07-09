import SVG from "@/CommonComponent/SVG";
import { LetterBoxSidebar } from "@/Data/Application/Projects";
import { useAppSelector } from "@/Redux/Hooks";
import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import { LetterBoxNavType } from "@/Types/Projects/ProjectsType";

const ProjectsNavMenu: React.FC<LetterBoxNavType> = ({ navId, setNavId }) => {

  const {inboxEmail} = useAppSelector((state)=>state.letterBox);
  let starBadges = inboxEmail.filter((data)=> data.star === true && 1);

  return (
    <Nav pills tabs className="main-menu email-category border-0">
      {LetterBoxSidebar.map((data, i) => (
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

