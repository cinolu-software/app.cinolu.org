import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance, {apiBaseUrl} from "@/services/axios";
import {
    CreateProgramType,
    FormValueType,
    InitialStateProgramsType,
    ReceiveProgramsType
} from "@/Types/Programs/ProgramsType";
import {RootState} from "@/Redux/Store";
import {ShowError} from "@/utils/MultiStepForm.service";



const initialState: InitialStateProgramsType = {
    originalProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgram: false,
    isOpenModalEditProgram: false,
    isOpenModalDeleteProgram: false,
    filterToggle: false,
    selectedProgram: null,
    programData: null,
    navId: 1,
    tabId: 1,
    formValue: {
        name: "",
        description: "",
        aim: "",
        prize: "",
        town: "",
        targeted_audience: '',
        started_at: "",
        ended_at: "",
        types: [],
        categories: [],
        partners: []
    },
    EditFormValue: {
        name: "",
        description: "",
        aim: "",
        prize: "",
        town: "",
        targeted_audience: '',
        started_at: "",
        ended_at: "",
        types: [],
        requirements: [],
        partners: []
    },
    numberLevel:1,
    showFinish:false
};


export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {
    const response = await axiosInstance.get<{ data: any }>(`${apiBaseUrl}/programs`);
    const originalPrograms = response.data.data.programs;
    return { original: originalPrograms };
});

export const fetchProgramById = createAsyncThunk<
    ReceiveProgramsType,
    string,
    { rejectValue: any }
