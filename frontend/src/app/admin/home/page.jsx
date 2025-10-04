"use client"

import { FaHome } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaShopify } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";

export default function Admin (){
  const route=useRouter();
    const gotoorders=()=>{
        route.push("/admin/orders");
    }
    const gotoproducts=()=>{
      route.push("/admin/products");
    }
    const gotosettings=()=>{
      route.push("/admin/settings")
    }
    return (
      <div className="flex gap-[90px]">
        <div className="flex flex-col w-[14%]  translate-y-[50px]  h-[650px] rounded-[33px]  gap-[60px] bg-gray-200 p-[76px]">
            <div className="relative" onClick={()=>gotoorders()}>
            <h3 className="font-extrabold text-[25px] p-[12px]  w-[200px]   translate-x-[-70px] text-white hover:bg-green-300 bg-green-400">Home</h3>
            <FaHome size={25} className="absolute top-0 left-0"/>
            </div>
            <div className="relative"  onClick={()=>gotoproducts()}>
            <h3 className="font-extrabold text-[25px] p-[12px]  w-[200px]   translate-x-[-70px] text-white hover:bg-green-300 bg-green-400">Products</h3>
            <MdOutlineProductionQuantityLimits size={25} className="absolute top-0 left-0 "/>
          </div>
          <div className="relative" onClick={()=>gotosettings()}>
            <h3 className="font-extrabold text-[25px] p-[12px]  w-[200px]   translate-x-[-70px] text-white hover:bg-green-300 bg-green-400">Settings</h3>
             <IoSettingsOutline size={25} className="absolute top-0 left-0 "/>
           </div>
      
        </div>
        <div className="flex flex-col w-[100%]">
          <div className="flex justify-around translate-x-[-4px] translate-y-[119px]">
            <div className="relative flex flex-col bg-gray-200 gap-[8px] items-center p-[30px] rounded-[13px] w-[140px]">
               <h1 className="text-[20px] font-extrabold">Orders</h1>
               <h3 className="text-[20px] font-bold text-green-400">120</h3>
                <FaShopify size={25} className="absolute top-[5px] left-[4px] text-green-600"/>
            </div>
            <div className="relative flex flex-col bg-gray-200 gap-[8px] items-center p-[30px] rounded-[13px] w-[140px]">
                <h1 className="text-[20px] font-extrabold">Products</h1>
                <h3 className="text-[20px] font-bold text-green-400">120</h3>
                <MdShoppingCart size={25} className="absolute top-[5px] left-[4px] text-green-600"/>
            </div>
            <div className="relative flex flex-col bg-gray-200 p-[30px] gap-[8px] items-center rounded-[13px] w-[160px]">
                  <h1 className="text-[20px] font-extrabold">Transations</h1>
                  <h3 className="text-[20px] font-bold text-green-400">120</h3>
                  <GiTakeMyMoney size={25} className="absolute top-[5px] left-[4px] text-green-600"/>
            </div>
          </div>
         <div className="translate-x-[-2px] translate-y-[137px] w-[94%] p-[35px] bg-gray-200  rounded-[18px]">
          <div className="flex gap-[25px]"> 
        <div className="flex  flex-col gap-[20px]">
         <div className="flex flex-col gap-[12px]">
                    <label htmlFor="name" className="text-[20px] font-bold">
                        name
                    </label>
                    <input type="text" placeholder="Name..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="email"  className="text-[20px] font-bold">
                        description
                    </label>
                    <input type="text" placeholder="Description..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="job"  className="text-[20px] font-bold">
                         Title
                    </label>
                    <input type="text" placeholder="Title..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div>
                    <input type="button" value='Add' className="w-[120px] bg-green-500 hover:bg-green-400 font-semibold text-white text-[18px] p-[12px] rounded-[12px] cursor-pointer" />
                </div>
            </div>
            <div className="flex flex-col gap-[20px]">
             <div className="flex flex-col gap-[12px]">
                    <label htmlFor="price" className="text-[20px] font-bold">
                        price
                    </label>
                    <input type="text" placeholder="Price..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                 <div className="flex flex-col gap-[12px]">
                    <label htmlFor="Stock" className="text-[20px] font-bold">
                        Stock
                    </label>
                    <input type="text" placeholder="Stock..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                 <div className="flex flex-col gap-[12px]">
                    <label htmlFor="category" className="text-[20px] font-bold">
                        Category
                    </label>
                    <input type="text" placeholder="Category..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                
            </div>
             <div className="flex flex-col gap-[12px]">
                    <label htmlFor="Image" className="text-[20px] font-bold">
                        Images
                    </label>
                    <input type="text" placeholder="Images..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
          </div>
            </div>
        </div>
         
        </div>
    )
}