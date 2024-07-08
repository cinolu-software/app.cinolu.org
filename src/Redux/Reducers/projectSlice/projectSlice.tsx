import { InboxEmailData } from '@/Data/Application/Projects';
import { InitialStateType } from '@/Types/Projects/ProjectsType';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, {apiBaseUrl} from "@/services/axios";


const initialState: InitialStateType = {
    modal : false,
    modalCreateCategory: false,
    faIcon :false,
    page : false,
    interviewEmail : false,
    inboxEmail : InboxEmailData,
    emailValidation: false,
};

export const fetchCategory = createAsyncThunk("", async () => {
    const response = await axios.get(`${apiBaseUrl}/categories`);
    return response.data;
});

const ProjectSlice = createSlice({

  name: "Project",
  initialState,

  reducers : {

    setModal:(state,action)=>{
        state.modal = action.payload;
    },

    setModalCreateCategory : (state, action) => {
        state.modalCreateCategory = action.payload;
      },

    handleEnvelope :(state,action) => {
        state.faIcon = action.payload
    },

    handleInterview: (state,action) => {
        state.interviewEmail = action.payload
    },

    setPage: (state,action) => {
        state.page = action.payload
    },

    removeItems: (state, action) => {
        state.inboxEmail = state.inboxEmail?.filter((data) => data.id !== action.payload);
    },

    addToFavorites :(state, action) => {
        if(action.payload.star === false){
            state.inboxEmail = state.inboxEmail.map((item)=>(item.id === action.payload.id) ? {...item,star:true}:item)
        }else{
            state.inboxEmail = state.inboxEmail.map((item)=>(item.id === action.payload.id) ? {...item,star:false}:item)
        }
    },

    removeFromFavorite : (state,action) => {
        state.inboxEmail = state.inboxEmail.map((data) => (data.id === action.payload.id ? { ...data, star: false } : data));
    },

    setEmailValidation: (state,action) => {
        state.emailValidation = action.payload
    },

    addNewEmail: (state, action) => {
        const emailTemp = {
          id: state.inboxEmail.length + 1,
          star: false,
          image: "14.png",
          color:"primary",
          name: action.payload.userEmail,
          message: action.payload.subject,
          subMessage:"craft beer labore wes anderson cred nesciunt sapiente ea proident...",
          time:"7:50 AM"
        };
        state.inboxEmail = [emailTemp, ...state.inboxEmail];
      },
  }

});

export const {setModal,setModalCreateCategory,setPage,handleEnvelope,handleInterview,removeItems,addToFavorites,removeFromFavorite,setEmailValidation,addNewEmail} = ProjectSlice.actions;

export default ProjectSlice.reducer;
