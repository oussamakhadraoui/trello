'use client'
import { ListWithCards } from '@/lib/types'
import { List } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import ListForm from './ListForm'
import ListItem from './ListItem'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}
function reorder<T>(List: T[], startIndex: number, endIndex: number) {
  const result = Array.from(List)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [order, setOrder] = useState(data)
  useEffect(() => {
    setOrder(data)
  }, [data])

  const onDragEndFunction = (result: any) => {
    const { destination, source, type } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    if (type === 'list') {
      const newOrder = reorder(order, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      )
      setOrder(newOrder)
    }
    //card
    if (type === 'card') {
      let newOrderData = [...order]
      const sourceList = newOrderData.find(
        (item) => item.id === source.droppableId
      )
      const destinationList = newOrderData.find(
        (item) => item.id === destination.droppableId
      )
      if (!sourceList || !destinationList) {
        return
      }
      if (!sourceList.cards) {
        sourceList.cards = []
      }
      if (!destinationList.cards) {
        destinationList.cards = []
      }

      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )
        reorderCards.forEach((card, index) => {
          card.order = index
        })
        sourceList.cards = reorderCards
        setOrder(newOrderData)
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1)
        movedCard.listId = destination.droppableId
        destinationList.cards.splice(destination.index, 0, movedCard)
        sourceList.cards.forEach((card, index) => {
          card.order = index
        })
        destinationList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrder(newOrderData)
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEndFunction}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex gap-x-3 h-full'
          >
            {order?.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className='flex shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer
