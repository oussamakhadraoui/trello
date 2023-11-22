'use client'
import { ListWithCards } from '@/lib/types'
import React from 'react'
import ListHeader from './ListHeader'
import CardForm from '../Card/CardForm'
import { cn } from '@/lib/utils'
import CardItem from '../Card/CardItem'

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
        <ol
          className={cn(
            'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
            data.cards.length > 0 ? 'mt-2' : 'mt-0'
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem card={card} index={index} key={card.id} />
          ))}
        </ol>
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
