import { db } from '@/lib/db'
import { HelpCircle, User2 } from 'lucide-react'
import React from 'react'
import Hint from './Hint'
import FormPopover from './form/FormPopover'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Skeleton } from './ui/skeleton'

interface BoardListProps {}

const BoardList = async({}: BoardListProps) => {
  const {orgId}=auth()
  if(!orgId) return redirect("/select-org")
  const boards = await db.board.findMany({
    where: {
    orgId
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className='aspect-video relative h-full w-full group bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm p-2 overflow-hidden'
          >
            <div className='absolute inset-0 bg-black/50 group-hover:bg-black/40 transition'/>
            <p className='relative font-semibold text-white'>{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side='right'>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create New Board</p>
            <span className='text-xs'>5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free workspaces are limited to 5 boards. For more boards, upgrade to a premium plan.`}
            >
              {' '}
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

export default BoardList
BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
    </div>
  )
}
