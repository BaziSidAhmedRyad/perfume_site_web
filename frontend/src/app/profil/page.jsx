"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/usercontext";
import Image from "next/image";
import image1 from '../../assets/images/objet ofcart.png';
import { z } from 'zod';
import axios from "axios";

// --- SCHEMAS ZOD ---
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
});

const signupSchema = z.object({
  name: z.string().min(3, "Le nom doit avoir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit avoir au moins 6 caractères"),
  passwordconfirm: z.string().min(6, "Confirmation obligatoire"),
}).refine((data) => data.password === data.passwordconfirm, {
  path: ["passwordconfirm"],
  message: "Les mots de passe ne correspondent pas",
});

export default function Profil() {
  const { isAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "", name: "", passwordconfirm: "" });
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [openn,Setaffiche]=useState(false);

  // --- Helpers ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatorLogin = () => {
    try {
      loginSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const validatorSignup = () => {
    try {
      signupSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  // --- Actions ---
  const logiin = async () => {
    if (validatorLogin()) {
      try {
        const res = await axios.post("/api/login", { email: form.email, password: form.password });
        setData(res.data);
      } catch (error) {
        console.error("Erreur login", error.message);
      }
    }
  };

  const siignup = async () => {
    if (validatorSignup()) {
      try {
        const res = await axios.post("/api/signup", form);
        setData(res.data);
      } catch (error) {
        console.error("Erreur signup", error.message);
      }
    }
  };

  const affiche=()=>{
    Setaffiche(!openn)
  }
    if(isAuthenticated){
 return (
        <div className="flex flex-col p-[10px]">
       <div className="rounded-[20px] bg-gray-500 w-[40%] h-[50px] pl-[30px] pt-[10px] text-[20px] font-bold text-gray-200"> 
        <h1 className="font-bold text-[20px]">Historique :</h1>
       </div>
         <div className="flex flex-col gap-[20px] items-center p-[10px]">
            <div className='flex flex-col p-[28px] gap-[20px] bg-gray-200 h-[280px] w-[85%] rounded-[20px]'>
            <div className='flex justify-between'>
                <h1 className="font-bold text-[20px] text-green-800">#12345</h1>
                <h1 className="font-bold text-[20px] text-green-800">2025-08-22</h1>
            </div>
            <div className='flex gap-[30px]'>
            <Image src={image1} width={60} height={90} className="w-[149px] h-[173px] translate-y-[5px] object-cover rounded-[20px]"/>
              <p className="translate-x-[30px] translate-y-[141px] font-bold text-green-900 text-[20px]">1200$</p>
            </div>
           
            </div>

             <div className='flex flex-col p-[28px] gap-[20px] bg-gray-200 h-[280px] w-[85%] rounded-[20px]'>
            <div className='flex justify-between'>
                <h1 className="font-bold text-[20px] text-green-800">#12345</h1>
                <h1 className="font-bold text-[20px] text-green-800">2025-08-22</h1>
            </div>
            <div className='flex gap-[30px]'>
            <Image src={image1} width={60} height={90} className="w-[149px] h-[173px] translate-y-[5px] object-cover rounded-[20px]"/>
              <p className="translate-x-[30px] translate-y-[141px] font-bold text-green-900 text-[20px]">1200$</p>
            </div>
           
            </div>

           
         </div>
        </div>
    )
    }
    if(!isAuthenticated && !openn){
      return(
        <div className="flex flex-col p-[50px] items-center gap-[20px] w-[100%]">
          <h1 className="w-[100%] text-[20px] font-bold">Vous devez vous connecter pour voir vos historiques.</h1>
          <div className="flex flex-col bg-gray-300 gap-[20px] rounded-[20px] p-[40px] h-[364px]">
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="email" className="text-[21px] font-semibold">Email</label>
              <input type="text" name="email" placeholder="Email..."  value={form.email} onChange={handleChange} className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400 " />
               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}         
            </div>
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className="text-[21px] font-semibold">Password</label>
              <input type="password" name="password" placeholder="Password..." value={form.password} onChange={handleChange}  className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400 " />
                 {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex gap-[10px] mt-[10px] items-center pl-[60px] w-[100%]">
              <h1 className="text-[12px] font-bold hover:text-gray-50 cursor-pointer" onClick={()=>affiche()}>j'ai pas un compte?</h1>
              <input type="button" value="login" onClick={()=>logiin()} className="font-bold text-[21px] hover:bg-gray-50 w-[100px] bg-gray-200 rounded-[20px] p-[10px] text-black" />
            </div>
            
          </div>
        </div>
      )
    }
    if(!isAuthenticated && openn){
      return(
        <div className="flex flex-col bg-gray-300 gap-[20px] rounded-[20px] p-[40px] h-[660px] mt-[100px]">
           <div className="flex flex-col gap-[10px]">
            <label htmlFor="name" className="text-[21px] font-semibold">name</label>
            <input type="text" placeholder="Name..." value={form.name} onChange={handleChange}  className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="email" className="text-[21px] font-semibold">Email</label>
              <input type="text" name="email" placeholder="Email..." value={form.email} onChange={handleChange}  className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400 " />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className="text-[21px] font-semibold">Password</label>
              <input type="password" name="password" placeholder="Password..." value={form.password} onChange={handleChange}  className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400 " />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
               <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className="text-[21px] font-semibold">Confirm Password</label>
              <input type="password" placeholder="Password..." name="passwordconfirm" value={form.passwordconfirm} onChange={handleChange}  className="w-[300px] h-[59px] p-[30px] rounded-[20px] border-2 border-gray-400 " />
              {errors.passwordconfirm && <p className="text-red-500 text-sm">{errors.passwordconfirm}</p>}
            </div>
              <div className="flex  mt-[10px] items-center pl-[60px] translate-x-[63px] translate-y-[43px] gap-[28px] w-[100%]">
              <h1 className="text-[12px] font-bold hover:text-gray-50 cursor-pointer" onClick={()=>affiche()}>j'ai deja un compte?</h1>
              <input type="button" value="sign up" onClick={()=>siignup()} className="font-bold text-[21px] hover:bg-gray-50 w-[100px] bg-gray-200 rounded-[20px] p-[10px] text-black" />

            </div>
            
          </div>
      )
    }
   
}