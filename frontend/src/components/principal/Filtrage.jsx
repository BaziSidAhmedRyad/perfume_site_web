'use client'
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
export default function filtrage(){
    const [open,Setopen]=useState(true);
     const [opentwo,Setopentwo]=useState(true);
      const [openthree,Setopenthree]=useState(true);
       const [openfoor,Setopenfoor]=useState(true);
    const categories = ["Parfum floral", "Parfum boisé", "Parfum citronné"];
const weather = ["Soleil", "Pluie", "Neige"];
const season = ["Été", "Hiver", "Automne", "Printemps"];
const gouts = ["Citron", "Vanille", "Lavande"];
const change =()=>{
    Setopen(!open);
}
const change2=()=>{
    Setopentwo(!opentwo);
}
const change3=()=>{
    Setopenthree(!openthree);
}
const change4=()=>{
    Setopenfoor(!openfoor);
}
    return(
        <div className="flex flex-col  ml-[43px] md:ml-[90px] gap-[200px] h-auto md:h-[1100px] bg-gray-100 rounded-[20px] md:w-[75%] w-[76%] p-[60px]">
            <div className="flex relative w-[130px]">
                <p className="font-bold">Parfumes</p>
                <div className="absolute top-0 right-[30px]">
                {
                    open ? (
                        <div>
                            <IoIosArrowDropup  onClick={()=>change()} size={25}/>
                        </div>
                    ):(
                        <div>
                            <IoIosArrowDropdown  onClick={()=>change()} size={25}/>
                        </div>
                    )
                }
             </div>
               
                    {open&&(
                        <div className="absolute top-[40px] left-[-10px] flex flex-col w-[200px] p-[10px] gap-[10px] bg-white rounded-[20px]">
                          { categories.map((item,index)=>
                           (
                            <div key={index} className="flex gap-[10px]">
                                <input type='checkbox' />
                               <p className="font-semibold">{item}</p>
                            </div>
                           ))}
                        </div>
                    )
                    }
          </div>
            <div className="flex relative w-[130px]">
             <p className="font-bold">weather</p>
             <div className="absolute top-0 right-[40px]">
                {
                    opentwo ? (
                        <div>
                            <IoIosArrowDropup  onClick={()=>change2()} size={25}/>
                        </div>
                    ):(
                        <div>
                            <IoIosArrowDropdown  onClick={()=>change2()} size={25}/>
                        </div>
                    )
                }
             </div>
           
               
             
                    { opentwo&&(
                           <div className="absolute top-[40px] left-[-10px] flex flex-col w-[200px] p-[10px] gap-[10px] bg-white rounded-[20px]">
                            {weather.map((item,index)=>(
                             <div key={index} className="flex gap-[10px]">
                                <input type='checkbox' />
                              <p className="font-semibold">{item}</p>
                             </div>
                            ))
                            }
                            </div>
                    )
                     }
                
               
             
            </div>
              <div className="flex relative w-[130px]">
             <p className="font-bold">season</p>
             <div className="absolute top-0 right-[45px]">
                {
                    openthree ? (
                        <div>
                            <IoIosArrowDropup  onClick={()=>change3()} size={25}/>
                        </div>
                    ):(
                        <div>
                            <IoIosArrowDropdown   onClick={()=>change3()} size={25}/>
                        </div>
                    )
                }
             </div>
           
               
              
                    { openthree &&(
                        <div className="absolute top-[40px] left-[-10px] flex flex-col w-[200px] p-[10px] gap-[10px] bg-white rounded-[20px]">
                            {season.map((item,index)=>(
                             <div key={index} className="flex gap-[10px] ">
                                <input type='checkbox' />
                                  <p className="font-semibold ">{item}</p>
                             </div>
                            ))
                            }
                        </div>
                    )
                      }
               
             
            </div>
            <div className="flex flex-col relative gap-[30px]">
                <p className="font-bold">Price</p>
                <div className="w-[155px] bg-gray-200 h-[5px] "></div>
                <div className="border-2 rounded-[50%] w-[15px] h-[15px] bg-white absolute top-[48px] left-[74px] "></div>
                <div className="border-2 rounded-[50%] w-[15px] h-[15px] bg-white border-black absolute top-[48px] left-[2px]"></div>
            </div>
            <div className="flex relative mt-[-70px] w-[130px]">
                <p className="font-bold">Gouts</p>
                <div className="absolute top-0 right-[50px]">
                {
                    openfoor ? (
                        <div>
                            <IoIosArrowDropup onClick={()=>change4()} size={25}/>
                        </div>
                    ):(
                        <div>
                            <IoIosArrowDropdown onClick={()=>change4()} size={25}/>
                        </div>
                    )
                }
             </div>
             {
                openfoor&&(
                    <div className="absolute top-[40px] left-[-10px] flex flex-col w-[200px] p-[10px] gap-[10px] bg-white rounded-[20px]">
                        {
                            gouts.map((item,index)=>(
                                <div key={index} className="flex  gap-[10px]">
                                    <input type='checkbox' className="rounded-[10px]" />
                                    <p className="font-semibold">{item}</p>
                                </div>
                            ))
                        }
                    </div>
                )
             }
           
            </div>
            <div className="block md:hidden">
               <input type='button' value='rechercher' className="rounded-[10px] bg-gray-100 text-gray-900 p-[12px] border-2 border-gray-300 hover:bg-white  w-[187px] text-[23px] font-bold " />
            </div>
        </div>
    )
}