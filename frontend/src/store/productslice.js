import { createSlice } from "@reduxjs/toolkit";
import { set } from "zod";

const initialState={
    products:[],
    productdetail:null,
}


const productslice=createSlice({
    name:'product',
    initialState,
    reducers:{
        Setproduct:(state,action)=>{
     state.products=action.payload
    },
    Setproductdetail:(state,action)=>{
        state.productdetail=action.payload
    }
    }
})

export const {Setproduct,Setproductdetail}=productslice.actions;

export default productslice.reducer;