>('programs/fetchProgramById', async (programId, thunkAPI) => {
    try {
        const response = await axiosInstance.get<{ data: ReceiveProgramsType }>(
            `${apiBaseUrl}/programs/${programId}`
        );
        return response.data.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const createProgram = createAsyncThunk<ReceiveProgramsType, CreateProgramType, { rejectValue: any }>(
    'programs/createProgram',
    async (newProgram, thunkAPI) => {
        try {
            const response = await axiosInstance.post<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs`, newProgram);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateProgram = createAsyncThunk<ReceiveProgramsType, { programId: string, updatedProgram: any }, { rejectValue: any }>(
    'programs/updateProgram',
    async ({ programId, updatedProgram }, thunkAPI) => {
        try {
            const response = await axiosInstance.patch<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs/${programId}`, updatedProgram);
            return response.data.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const deleteProgram = createAsyncThunk<{ id: string }, string, { rejectValue: any }>(
    'programs/deleteProgram',
    async (programId, thunkAPI) => {
        try {
            await axiosInstance.delete(`${apiBaseUrl}/programs/${programId}`);
            return { id: programId };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateAttachmentProgramImage = createAsyncThunk<
    { programId: string ; imageUrl: string },
    { programId: string; imageFile: File },
    { rejectValue: any }
>(
    'programs/updateAttachmentProgramImage',
    async ({ programId, imageFile }, thunkAPI) => {
        try {

            const formData = new FormData();
            formData.append('thumb', imageFile);

            const response = await axiosInstance.post<{ data: { image: string } }>(
                `${apiBaseUrl}/programs/image/${programId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            return { programId, imageUrl: response.data.data.image };

        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


const validateStep = (state: InitialStateProgramsType) => {
    const { name, description, town, aim, prize, started_at, ended_at, types, categories, partners, targeted_audience } = state.formValue;
    switch (state.numberLevel) {
        case 1:
            if (!name || !description || !targeted_audience || town || aim || prize) {
                ShowError();
                return false;
            }
            break;
        case 2:
            if (!name || !description || !targeted_audience || town || aim || prize || !started_at || !ended_at) {
                ShowError();
                return false;
            }
            break;
        case 3:
            if (!name || !description || !targeted_audience || town || aim || prize || !started_at || !ended_at || types.length === 0) {
                ShowError();
                return false;
            }
            break;
        case 4 :
            if (!name || !description || !targeted_audience || town || aim || prize || !started_at || !ended_at || types.length === 0 || categories.length === 0) {
                ShowError();
                return false;
            }
            break;

        case 5 :
            if (!name || !description || !targeted_audience || town || aim || prize || !started_at || !ended_at || types.length === 0 || categories.length === 0 || partners.length === 0) {
                ShowError();
                return false;
            }

            break;
    }
    return true;
};


const ProgramSlice = createSlice({
    name: "programs",
    initialState,
    reducers: {
        setSelectedProgram: (state, action: PayloadAction<{ program: ReceiveProgramsType | null }>) => {
            state.selectedProgram = action.payload.program;
            if (action.payload.program) {
                state.EditFormValue = {
                    name: action.payload.program.name,
                    description: action.payload.program.description,
                    targeted_audience: action.payload.program.targeted_audience,
                    started_at: action.payload.program.started_at,
                    ended_at: action.payload.program.ended_at,
                    types: action.payload.program.types || [],
                    categories: action.payload.program.categories || [],
                    partners: action.payload.program.partners || []
                };
            }
        },
        setModalCreateProgram: (state, action: PayloadAction<{ isOpen: boolean }>) => {
            state.isOpenModalCreateProgram = action.payload.isOpen;
        },
        setModalEditProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType | null }>) => {
            state.isOpenModalEditProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setModalDeleteProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType | null }>) => {
            state.isOpenModalDeleteProgram = action.payload.isOpen;
            state.selectedProgram = action.payload.program;
        },
        setNavId: (state, action: PayloadAction<number>) => {
            state.navId = action.payload;
        },
        setTabId: (state, action: PayloadAction<number>) => {
            state.tabId = action.payload;
        },
        setFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.formValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.formValue[action.payload.field] = action.payload.value;
            }
        },
        setEditFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            if (action.payload.field === 'types' && typeof action.payload.value === 'string') {
                //@ts-ignore
                state.EditFormValue.types = JSON.parse(action.payload.value).map((type: string) => parseInt(type));
            } else {
                //@ts-ignore
                state.EditFormValue[action.payload.field] = action.payload.value;
            }
        },setNewFormValue: (state, action: PayloadAction<{ field: keyof FormValueType, value: any }>) => {
            const { field, value } = action.payload;

            if (field === 'types' && typeof value === 'string') {
                state.formValue.types = JSON.parse(value).map((type: string) => parseInt(type));
            }

            else if (field === 'started_at' || field === 'ended_at') {
                state.formValue[field] = new Date(value).toISOString().split("T")[0];
            }

            else {
                state.formValue[field] = value;
            }
        },

        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },
        setShowFinish: (state,action) => {
            state.showFinish = action.payload
        },
        handleBackButton: (state) => {
            if (state.numberLevel > 1) {
                state.numberLevel--;
            }
        },
        handleNextButton: (state) => {
            const isValid = validateStep(state);
            if (isValid) {
                if (state.numberLevel < 6) {
                    state.numberLevel++;
                } else if( state.numberLevel === 6) {
                    state.showFinish = true;
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrograms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<{ original: ReceiveProgramsType[] }>) => {
                state.status = 'succeeded';
                state.originalProgramsData = action.payload.original;
            })
            .addCase(fetchPrograms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(createProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action: PayloadAction<ReceiveProgramsType>) => {
                state.status = 'succeeded';
                state.originalProgramsData.push(action.payload);
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateProgram.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProgram.fulfilled, (state, action: PayloadAction<ReceiveProgramsType>) => {
                state.status = 'succeeded';
                const updatedProgram = action.payload;
                const existingProgram = state.originalProgramsData.find((program) => program.id === updatedProgram.id);
                if (existingProgram) {
                    Object.assign(existingProgram, updatedProgram);
                }
            })
            .addCase(updateProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(deleteProgram.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProgram.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.status = 'succeeded';
                state.originalProgramsData = state.originalProgramsData.filter(
                    (program) => program.id !== action.payload.id
                );
            })
            .addCase(deleteProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateAttachmentProgramImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateAttachmentProgramImage.fulfilled, (state, action: PayloadAction<{ programId: string; imageUrl: string }>) => {
                state.status = 'succeeded';
                const program = state.originalProgramsData.find((program) => program.id === action.payload.programId);
                if (program) {
                    program.image = action.payload.imageUrl;
                }
            })
            .addCase(updateAttachmentProgramImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchProgramById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProgramById.fulfilled, (state, action: PayloadAction<ReceiveProgramsType>) => {
                state.status = 'succeeded';
                state.programData = action.payload;
            })
            .addCase(fetchProgramById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    }
});

export const {
    setModalCreateProgram,
    setModalEditProgram,
    setModalDeleteProgram,
    setNavId,
    setFormValue,
    setNewFormValue,
    setEditFormValue,
    setFilterToggle,
    setSelectedProgram,
    setShowFinish,
    handleBackButton,
    handleNextButton
} = ProgramSlice.actions;

export const selectSelectedProgram = (state: RootState) => state.programs.selectedProgram;
export default ProgramSlice.reducer;
