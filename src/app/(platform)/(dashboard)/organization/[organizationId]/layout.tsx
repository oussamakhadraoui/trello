import OrgControl from '@/components/OrgControl'
import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return <>
  <OrgControl/>
  {children}</>
}

export default layout
