import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance, { apiBaseUrl } from "@/services/axios";
import { InitialStateDocumentType, CreateDocumentType, DocumentType, ReceiveFile, AddFileType } from "@/Types/Projects/PhasesDocumentType";


const initialState: InitialStateDocumentType = {
    documentData: [],
    status: 'idle',
    error: null,
    formValue: {
        title: '',
        description: '',
        phase: '',
    },
    selectedDocument: null,
};

export const fetchDocument = createAsyncThunk('project/fetchDocument', async () => {
    const response = await axiosInstance.get<{ data: DocumentType[] }>(`${apiBaseUrl}/phase-documents`);
    return response.data.data;
});

export const fetchDocumentById = createAsyncThunk('project/fetchDocumentById', async (id: string) => {
    const response = await axiosInstance.get<{ data: DocumentType }>(`${apiBaseUrl}/phase-documents/${id}`);
    return response.data.data;
});

export const createDocument = createAsyncThunk('project/createDocument', async (newDocument: CreateDocumentType, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post<{ data: DocumentType }>(`${apiBaseUrl}/phase-documents`, newDocument);
        return response.data.data;
    } catch (err: any) {
        return rejectWithValue("Erreur survenue lors de la création du document");
    }
});

export const updateDocument = createAsyncThunk('project/updateDocument', async (updatedDocument: Partial<DocumentType>, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch<{ data: DocumentType }>(
            `${apiBaseUrl}/phase-documents/${updatedDocument.id}`,
            updatedDocument
        );
        return response.data.data;
    } catch (err: any) {
        return rejectWithValue("Erreur survenue lors de la mise à jour du document");
    }
});

export const deleteDocument = createAsyncThunk('project/deleteDocument', async (id: string, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`${apiBaseUrl}/phase-documents/${id}`);
        return id;
    } catch (err: any) {
        return rejectWithValue("Erreur survenue lors de la suppression du document");
    }
});


export const addAttachmentDocumentFile = createAsyncThunk<
    ReceiveFile,
    AddFileType,
    { rejectValue: string }
>(
    'project/addAttachmentDocumentFile',
    async ({ documentId, file }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append('document', file);

            const response = await axiosInstance.post<{ data: ReceiveFile }>(
                `${apiBaseUrl}/phase-documents/document/${documentId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            return response.data.data;
        } catch (e: any) {

            if (e.response?.data?.message) {
                return thunkAPI.rejectWithValue(e.response.data.message);
            }
            return thunkAPI.rejectWithValue("Une erreur inconnue est survenue");
        }
    }
);

const projectDocumentSlice = createSlice({
    name: 'projectDocument',
    initialState,
    reducers: {
        setFormValue: (state, action: PayloadAction<CreateDocumentType>) => {
            state.formValue = action.payload;
        },
        setSelectedDocument: (state, action: PayloadAction<DocumentType | null>) => {
            state.selectedDocument = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocument.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDocument.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.documentData = action.payload;
            })
            .addCase(fetchDocument.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchDocumentById.fulfilled, (state, action) => {
                state.selectedDocument = action.payload;
            })
            .addCase(createDocument.fulfilled, (state, action) => {
                state.documentData.push(action.payload);
            })
            .addCase(createDocument.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateDocument.fulfilled, (state, action) => {
                const updatedDocument = action.payload;
                const index = state.documentData.findIndex((doc) => doc.id === updatedDocument.id);
                if (index !== -1) {
                    state.documentData[index] = updatedDocument;
                }
            })
            .addCase(updateDocument.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                const documentId = action.payload;
                state.documentData = state.documentData.filter((doc) => doc.id !== documentId);
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setFormValue, setSelectedDocument } = projectDocumentSlice.actions;
export default projectDocumentSlice.reducer;


