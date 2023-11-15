import React from 'react'

interface pageProps {
  params:{
   oraganizationId:string
  }
}

const page = ({params:{oraganizationId}}: pageProps) => {
  return <div>page</div>
}

export default page
