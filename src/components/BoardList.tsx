import { db } from '@/lib/db'
import { User2 } from 'lucide-react'
import React from 'react'

interface BoardListProps {
  
}

const BoardList = ({}: BoardListProps) => {

 
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
       <div role='button' className='aspect-video relative h-full w-full bg-muted rounded-smm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'></div>
      </div>
    </div>
  )
}

export default BoardList
