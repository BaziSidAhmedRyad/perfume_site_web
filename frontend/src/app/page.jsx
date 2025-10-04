 import Filtrage from "@/components/principal/Filtrage";
 import Product from '../components/Product';

export default function pageone () {
  return (
  <div className="flex gap-[12px]">
    <div className="  hidden md:block">
     <Filtrage/>
     </div>
     <div className="w-[500px]">
     <Product/>
     </div>
    
    
  </div>
  )
}