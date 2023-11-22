'use client'
import { ListWithCards } from '@/lib/types'
import React from 'react'
import ListHeader from './ListHeader'
import CardForm from '../Card/CardForm'

interface ListItemProps {
  data: ListWithCards
  index: number
}

const ListItem = ({ data, index }: ListItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const textAreaFormRef = React.useRef<HTMLTextAreaElement>(null)
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textAreaFormRef.current?.focus()
    }, 100)
  }

  const disableEditing = () => {
    setIsEditing(false)
  }
  return (
    <li className='shrink-0 h-full w-[272px] select-none'>
      <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
        <ListHeader onAddCard={enableEditing} data={data} />
        <CardForm
          listId={data.id}
          ref={textAreaFormRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}

export default ListItem
