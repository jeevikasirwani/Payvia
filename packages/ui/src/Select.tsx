'use client'
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
        className="bg-pink-100 border border-indigo-300 text-gray-900 
        text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
            {options.map((option)=>(
                <option key={option.key} value={option.value}>{option.value}</option>
            ))}
        </select>
        </div>
    )
}