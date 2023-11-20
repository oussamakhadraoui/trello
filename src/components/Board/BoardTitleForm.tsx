'use client'
import React, { ElementRef, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Board } from '@prisma/client'
import FormInput from '../form/FormInput'
import { setTimeout } from 'timers'

interface BoardTitleFormProps {
  data:Board
}

const BoardTitleForm = ({data}: BoardTitleFormProps) => {
const formRef= useRef<ElementRef<"form">>(null)
const inputRef= useRef<ElementRef<"input">>(null)
const [isEditing,setIsEditing]=useState(false)
const disableEditing= ()=>{
  setIsEditing(false)
}
const enableEditing= ()=>{
  setIsEditing(true)
  setTimeout(()=>{
inputRef.current?.focus()
inputRef.current?.select()
  },100)
}
if(isEditing){
  return <form ref={formRef} className='flex items-center gap-x-2'>
    <FormInput ref={inputRef} className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none' id="title" defaultValue={data.title} onBlur={()=>{}}/>

  </form>
}
  return <Button onClick={enableEditing} variant={"transparent"} className='font-bold text-lg h-auto w-auto p-1 px-2'>{data.title}</Button>
}

export default BoardTitleForm
