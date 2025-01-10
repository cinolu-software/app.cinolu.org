"use client";

import dynamic from 'next/dynamic';


const ProjectsCategoryListContainer = dynamic(() => import('@/Components/Applications/projectCategory'), {
    ssr: false
});

const ProjectsCategory = () => {
    return (
        <ProjectsCategoryListContainer />
    );
};

export default ProjectsCategory;