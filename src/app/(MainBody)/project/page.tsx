"use client";

import dynamic from 'next/dynamic';


const ProjectsListContainer = dynamic(() => import('@/Components/Applications/projects/'), {
    ssr: false
});

const Projects = () => {
    return (
        <ProjectsListContainer />
    );
};

export default Projects;