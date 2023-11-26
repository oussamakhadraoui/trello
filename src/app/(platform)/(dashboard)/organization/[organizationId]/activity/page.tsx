import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import Info from '@/components/Info'
import { ActivityList } from '@/components/activityList'


const ActivityPage = async () => {


  return (
    <div className='w-full'>
      <Info/>
      <Separator className='my-2' />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage
