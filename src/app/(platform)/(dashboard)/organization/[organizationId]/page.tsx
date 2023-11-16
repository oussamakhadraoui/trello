import { OrganizationSwitcher, auth } from '@clerk/nextjs'
import React from 'react'

interface pageProps {
  params: {
    organizationId: string
  }
}

const page = ({params:{organizationId}}: pageProps) => {

  return <div ><OrganizationSwitcher /></div>
}

export default page
