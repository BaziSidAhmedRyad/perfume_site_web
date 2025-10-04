import { CgProfile } from "react-icons/cg";

export default function Setting(){

    return(
        <div className="flex flex-col gap-[60px] p-[58px] h-auto bg-gray-300">
            <h1 className="text-[24px] font-extrabold">Account</h1>
            <div className="flex flex-col translate-x-[480px] gap-[35px] p-[21px] w-[69%] bg-white rounded-[18px] translate-y-[-16px]">
                <div className="flex gap-[20px]">
                    <CgProfile size={45} className="text-green-500"/>
                    <input type="button" className="p-[5px] w-[100px] h-[39px] rounded-[16px] bg-white text-[15px] text-green-600 border-2 hover:bg-green-400 font-bold hover:text-white border-gray-200  translate-x-[1px] translate-y-[-11px]" value='change' />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="name" className="text-[20px] font-bold">
                        Full name
                    </label>
                    <input type="text" placeholder="Name..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="email"  className="text-[20px] font-bold">
                        Email Address
                    </label>
                    <input type="text" placeholder="Email..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="job"  className="text-[20px] font-bold">
                        Job Title
                    </label>
                    <input type="text" placeholder="Title..." className="w-[338px] rounded-[15px] p-[10px] border-2 border-gray-300" />
                </div>
                <div>
                    <input type="button" value='Save Setting' className="w-[120px] bg-green-500 hover:bg-green-400 font-semibold text-white text-[18px] p-[12px] rounded-[12px] cursor-pointer" />
                </div>
            </div>
        </div>
    )
}