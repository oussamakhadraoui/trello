import OrgControl from '@/components/OrgControl'
import React, { ReactNode } from 'react'
import { startCase } from 'lodash'
import { auth } from '@clerk/nextjs'
export async function generateMetadata() {
  const { orgSlug } = auth()
  return {
    title: `${startCase(orgSlug || 'organization')}`,
  }
}
interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default layout
