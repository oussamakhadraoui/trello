import { db } from '@/lib/db'
import React from 'react'

interface TestProps {
  
}

const Test = async({}: TestProps) => {
 const DATA= await db.oussama.findMany()
  return <div>{DATA.map((item) => <div key={item.id}>{item.title}</div>)}</div>
}

export default Test
