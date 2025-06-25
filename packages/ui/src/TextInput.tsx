'use client'
import { JetBrains_Mono } from "next/font/google";


const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});
export const TextInput=({
    placeholder,
    onChange,
    label
}:{
    placeholder?:string;
    onChange: (value: string) => void;
    label: string;
})=>{
    return (
        <div className="pt-2">
            <label className={`${jetbrainsMono.className} block mb-2 text-sm font-medium text-gray-900`}>
                {label}
            </label>
            <input type="text" placeholder={placeholder} className={`${jetbrainsMono.className}bg-indigo-100 border border-indigo-500 rounded-lg focus:border-indigo-700  block w-full p-2.5`} onChange={(e)=>onChange(e.target.value)}/>
        </div>
    )
}