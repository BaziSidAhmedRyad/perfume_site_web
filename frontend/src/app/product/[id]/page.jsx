"use client"
import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import image from '../../../assets/images/Paste image.png'
import { CiStar } from "react-icons/ci";
import {useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaStarHalfStroke } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineArrowRight } from "react-icons/md";
import {incrm,dec} from '../../../_lib/functionscart';
import { CiHeart } from "react-icons/ci";
import {Setcart} from '../../../store/cartslice';
import { Setproductdetail } from "@/store/productslice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Detail(){
    const {id}=useParams();
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
    let quantity=20;
 
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
     const [nbr,Setnbr]=useState(0);
     const [isred,Setred]=useState(false);


const product=useSelector((state)=>state.product.productdetail);

const dispatch=useDispatch();
useEffect(()=>{
    const fetchdetail=async()=>{
     const res= await axios.get('');
     dispatch(Setproductdetail(res.data));
     console.log(res.data);
    };
    fetchdetail();
},[])
if(!product){
    return (
        <h1 className="text-[21px] font-bold">Loading...</h1>
    )
}
    return(
        <div className="flex flex-col md:flex-row md:items-start items-center w-[100%] md:p-[90px] md:gap-[90px] p-[12px] gap-[30px] ">
            <div className=" flex flex-col gap-[20px]">
            <div className="relative md:flex md: flex-col md:gap-[20px]   border-2 bg-gray-400 border-gray-200 p-[29px] rounded-[12px]">
                <div className="md:p-[17px] md:w-[450px] md:h-[450px]">
                <Image src={image} className="w-[220px] rounded-[20px] md:w-[438px] md:h-[400px] h-[250px]"/>
                <div className="flex justify-between absolute top-[50%] left-[-1px] w-[280px] md:w-[490px] md:translate-x-[7px] ">
                   <IoArrowBackCircleOutline size={30} className="font-bold text-white hover:text-gray-200"/>
                   <IoArrowForwardCircleOutline size={30} className="font-bold text-white hover:text-gray-200"/>
                </div>
                </div>
            </div>
            <div className="hidden md:flex gap-[20px]">
                <Image src={image} className="w-[200px] h-[200px] rounded-[20px]" />
                 <Image src={image} className="w-[200px] h-[200px] rounded-[20px]" />
                <Image src={image} className="w-[200px] h-[200px] rounded-[20px]" />
                
            </div>
            </div>
            <div className="flex flex-col gap-[30px]">
                <div className="flex gap-[35px] pl-[14px]">
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
                  <div>
                    <p className="text-[18px] font-bold">{}reviews</p>
                  </div>
                </div>

                <div className="flex flex-col gap-[20px] border-b-2 border-gray-300 pb-[20px]">
                    <h1 className="font-bold text-[30px]">Tray table</h1>
                    <p className="font-medium text-[20px]">Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.</p>
                     <div className="flex gap-[20px]">
                        <p className="text-[23px] font-bold text-black border-2 p-[6px] rounded-[15px]">$199.00</p>
                        <p className="text-[17px] text-gray-500 line-through p-[11px] decoration-red-400">$400.00</p>
                     </div>
              
            </div>
            <div className="flex flex-col p-[14px] gap-[20px] w-[100%]">
                <div className="relative">
                    <h3>Choose pack</h3>
                    <div className="absolute top-0 right-[230px] md:right-[538px]">
                        <MdOutlineArrowRight size={25}/>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <h4 className="font-light">Black</h4>
                    <div className="flex gap-[20px]">
                        <Image src={image} className="md:w-[135px] md:h-[163px] w-[100px] h-[100px]"/>
                         <Image src={image} className="md:w-[135px] md:h-[163px] w-[100px] h-[100px]"/>
                          <Image src={image} className="md:w-[135px] md:h-[163px] w-[100px] h-[100px]"/>
                           <Image src={image} className="md:w-[135px] md:h-[163px] w-[100px] h-[100px]"/>
                    </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                <div className="flex  gap-[50px]">
                      <div className="flex   translate-y-[1px] pt-[-2px] ">
                                                        <button className="border-r-0 border-2 translate-y-[7px] w-[29px] h-[41px]" onClick={()=>Setnbr(dec(nbr))}>-</button>
                                                        <p className="border-2 border-l-0 border-r-0 pl-[10px] pt-[7px] h-[41px] w-[29px] translate-y-[7px] text-[15px] font-medium">{nbr}</p>
                                                        <button className="border-l-0 border-2 w-[28px] h-[41px] translate-y-[7px]" onClick={()=>Setnbr(incrm(quantity,nbr))}>+</button>
                     </div>
                     <div className="relative" onClick={()=>Setred(!isred)}>
                     <input type='button' value='whishlist' className={`border-2 w-[160px] rounded-[12px] p-[12px] ${isred?"bg-red-500":"bg-white"} ${isred?"text-white":"text-black"}  font-bold md:w-[400px]`} />
                     <div className="absolute top-[13px] left-[16px]">
                        <CiHeart size={25} className={`${isred?'bg-red-500':'bg-white'} ${isred?'text-white':'text-black'}`}/>
                     </div>
                     </div>
                </div>
         
                    <input type='button' value='Add to Cart' className="bg-black text-white p-[12px] w-[295px] rounded-[12px md:w-[538px]" onClick={()=>{dispatch(Setcart({...product,quantity:nbr || 1}))}}/>
          
                </div>
            </div>
              </div>
        </div>
    )
}