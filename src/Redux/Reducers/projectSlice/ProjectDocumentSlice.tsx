import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {InitialStateDocumentType, createDocumentType, DocumentType} from "@/Types/Projects/PhasesDocumentType";

const initialState: InitialStateDocumentType = {
    documentData: [],
    status: 'idle',
    error: null,
    formValue: {
        title: '',
        description: '',
        phase: ''
    },
    selectedDocument: null
}

export const fetchDocument = createAsyncThunk('project/fetchDocument', async () => {
    const response = await axiosInstance.get<{data: DocumentType[]}>(`${apiBaseUrl}/phase-documents`);
    return {data : response.data.data}
});

export const fetchDocumentById = createAsyncThunk('project/fetchDocumentById', async (id: string) => {
    const response = await axiosInstance.get<{data: DocumentType}>(`${apiBaseUrl}/phase-documents/${id}`);
    return response.data.data;
});

export const createDocument = createAsyncThunk('project/createDocument', async(newDocument: createDocumentType)=>{
    try{
        const response = await axiosInstance.post<{data: DocumentType}>(`${apiBaseUrl}/phase-documents`, newDocument);
        return response.data.data;
    }catch(err: any){
        return "Erreur survenue lors de la création du document"
    }
});

export const updateDocument = createAsyncThunk('project/updateDocument', async (updatedDocument: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch<{ data: DocumentType }>(
                `${apiBaseUrl}/phase-documents/${updatedDocument.id}`,
                updatedDocument
            );
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue("Erreur survenue lors de la mise à jour du document");
        }
    }
);

export const deleteDocument = createAsyncThunk('project/deleteDocument', async (id: string, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/phase-documents/${id}`);
            return id;
        } catch (err: any) {
            return rejectWithValue("Erreur survenue lors de la suppression du document");
        }
    }
);

const projectDocumentSlice = createSlice({
    name: 'projectDocument',
    initialState,
    reducers: {
        setFormValue: (state, action: PayloadAction<createDocumentType>) => {
            state.formValue = action.payload;
        },
        setSelectedDocument: (state, action: PayloadAction<DocumentType>) => {
            state.selectedDocument = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocument.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchDocument.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.documentData = action.payload.data;
        });
        builder.addCase(fetchDocument.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(fetchDocumentById.fulfilled, (state, action) => {
            state.selectedDocument = action.payload;
        });
        builder.addCase(createDocument.fulfilled, (state, action) => {
            state.documentData.push(action.payload);
        });
        builder.addCase(updateDocument.fulfilled, (state, action) => {
            const newDocument = action.payload;
            const existingDocument = state.documentData.find((document) => document.id === newDocument.id);
            if (existingDocument) {
                existingDocument.title = newDocument.title;
                existingDocument.description = newDocument.description;
                existingDocument.file_name = newDocument.file_name;
                existingDocument.updated_at = newDocument.updated_at;
            }
        });
        builder.addCase(deleteDocument.fulfilled, (state, action) => {
            const documentId = action.payload;
            state.documentData = state.documentData.filter((document) => document.id !== documentId);
        });
    }
});

