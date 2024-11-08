"use client";

import dynamic from 'next/dynamic';


const ProgramsCategoryListContainer = dynamic(() => import('@/Components/Applications/programsCategory'), {
    ssr: false
});

const ProgramsCategory = () => {
    return (
        <ProgramsCategoryListContainer />
    );
};

export default ProgramsCategory;