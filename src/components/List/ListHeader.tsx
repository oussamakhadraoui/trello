'use client'
import { List } from '@prisma/client'
import React, { ElementRef, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import FormInput from '../form/FormInput'
import { useAction } from '@/hooks/useAction'
import { updateList } from '@/actions/update-list'
import { toast } from 'sonner'
import { ListOptions } from './ListOptions'

interface ListHeaderProps {
  data: List
}

const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 100)
  }
  const disableEditing = () => {
    setIsEditing(false)
  }
  const { execute } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" updated successfully`)
      setTitle(data.title)
      disableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  })
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }
  useEventListener('keydown', onKeyDown)
  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string
    if (title === data.title) {
      return disableEditing()
    }
    execute({ id, title, boardId })
  }
  const onBlur= ()=>{
  formRef.current?.requestSubmit()
}  
return (
  <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
    {isEditing ? (
      <form action={handleSubmit} ref={formRef} className='flex-1 px-[2px]'>
        <input hidden id='id' ref={inputRef} name='id' value={data.id} />
        <input
          hidden
          id='boardId'
          ref={inputRef}
          name='boardId'
          value={data.boardId}
        />
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          placeholder='Enter list title...'
          defaultValue={title}
          className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
        />
        <button type='submit' hidden/>
      </form>
    ) : (
      <div
        onClick={enableEditing}
        className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
      >
        {title}
      </div>
    )}
    <ListOptions data={data} onAddCard={()=>{}}/>
  </div>
)
}

export default ListHeader
