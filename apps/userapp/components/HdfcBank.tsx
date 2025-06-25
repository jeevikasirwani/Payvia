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
        }
      }
    
      return () => {
        second
      }
    }, [third])
    
}