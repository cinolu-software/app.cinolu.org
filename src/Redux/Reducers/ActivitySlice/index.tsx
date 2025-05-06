import {createAsyncThunk, PayloadAction, createSlice} from "@reduxjs/toolkit";
import {formValueType, InitialStateActivityType} from "@/Types/ActivitiesTypes";
import axiosInstance, {apiBaseUrl} from "@/services/axios";

const initialState : InitialStateActivityType ={
    originalProjectData: [],
    publishedProjectData: [],
    status: "idle",
    addFormValue : {
        id: "",
        name: "",
        description: "",
        started_at: '',
        ended_at: '',
        program: '',
        categories: [],
        form: [],
        review_form: []
    },
    editFormValue : {
        id: "",
        name: "",
        description: "",
        started_at: '',
        ended_at: '',
        program: '',
        categories: [],
        form: [],
        review_form: []
    },
    numberLevel: 1,
    showFinish: false,
}

const ActivitySlice = createSlice({
    name: "ActivitySlice",
    initialState,
    reducers: {
        handleBackButton: (state, action) => {
            if(state.numberLevel > 1) {
                state.numberLevel--;
            }
        },
        handleNextButton: (state, action) => {
            state.numberLevel ++;
        },
        setAddFormValue: (state, action: PayloadAction<{field: keyof formValueType, value: any}>) => {
            const {field, value} = action.payload;
            if(field === "started_at" || field === "ended_at") {
                state.addFormValue[field] = new Date(value).toISOString().split("T")[0];
            }else{
                state.addFormValue[field] = value;
            }
        },
        resetForm: (state) => {
            state.addFormValue = {
                id: "",
                name: "",
                description: "",
                started_at: '',
                ended_at: '',
                program: '',
                categories: [],
                form: [],
                review_form: []
            };
            state.editFormValue = {
            id: "",
            name: "",
            description: "",
            started_at: '',
            ended_at: '',
            program: '',
            categories: [],
                form: [],
                review_form: []
            }
        }
    },
});

export const { handleBackButton, handleNextButton } = ActivitySlice.actions;

export default ActivitySlice.reducer;