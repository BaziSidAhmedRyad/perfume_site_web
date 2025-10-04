"use client"
import { VscSettings } from "react-icons/vsc";
import { TbPointFilled } from "react-icons/tb";
import { IoAccessibility } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
export default function Products (){
    return (
          <div className="flex flex-col w-[100%] p-[38px] gap-[60px]">
            <div className="flex justify-between w-[100%]">
                <h1 className="text-[23px] font-bold">Nos Produits</h1>
                <input type='button' value=' Display All' className="bg-green-500 w-[177px] h-[43px] cursor-pointer text-white text-[20px] rounded-[20px]"/>
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
                <h3 className="font-extrabold">Name</h3>
                <h3 className="font-extrabold">Description</h3>
                <h3 className="font-extrabold">Price</h3>
                <h3 className="font-extrabold">Stock </h3>
                <h3 className="font-extrabold">Category</h3>
                <h3 className="font-extrabold">Images</h3>
                <h3 className="font-extrabold">STATUS</h3>
                <h3 className="font-extrabold">CreatedAt</h3>
                 <h3 className="font-extrabold"></h3>
            </div>
            <div className="flex justify-around gap-[30px]">
                <h3 className="text-[12px] font-semibold w-[300px]">66cfa1b2d09a4c9e2f113abc</h3>
                <h3 className="text-[12px] font-semibold w-[225px]">Parfum Oud Royal</h3>
                <h3 className="text-[12px] font-semibold w-[300px]">Un parfum oriental aux notes boisées et épicées, longue tenue.</h3>
                <h3 className="text-[15px] font-semibold w-[80px] translate-x-[30px]">150.00</h3>
                <h3 className="text-[15px] font-semibold w-[300px] translate-x-[80px]">32</h3>
                <h3 className="text-[12px] font-semibold w-[300px] translate-x-[40px]">Parfums Homme</h3>
                <h3 className="text-[12px] font-semibold  w-[300px] translate-x-[20px]">hachour med anis</h3>
                <h3 className="text-[12px] font-semibold  w-[400px] translate-x-[20px]">hachour med anis</h3>
                <h3 className="text-[12px] font-semibold  w-[230px] translate-x-[-10px]">2025-08-16T09:30:00Z</h3>
                <div className="flex gap-[20px]">
                <MdClose size={25} className="cursor-pointer"/>
                <GoKebabHorizontal size={25} className="cursor-pointer"/>
                </div>
              </div>
              </div>
            </div>
    
    )
} 