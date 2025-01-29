import {TabPane} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";


const ProjectIndicator = () => {

    const dispatch = useAppDispatch();
    const { selectedProject } = useAppSelector(state => state.project)

    console.log(selectedProject);

    return (
        <TabPane tabId={'3'}>
            <h1>Indicateur du projet</h1>
        </TabPane>
    )
}

export default  ProjectIndicator;