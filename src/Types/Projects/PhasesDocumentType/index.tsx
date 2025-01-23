export interface DocumentType {
    title: string;
    description: string;
    file_name: string;
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface CreateDocumentType {
    title: string;
    description: string;
    phase: string;
}

export interface FormValue extends CreateDocumentType {
    file_name: File | null;
}

export interface ReceiveFile {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    title: string;
    description: string;
    file_name: string
}

export interface AddFileType {
    documentId: string;
    file: File
}

export interface InitialStateDocumentType {
    documentData: DocumentType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    formValue: FormValue;
    selectedDocument: CreateDocumentType | null;
    navId: number;
    tabId: number
}