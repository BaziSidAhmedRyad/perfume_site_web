"use client"
import { VscSettings } from "react-icons/vsc";
import { TbPointFilled } from "react-icons/tb";
import { IoAccessibility } from "react-icons/io5";

export default function Order (){
    
    return (
          <div className="flex flex-col w-[100%] p-[38px] gap-[60px]">
            <div className="flex justify-between w-[100%]">
                <h1 className="text-[23px] font-bold">Orders</h1>
                <input type='button' value='Add' className="bg-green-500 w-[177px] h-[43px] cursor-pointer text-white text-[20px] rounded-[20px]"/>
            </div>
            <div className="flex gap-[400px] justify-around items-center">
                <input type="text" placeholder="Search..." className="w-[600px] p-[26px] h-[50px] rounded-[20px] border-2 border-gray-300" />
                <div className="flex gap-[19px] items-center  cursor-pointer">
                    <p className="text-[25px] text-green-500">Filter</p>
                    <VscSettings size={25} className="text-[25px] "/>
                </div>
            </div>
            <div className="flex flex-col  gap-[20px]">
            <div className="flex justify-around border-b-2 pb-[30px]">
                <h3 className="font-extrabold">ORDER</h3>
                <h3 className="font-extrabold">DATE</h3>
                <h3 className="font-extrabold">CUSTOMER</h3>
                  <h3 className="font-extrabold">Product</h3>
                <h3 className="font-extrabold">STATUS</h3>
                <h3 className="font-extrabold">TOTAL</h3>
            </div>
            <div className="flex justify-around">
                <h3 className="text-[20px] font-semibold">#5100</h3>
                <h3 className="text-[20px] font-semibold">12-05-2025</h3>
                <h3 className="text-[20px] font-semibold">hachour med anis</h3>
                <h3 className="text-[20px] font-semibold">hachour med anis</h3>
                <div className="flex gap-[10px]">
                    <IoAccessibility size={25} className="text-green-600" />
                    <h3 className="text-[20px] font-semibold">passed</h3>
                </div>
                <h3 className="text-[20px] font-semibold">12000$</h3>
              </div>
              </div>
            </div>
    
    )
} 