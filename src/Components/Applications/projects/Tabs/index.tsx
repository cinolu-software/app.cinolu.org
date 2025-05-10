import {Tabs} from "@chakra-ui/react";
import {LuFolders, LuFolderClock} from "react-icons/lu"



const ProjectTabsContent = () => {


    return(
        <Tabs.List rounded="l3" p="1" >
            <Tabs.Trigger value="projects">
                <LuFolders/>
                Activités
            </Tabs.Trigger>
            <Tabs.Trigger value="published">
                <LuFolderClock/>
                Publiées
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" bg={'teal.700'} />
        </Tabs.List>
    )

}

export default ProjectTabsContent;