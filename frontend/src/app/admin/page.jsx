"use client"

import { AuthContext } from "@/contexts/usercontext";
import { useContext, useState } from "react"


export default function Page(){
    const {token,logout,isadmin,isAuthenticated,isloading,iserror}=useContext(AuthContext)
   if (isloading) return <p>Chargement...</p>;
  if (iserror) return <p style={{color:"red"}}>{iserror}</p>;
    return (
        <div className="flex flex-col gap-[20px] p-[30px] items-center bg-gray-200 rounded-[10px] justify   -center">
            <div className="h-[400px] items-center justify-center">
            {isAuthenticated?(
              <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="name" className="font-bold text-[20px]">
                Name
                </label>
                <input type="text" placeholder="Name..." className="border-2 rounded-[10px] border-gray-400  p-[15px] w-[300px]"/>
             </div>
             <div className="flex flex-col gap-[12px]">
                <label htmlFor="email" className="font-bold text-[20px]">
                Email
                </label>
                <input type="text" placeholder="Email..." className="border-2 rounded-[10px]  border-gray-400  p-[15px] w-[300px]"/>
             </div>
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="password" className="font-bold text-[20px]">
                Password
                </label>
                <input type="text" placeholder="Passoword..." className="border-2 border-gray-400 rounded-[10px] p-[15px] w-[300px]"/>
             </div>
            </div>
            ):( <div className="flex flex-col gap-[20px] translate-y-[80px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[12px]">
                    <label htmlFor="email" className="font-bold text-[20px]">
                     Email
                    </label>
                   <input type="text" placeholder="Email..." className="p-[15px] border-2 border-gray-400 rounded-[20px] w-[300px]"/>
                </div>
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="password" className="font-bold text-[20px]">
                Password
                </label>
                <input type="text" placeholder="Passoword..." className="p-[15px] border-2 border-gray-400 rounded-[20px] w-[300px]"/>
             </div>
             </div>
            </div>)}
            </div>
            <div className="">
                <input type="button" value='following' onClick={()=>click()} className="bg-white rounded-[20px] p-[15px] text-[20px] font-bold"/>
            </div>
        </div>
    )
}