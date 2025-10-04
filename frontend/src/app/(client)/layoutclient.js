
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import Navbar from "@/components/principal/Navbar";
import { useState } from "react";
import Filtrage from "@/components/principal/Filtrage";


import Panier from '../panier/page.jsx'


export default function RootClient({ children }) {
  const [displayfiltrage,setdisplay]=useState(false);
  const adjust=()=>{
    setdisplay(!displayfiltrage);
  }
 
  return (
    <html lang="en">
      <body className='flex flex-col'>
        <nav>
          <Navbar/>
        </nav>
         <main>
          {children}
         </main>
      </body>
    </html>
  );
}
