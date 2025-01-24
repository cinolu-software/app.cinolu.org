import {ReceiveProjectType} from "@/Types/Projects/ProjectType";
import {User} from "@/Types/AuthType"

export interface ApplicationPhaseType {
    id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    answers: object;
    project: ReceiveProjectType;
    applicant: User;
}

export interface InitialStateApplicationPhaseType{
    ApplicationPhaseData : ApplicationPhaseType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

