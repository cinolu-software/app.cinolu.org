"use client";

import dynamic from 'next/dynamic';


const ProgramsListContainer = dynamic(() => import('@/Components/Applications/programs/'), {
    ssr: false
});

const Programs = () => {
    return (
        <ProgramsListContainer />
    );
};

export default Programs;