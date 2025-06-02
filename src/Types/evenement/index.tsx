
export interface formValueType {
    name: string,
    description: string,
    location: string,
    link: string,
    started_at: string,
    ended_at: string,
    program: string,
    categories: string[],
    responsible: string
}

export type CategorieEvenement = {
    id: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    name: string
}

export type ProgrammeEvenement = {
    id: string,
    name: string,
    description: string,
    created_at: string,
    updated_at: string
}

export interface EvenementType {
    id: string,
    name: string,
    image: string,
    slug: string,
    description: string,
    location: string,
    is_published: boolean,
    link: string,
    started_at: string,
    ended_at: string,
    program: ProgrammeEvenement,
    categories: CategorieEvenement[],
    responsible: string
}

export interface InitialStateEvenementType {
    originalProjectData : EvenementType[];
    publishedProjectData : EvenementType[];
    isOpenModalCreateEvenement : boolean;
    isOpenModalDeleteEvenement : boolean;
    isOpenModalEditEvenement : boolean;
    filterToggle: boolean;
    selectedEvenement: EvenementType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    statusFetchPublishedEvenements : 'idle' | 'loading' | 'succeeded' | 'failed';
    statusFetchEvenementById: 'idle' | 'loading' | 'succeeded' | 'failed';
    addFormValue: formValueType;
    editFormValue: formValueType;
    numberLevel: number;
    showFinish: boolean;
    error: null;
}





