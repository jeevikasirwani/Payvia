'use client'
import { useState,useRef,useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { createOnRampTransaction } from "../app/lib/actions/onramptran";


export default function HdfcBank(){
    const [isLoading,setIsLoading]=useState(true);
    const [isComplete,setIscomplete]=useState(false);
    const [message,setMessage]=useState("");
    const transactionProcessed=useRef(false);


    useEffect(() => {
      const processT=async()=>{
        transactionProcessed.current=true;
        try{
            const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get("amount");
        if(amount){
            const Namount=parseFloat(amount);
            if(Namount <1 || Namount>100000){
                 setMessage("Transaction amount should be between 1 and 10000.");
            setIscomplete(false);
            }else{
                  setMessage("Invalid transaction amount.");
            }

        }

        }catch(error){
            setMessage("Transaction Failed");
        }
        finally{
            setIsLoading(false);
        }
      };
    
      processT();
    }, [createOnRampTransaction])
    
}