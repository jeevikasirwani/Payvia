import React from 'react'
import  {PrismaClient}  from '../../../packages/db/generated/prisma'

const prisma = new PrismaClient();

function Page() {
  return (
    <div className='text-2xl'>page</div>
  )
}

export default Page