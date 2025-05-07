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
        review_form: [],
        partners: []
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
        review_form: [],
        partners: []
    },
    numberLevel: 1,
    showFinish: false,
}

const ActivitySlice = createSlice({
    name: "ActivitySlice",
    initialState,
    reducers: {

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
                review_form: [],
                partners: []
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
                review_form: [],
                partners:[]
            }
        },
        setFormField: (state, action: PayloadAction<{ form?: any, curationForm?: any }>) => {
            if (action.payload.form !== undefined) {
                state.addFormValue.form = action.payload.form;
            }
            if (action.payload.curationForm !== undefined) {
                state.addFormValue.review_form = action.payload.curationForm;
            }
        },
    },
});

export const { setAddFormValue, setFormField, resetForm } = ActivitySlice.actions;

export default ActivitySlice.reducer;