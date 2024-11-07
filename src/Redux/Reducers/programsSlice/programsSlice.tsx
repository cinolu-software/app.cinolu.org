import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, { apiBaseUrl, imageBaseUrl } from "@/services/axios";
import { CreateProgramType, FormValueType, InitialStateProgramsType, ReceiveProgramsType } from "@/Types/Programs/ProgramsType";
import { RootState } from "@/Redux/Store";
import { toast } from "react-toastify";

const initialState: InitialStateProgramsType = {
    originalProgramsData: [],
    status: "idle",
    error: null,
    isOpenModalCreateProgram: false,
    isOpenModalEditProgram: false,
    isOpenModalDeleteProgram: false,
    filterToggle: false,
    selectedProgram: null,
    navId: 1,
    tabId: 1,
    formValue: {
        name: "",
        description: "",
        started_at: "",
        ended_at: "",
        types: [],
        requirements: [],
        partners: []
    },
    EditFormValue: {
        name: "",
        description: "",
        started_at: "",
        ended_at: "",
        types: [],
        requirements: [],
        partners: []
    },
    numberLevel:1,
    basicInputFormValue: { email: "", firstName: "", password: "", confirmPassword: "", agreeTerms: false, placeHolderName: "", cardNumber: "", expiration: "", cvvNumber: "", uploadDocumentation: "", informationCheckBox: false, linkedInLink: "", gitHubLink: "", giveFeedBack: "", state: "", agreeConditions: false },
    showFinish:false
};

const ShowError = () => {
    return toast.error("Please fill all field after press next button");
};

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {
    const response = await axiosInstance.get<{ data: any }>(`${apiBaseUrl}/programs`);
    const originalPrograms = response.data.data.programs;
    return { original: originalPrograms };
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
                    started_at: action.payload.program.started_at,
                    ended_at: action.payload.program.ended_at,
                    types: action.payload.program.types || [],
                    requirements: action.payload.program.requirements || [],
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
        },
        setFilterToggle: (state) => {
            state.filterToggle = !state.filterToggle;
        },


        setBasicInputFormValue: (state,action) => {
            state.basicInputFormValue = action.payload
        },
        setShowFinish: (state,action) => {
            state.showFinish = action.payload
        },
        handleBackButton: (state) => {
            state.showFinish = false
            if (state.numberLevel === 2) {
                state.numberLevel = state.numberLevel - 1
            };
            if (state.numberLevel === 3) {
                state.numberLevel = state.numberLevel - 1
            };
            if (state.numberLevel === 4) {
                state.numberLevel = state.numberLevel - 1
            };
        },
        handleNextButton: (state) => {
            if (state.basicInputFormValue.email !== "" && state.basicInputFormValue.firstName !== "" && state.basicInputFormValue.password !== "" && state.basicInputFormValue.confirmPassword !== "" && state.basicInputFormValue.agreeTerms && state.numberLevel === 1) {
                state.numberLevel = 2
            } else if (state.basicInputFormValue.placeHolderName !== "" && state.basicInputFormValue.cardNumber !== "" && state.basicInputFormValue.expiration !== "" && state.basicInputFormValue.cvvNumber !== "" && state.basicInputFormValue.informationCheckBox && state.basicInputFormValue.uploadDocumentation !== "" && state.numberLevel === 2) {
                state.numberLevel = 3
            }
            else if (state.basicInputFormValue.linkedInLink !== "" && state.basicInputFormValue.gitHubLink !== "" && state.basicInputFormValue.giveFeedBack !== "" && state.basicInputFormValue.state !== "" && state.basicInputFormValue.agreeConditions && state.numberLevel === 3) {
                state.numberLevel = 4
                state.showFinish = true
            } else {
                ShowError();
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
            });
    }
});

export const { setModalCreateProgram,
               setModalEditProgram,
               setModalDeleteProgram,
    setNavId, setTabId, setFormValue, setEditFormValue, setFilterToggle, setSelectedProgram, setBasicInputFormValue,setShowFinish,handleBackButton,handleNextButton } = ProgramSlice.actions;
export const selectSelectedProgram = (state: RootState) => state.programs.selectedProgram;
export default ProgramSlice.reducer;
