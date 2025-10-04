"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import productReducer from './productslice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    Product:productReducer,
  },
});
