import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name:null,
    age:null,
    city:null,
    state:null,
    number:null,
    birthday:null,
    gender:null,
    photo:null,
    about:null,
    chats:[],
    hearts:[],
    password:null,
    id:null,
    profession:null,
    code:null,
    numberR:null,
    type:null,
    msgR:null,
    replyR:null
}

export const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        setUser:(state,action) => {

            state.name=action.payload.name;
            state.age=action.payload.age;
            state.city=action.payload.city;
            state.state=action.payload.state;
            state.number=action.payload.mobileNumber;
            state.gender=action.payload.gender;
            state.photo=action.payload.photo;
            state.about=action.payload.about;
            state.chats=action.payload.chats;
            state.password=action.payload.password;
            state.id=action.payload._id;
            state.profession=action.payload.profession;
            state.code= action.payload.code;
            state.numberR=action.payload.numberR;
            state.msgR=action.payload.msgR;
            state.replyR = action.payload.replyR

        },
        updateProfile:(state,action) => {
            state.name=action.payload.name;
            state.city=action.payload.city;
            state.state = action.payload.state;
            state.profession = action.payload.profession;
            state.about = action.payload.about;
            state.gender=action.payload.gender;
            state.password = action.payload.password;
        },
        logout:(state,action) => {
            state=initialState;
        }
    }
});

export const {setUser,updateProfile,logout} = userSlice.actions;

export const selectUser = (state) => state;
export const selectChats = (state) => state.chats;

export default userSlice.reducer;
