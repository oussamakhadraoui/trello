
import { NavBarDash } from '@/components/NavBarDash'
import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className='h-full'>
      <NavBarDash />
      {children}
    </div>
  )
}

export default layout
