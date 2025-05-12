import React from 'react';
import { Tabs } from "@chakra-ui/react";
import ProjectTabsContent from "@/Components/Applications/projects/Tabs";
import PublishedProjectListContainer from "@/Components/Applications/projects/published";
import ProjectListContainer from "@/Components/Applications/projects/all";

const ProjectsListContainer = () => {

    return (
        <Tabs.Root defaultValue="published" variant='plain' bg={'cyan.contrast'} className={'p-5 rounded'} >
            <ProjectTabsContent/>
            <Tabs.Content value="projects">
                <PublishedProjectListContainer/>
            </Tabs.Content>
            <Tabs.Content value="published">
                <ProjectListContainer/>
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default ProjectsListContainer;