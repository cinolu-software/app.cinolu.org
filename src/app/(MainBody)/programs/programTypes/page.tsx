"use client";

import dynamic from 'next/dynamic';


const ProgramsTypesListContainer = dynamic(() => import('@/Components/Applications/programsTypes'), {
    ssr: false
});

const Programs = () => {
    return (
        <ProgramsTypesListContainer />
    );
};

export default Programs;