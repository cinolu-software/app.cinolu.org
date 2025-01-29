"use client";

import dynamic from 'next/dynamic';

const ProjectsTypesListContainer = dynamic(() => import('@/Components/Applications/projectTypes'), {
    ssr: false
});

const ProjectType = () => {
    return (
        <ProjectsTypesListContainer />
    );
};

export default ProjectType;