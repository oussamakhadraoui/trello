'use client'
import React, { ElementRef, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Board } from '@prisma/client'
import FormInput from '../form/FormInput'
import { setTimeout } from 'timers'
import { useAction } from '@/hooks/useAction'
import { updateBoard } from '@/actions/update-board'
import { toast } from 'sonner'

interface BoardTitleFormProps {
  data: Board
}

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [TITLE, setTITLE] = useState(data.title)
  const { execute } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Board "${data.title}" updated successfully`)
      setTITLE(data.title)
      disableEditing()
    },
  })

  const disableEditing = () => {
    setIsEditing(false)
  }
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 100)
  }
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ title, id: data.id })
  }
  const onBlur = () => {
    formRef.current?.requestSubmit()
  }
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className='flex items-center gap-x-2'
      >
        <FormInput
          ref={inputRef}
          className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
          id='title'
          defaultValue={TITLE}
          onBlur={onBlur}
        />
      </form>
    )
  }
  return (
    <Button
      onClick={enableEditing}
      variant={'transparent'}
      className='font-bold text-lg h-auto w-auto p-1 px-2'
    >
      {TITLE}
    </Button>
  )
}

export default BoardTitleForm
