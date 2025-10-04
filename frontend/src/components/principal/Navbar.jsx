
"use client"

import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import imagelogo from '../../assets/images/logoparfum.jpg'
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt2 } from "react-icons/hi";
import { useRouter,usePathname} from "next/navigation";
import { useState } from "react";
import { selectCartCount } from "@/store/cartslice";
import { useSelector } from "react-redux";
export default  function Navbar({display}){
    const route=useRouter();
    const pathname=usePathname();
     const cartCount = useSelector(selectCartCount);

    const handcart=()=>{
        if(pathname=="/panier"){
            route.back();
        }else{
            route.push("/panier")
        }
    }

    const handfiltrage=()=>{
        if(pathname=="/filter"){
            route.back()
        }else{
            route.push("/filter")
        }
    }

    const handprofil=()=>{
        if(pathname=="/profil"){
            route.back()
        }else{
            route.push("/profil")
        }
    }
    const [affiche,Setaffiche]=useState(false);
    const handaffiche=()=>{
        if(affiche==true){
        Setaffiche(false);
        }else{
            Setaffiche(true);
        }
    }
    return(
    <nav className="flex justify-between p-[10px] items-center  bg-black w-[100%]">
        <div className="flex p-[10px] items-center gap-[10px] ">
        <HiMenuAlt2 size={25} className="text-white block md:hidden" onClick={()=>handfiltrage()}/>
        <Image src={imagelogo} alt='logo' width={51} height={51} className="rounded-[12px] md:w-[100px]  md:translate-x-0" />
        </div>
        <div className="flex justify-around h-[60px] gap-[20px] md:gap-[300px]">
            
            <input type="text" placeholder="search..." className="border-2 rounded-[20px] hidden md:block bg-white p-[12px] w-[150px] md:w-[800px] " />
            {
                affiche&&(
                    <input type="text" placeholder="search..." className="border-2 rounded-[20px] translate-x-[-16px] translate-y-[-4px] md:block bg-white p-[12px] w-[150px] h-[50px] md:w-[800px] " />
                )
            }
            <div className="flex justify-around w-[100px]  md:w-[22%]">
                <CiSearch size={25}  className="text-white md:hidden block translate-x-[-21px] translate-y-[6px]" onClick={()=>handaffiche()}/>
             <CgProfile size={25} className="md:w-[35px] text-white translate-x-[-10px] translate-y-[5px]" onClick={()=>handprofil()}/>
             <div className="rounded-[50%] p-[10px] bg-green-500 md:w-[68px] md:h-[49px] w-[60px] relative h-[50px] md:pt-[8px] md:pl-[24px]">
                <MdOutlineShoppingCart size={20} className="md:w-[37px] absolute md:top-[12px] top-[12px] left-[24px] text-white" onClick={()=>handcart()}/>
                    <h1 className="absolute top-[-1px] left-[2px] text-white  rounded-[20px] p-[10px] ">{cartCount}</h1>
             </div>
             <CiHeart size={40} className="hidden md:block md:w-[30px] text-white font-bold"/>
            </div>
        </div>
    </nav>
    )
}