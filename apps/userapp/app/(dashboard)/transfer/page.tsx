'use client'
import React from 'react'
import AddMoney from '../../../components/AddMoney'
import { BalanceCard } from '../../../components/BalanceCard'

function page() {
  return (
    <div className=' w-full min-h-screen bg-gradient-to-tr from-indigo-200 via-blue-50 to-violet-200 '><AddMoney/>
    <BalanceCard amount={120000} locked={12}/></div>
  )
}

export default page