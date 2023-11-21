import BoardList from '@/components/BoardList'
import Info from '@/components/Info'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <div className='w-full mb-20 '>
      <Info />
      <Separator className='my-4' />
      <div className='px-2 md:px-4'>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default page
