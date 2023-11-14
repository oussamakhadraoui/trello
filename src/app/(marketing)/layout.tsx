import { Footer } from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className='h-screen bg-slate-100'>
      <NavBar />
      <main className='pt-40 pb-20 bg-slate-100'>{children}
      </main>
      <Footer/>
    </div>
  )
}

export default layout
