
"use client";


import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const  AuthContext=createContext();
export default function Authprovider({children}){
    const [token,Settoken]=useState(null);
    const [isadmin,Setisadmin]=useState(false);
   const [isloading,Setisloading]=useState(true);
   const [iserror,Seterror]=useState(null);

   useEffect(()=>{
      const storedtoken=localStorage.getItem('token');
      if(storedtoken){
        try {
        checkadmin(storedtoken);
        Settoken(storedtoken);
        } catch (error) {
            Seterror('erorr token invalid ou expiré');
            localStorage.removeItem('token');
            logout();
        }
      }
      Setisloading(false);
   },[]);
   const login=(newtoken)=>{
    try{
     localStorage.setItem('token',newtoken);
     Settoken(newtoken);
     checkadmin(newtoken);
    }catch (erorr){
     Seterror(erorr);
    }
   }

   const logout=()=>{
    localStorage.removeItem('token')
    Settoken(null);
    Seterror(null);
    Setisadmin(false);
   }


   const checkadmin=(token)=>{
    try {
        const decoded=jwtDecode(token);
        Setisadmin(decoded.role==='admin');
    } catch (error) {
        Seterror('impossible de decoder le token');
        Setisadmin(false);

        
    }
   }

    return(
        <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isadmin,
        isAuthenticated: !!token,
        isloading,
        iserror,
      }}
    >
      {children}
    </AuthContext.Provider>
    )
}