import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

Setcart:(state,action)=>{
    const item=action.payload;
    const exist=state.cart.find((p)=>p._id ===item._id);
    if(exist){
      exist.quantity+=item.quantity;
    }else{
      state.cart.push(item);
    }
},
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const selectCartItems = (state) => state.cart.cart;
export const selectCartCount = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);
export const { Setcart,addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
