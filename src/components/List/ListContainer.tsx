'use client'
import { ListWithCards } from '@/lib/types'
import { List } from '@prisma/client'
import React from 'react'
import ListForm from './ListForm'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
     <ListForm/>
      <div className='flex shrink-0 w-1'/>
    </ol>
  )
}

export default ListContainer
