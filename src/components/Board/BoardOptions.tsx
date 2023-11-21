"use client"
import React from 'react'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { Button } from '../ui/button'
import { MoreHorizontal, X } from 'lucide-react'
import { useAction } from '@/hooks/useAction'
import { toast } from 'sonner'
import { deleteBoard } from '@/actions/delete-board'


interface BoardOptionsProps {
  id: string
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
 const {execute,isLoading}= useAction(deleteBoard, {

    onError: (error) => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto p-2 w-auto' variant={'transparent'}>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Board Action
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}
          >
            <X className='w-4 h-4' />
          </Button>
        </PopoverClose>
        <Button
          variant={'ghost'}
         disabled={isLoading}
          onClick={onDelete}
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        >
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default BoardOptions
