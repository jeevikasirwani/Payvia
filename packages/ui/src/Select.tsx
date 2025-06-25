'use client'
import { JetBrains_Mono } from "next/font/google";


const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});
export const Select=({
    options,
    onSelect
}:{
    options:{key:string ;value:string}[];
    onSelect:(value:string)=>void;
})=>{
    return(
        <div>
            <select  onChange={(e) => onSelect(e.target.value)}
        className={`${jetbrainsMono.className} bg-indigo-100 border border-indigo-500 text-gray-900 
        text-sm rounded-lg focus:ring-indigo-700 focus:border-indigo-700 block w-full p-2.5`}>
            {options.map((option)=>(
                <option key={option.key} value={option.value}>{option.value}</option>
            ))}
        </select>
        </div>
    )
}