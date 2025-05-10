import React from 'react';
import { Tabs } from "@chakra-ui/react";
import ProjectTabsContent from "@/Components/Applications/projects/Tabs";
// import PublishedProjectListContainer from "@/Components/Applications/projects/published";
import ProjectListContainer from "@/Components/Applications/projects/all";
import GridExample from "@/Components/Applications/projects/published";

const ProjectsListContainer = () => {

    return (
        <Tabs.Root defaultValue="projects" variant="plain" >
            <ProjectTabsContent/>
            <Tabs.Content value="projects">
                <GridExample/>
            </Tabs.Content>
            <Tabs.Content value="published">
                {/*<ProjectListContainer/>*/}
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default ProjectsListContainer;

