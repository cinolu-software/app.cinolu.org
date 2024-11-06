"use client";

import dynamic from 'next/dynamic';


const ProgramsTypesListContainer = dynamic(() => import('@/Components/Applications/programsTypes'), {
    ssr: false
});

const ProgramsCategory = () => {
    return (
        <ProgramsTypesListContainer />
    );
};

export default ProgramsCategory;