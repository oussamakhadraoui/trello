'use client'
import { ListWithCards } from '@/lib/types'
import React from 'react'
import ListHeader from './ListHeader'
import CardForm from '../Card/CardForm'
import { cn } from '@/lib/utils'
import CardItem from '../Card/CardItem'
import { Draggable, Droppable } from '@hello-pangea/dnd'

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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className='shrink-0 h-full w-[272px] select-none'
        >
          <div
            {...provided.dragHandleProps}
            className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'
          >
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type='card'>
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    data.cards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem card={card} index={index} key={card.id} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textAreaFormRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default ListItem
