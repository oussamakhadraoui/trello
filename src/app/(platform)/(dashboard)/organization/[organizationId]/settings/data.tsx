import { Delete } from '@/actions/Create'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import React from 'react'

interface dataProps {
  item: {
    id: string
    titile: string
  }
}

const Data = async ({item}: dataProps) => {
 const data = await db.oussama.findMany()
  const DELETE = Delete.bind(null, item.id)
  return (
    <>
      {' '}
      <form key={item.id} action={DELETE}>
        <div>{item.titile}</div>
        <Button variant={'destructive'} type='submit'>
          {' '}
          delete
        </Button>
      </form>
      {data.map((item) => (
        <Data key={item.id} item={item} />
      ))}
    </>
  )
}

export default Data
