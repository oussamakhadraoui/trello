'use client'
import { ListWithCards } from '@/lib/types'
import { List } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ListForm from './ListForm'
import ListItem from './ListItem'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
 const [order,setOrder]=useState(data)
 useEffect(()=>{
setOrder(data)
 },[data])
  return (
    <ol className='flex gap-x-3 h-full'>
     {order?.map((list,index) => (
       <ListItem
         key={list.id}
         index={index}
         data={list}
      
       />
     ))}
     <ListForm/>
      <div className='flex shrink-0 w-1'/>
    </ol>
  )
}

export default ListContainer
