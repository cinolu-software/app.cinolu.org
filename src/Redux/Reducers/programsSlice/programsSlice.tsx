import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios ,{apiBaseUrl, imageBaseUrl} from "@/services/axios";
import {CreateProgramType, FormValueType, InitialStateProgramsType, ReceiveProgramsType,} from "@/Types/Programs/ProgramsType";
import {RootState} from "@/Redux/Store";


const initialState: InitialStateProgramsType = {

    originalProgramsData: [],

    status: "idle",

    error: null,

    isOpenModalCreateProgram: false,

    isOpenModalEditProgram: false,

    isOpenModalDeleteProgram: false,

    selectedProgram: null,

    navId: 1,

    tabId: 1,

    formValue: {

        name: "",

        description: "",

        start_at: "",

        end_at: "",

        types: [],

        requirements: []
    },
    EditFormValue:{
        name: "",

        description: "",

        start_at: "",

        end_at: "",

        types: [],

        requirements: []

    }
};

const transformPrograms = (programs: ReceiveProgramsType[]): ReceiveProgramsType[] => {
    return programs.map((program) => {
        if (program.attachments.length > 0) {
            const image = program.attachments[0].name;
            if (image) {
                return {
                    ...program,
                    image: `${imageBaseUrl}/attachments/${image}`
                };
            }
        }
        return {
            ...program,
            image: "/assets/images/programs/programs.png"
        };
    });
};

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {

        const response = await axios.get<{ data: ReceiveProgramsType[] }>(`${apiBaseUrl}/programs`);

        const originalPrograms = response.data.data;

        const transformedPrograms = transformPrograms(originalPrograms);

        return { original: transformedPrograms };

    }
);

export const createProgram = createAsyncThunk<ReceiveProgramsType, CreateProgramType, { rejectValue: any }>('programs/createProgram', async (newProgram, thunkAPI) => {

    try {
            const response = await axios.post<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs`, newProgram);

            return response.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const uploadProgramImage = createAsyncThunk<void, { programId: number | undefined, imageFile: File }, {rejectValue: any}>('programs/uploadProgramImage', async ({ programId, imageFile }, { rejectWithValue }) => {

        const formData = new FormData();

        formData.append('attachment', imageFile);

        try {
            await axios.post(`${apiBaseUrl}/programs/attachment/${programId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err: any) {

            return rejectWithValue(err.response.data);

        }
    }
);

export const updateProgram = createAsyncThunk<ReceiveProgramsType, { programId: number, updatedProgram: CreateProgramType }, { rejectValue: any }>('programs/updateProgram', async ({ programId, updatedProgram }, thunkAPI) => {

        try {
            const response = await axios.put<{ data: ReceiveProgramsType }>(`${apiBaseUrl}/programs/${programId}`, updatedProgram);

            return response.data.data;

        } catch (err: any) {

            return thunkAPI.rejectWithValue(err.response.data);

        }

    }
);

const ProgramSlice = createSlice({

    name: "programs",

    initialState,

    reducers: {

        setModalCreateProgram: (state, action: PayloadAction<{ isOpen: boolean }>) => {

            state.isOpenModalCreateProgram = action.payload.isOpen;

        },

        setModalEditProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType | null }>) => {

            state.isOpenModalEditProgram = action.payload.isOpen;

            state.selectedProgram = action.payload.program;

        },

        setModalDeleteProgram: (state, action: PayloadAction<{ isOpen: boolean, program: ReceiveProgramsType }>) => {

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
        }

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



            .addCase(uploadProgramImage.pending, (state) => {

                state.status = 'loading';

                state.error = null;

            })
            .addCase(uploadProgramImage.fulfilled, (state) => {

                state.status = 'succeeded';

            })
            .addCase(uploadProgramImage.rejected, (state, action) => {

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

            });


    }
});

export const {setModalCreateProgram, setModalEditProgram, setModalDeleteProgram, setNavId, setTabId, setFormValue, setEditFormValue} = ProgramSlice.actions;

export const selectSelectedProgram = (state: RootState) => state.programs.selectedProgram;

export default ProgramSlice.reducer;
