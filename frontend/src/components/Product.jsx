"use client";

import { useState } from "react";
import { FaStarHalfStroke } from "react-icons/fa6";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import photo from '../assets/images/Paste image.png'
import { TbPhotoStar } from "react-icons/tb";
import Image from "next/image";

export default function Product(){
 
     const renderstar=(index)=>{
            if(rating>=index+1){
             return(
                <IoStarSharp size={25}/>
             )
            }else if(rating>=index+0.5){
            return(<FaStarHalfStroke size={25}/>)
            }else{
              return(
                <IoStarOutline size={25}/>
              )
            }
        }
        const[rating,Setrating]=useState(0);
            const handrating=(index,e)=>{
                const {left,width}=e.currentTarget.getBoundingClientRect();
                const clickx=e.clientX-left;
                const isleft=clickx<width/2;
                let newrating=isleft?index+0.5:index+1;
        
                if(newrating===rating){
                    newrating=0;
                }
                Setrating(newrating);
            }
    return(
        <div className="grid grid-cols-[repeat(2,300px)] grid-rows-auto p-[14%]">
            
            <div className="flex flex-col p-[20px] gap-[20px] bg-amber-400 rounded-[20px]">
                <Image src={photo} width={300} height={300} className="md:w-[200px] md:h-[200px]" />
                <div className="flex flex-col gap-[12px]">
                      <div className="flex gap-[10px]">
                         {[0, 1, 2, 3, 4].map((i) => (
                 <div
                    key={i}
                     onClick={(e) => handrating(i, e)}
                     style={{ cursor: "pointer" }}
                       >
                    {renderstar(i)}
                   </div>
                          ))}
                </div>
                    <div className="flex flex-col gap-[12px] bg-amber-200 p-[17px] rounded-[20px]">
                        <h1 className="text-[20px] font-bold">Dior</h1>
                        <h2 className="text-[20px] font-bold">name</h2>
                        <h4 className="text-[21px] text-white font-bold">299$</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}