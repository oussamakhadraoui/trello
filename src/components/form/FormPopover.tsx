'use client'
import React, { ReactNode } from 'react'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'
import { useAction } from '@/hooks/useAction'
import { createBoard } from '@/actions/create-board'
import { toast } from 'sonner'
import FormPicker from './FormPicker'

interface FormPopoverProps {
  children: ReactNode
  side?: 'right' | 'bottom' | 'top' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
}

const FormPopover = ({
  children,
  align,
  side = 'bottom',
  sideOffset = 0,
}: FormPopoverProps) => {
  const{execute,fieldErrors}=useAction(createBoard,{
    onSuccess(data) {
      console.log(data)
      toast.success('Board created successfully')
    },
    onError(error) {
      console.log(error)
      toast.error(error)
    },
  })
  const OnSubmit=(formData:FormData)=>{
    const title= formData.get('title') as string
     execute({title})
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className='w-80 pt-3'
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form action={OnSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <FormPicker errors={fieldErrors} id={'image'}/>
            <FormInput
              id='title'
              label='Board title'
              type='text'
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className='w-full'>Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormPopover
