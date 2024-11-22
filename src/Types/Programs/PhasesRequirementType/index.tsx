
export interface RequirementType {
    id?: string;
    name: string;
    description: string;
    phase: string;
}


export interface CreateRequirementType {
    name: string;
    description: string;
}


export interface UpdateRequirementType {
    id: string;
    name?: string;
    description?: string;
    phase?: string;
}


export type CreateRequirementPayloadType = {
    phase: string;
    requirements: CreateRequirementType[];
};



export interface InitialStateRequirementType {
    RequirementData: RequirementType[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    formValue: CreateRequirementType;
    isOpenModalCreateRequirement: boolean;
    isOpenModalEditRequirement: boolean;
    isOpenModalDeleteRequirement: boolean;
    selectedRequirement: RequirementType | null;
}
