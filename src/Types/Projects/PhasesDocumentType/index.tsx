export interface DocumentType {
    title: string;
    description: string;
    file_name: string;
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface createDocumentType {
    title: string;
    description: string;
    phase: string;
}

export interface InitialStateDocumentType {
    documentData: DocumentType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    formValue: createDocumentType;
    selectedDocument: createDocumentType | null;
}