import { db } from '@/lib/db'
import { HelpCircle, User2 } from 'lucide-react'
import React from 'react'
import Hint from './Hint'
import FormPopover from './form/FormPopover'

interface BoardListProps {}

const BoardList = ({}: BoardListProps) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <FormPopover sideOffset={10} side="right">
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-smm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
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
