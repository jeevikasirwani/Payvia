import Herosection from "../../components/Herosection";
import { Metadata } from "next";


 
export const metadata: Metadata = {
  title: 'PayVia',
  description: 'Your Smart Digital Wallet for Easy Payments',
}
 
 
 export default function Home(){
    return <Herosection/>
 }