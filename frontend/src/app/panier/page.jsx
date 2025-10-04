"use client"

import Image from "next/image"
import { IoIosClose } from "react-icons/io";
import imgone from '../../assets/images/objet ofcart.png'
import {incrm,dec,deleteproduct,fillcart} from '../../_lib/functionscart';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Setcart } from "@/store/cartslice";

export default function cart() {
    const cart=useSelector((state)=>state.cart.cart);
    const dispatch=useDispatch();
   const [nbr,Setnbr]=useState(0);
    const total=cart.reduce((acc,item)=>acc+item.prix*item.quantity,0);

    const handdelete=(id)=>{
        dispatch(Setcart(deleteproduct(cart,id)));
    }
    return(
        <div className="flex flex-col items-center gap-[40px]">
            <h1 className="text-[35px] font-bold">Cart</h1>
            <div className="flex flex-col w-[95%] ">
                <div className="border-b-2 p-[12px]">
                <p className="text-[23px] font-semibold">product</p>
                </div>
                <div className="flex justify-between p-[15px] border-b-2 border-gray-400 pb-[35px]">
                    <div className="flex gap-[35px] md:gap-[112px]">
                            <Image src={imgone} alt="" className="w-[53%] h-[97%] md:w-[293px] md:h-[192px]"/>
                            <div className="flex flex-col w-[100%] gap-[7px]">
                                <p className="text-[15px] font-bold md:text-[27px]">Tray Table</p>
                                <p className="text-[15px] font-sans md:translate-x-[16px] md:translate-y-[2px] text-gray-500">color : black</p>
                                <div className="flex md:translate-y-[60px] translate-y-0">
                                    <button className="border-r-0 border-2 translate-y-[7px] w-[29px] h-[30px]" onClick={()=>Setnbr(dec(nbr))}>-</button>
                                    <p className="border-2 border-l-0 border-r-0 pl-[10px] pt-[2px] h-[30px] w-[29px] translate-y-[7px] text-[15px] font-medium">{nbr}</p>
                                    <button className="border-l-0 border-2 w-[28px] h-[30px] translate-y-[7px]" onClick={()=>{Setnbr(incrm(quantity,nbr)); totalcalculate()}}>+</button>
                                </div>
                            </div>
                    </div>
                    <div className="flex flex-col">
                       <p className="font-mono text-[20px]">${Math.round(nbr * 19.90 * 100) / 100}</p>
                       <IoIosClose size={35} onClick={()=>handdelete(item.id)} className="text-red-400"/>
                    </div>
                </div>
                <div className="flex gap-[10px] translate-x-[270px] w-[35%] border-2 border-t-0 rounded-[6px] p-[11px] md:translate-x-[1120px] md:w-[20%] ">
                    <p className="text-[20px] font-bold">total :</p>
                    <p className="text-[20px] font-mono">{total}</p>
                </div>
            </div>
        </div>
    )
}