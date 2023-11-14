import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
interface logoProps {}
const font = localFont({ src: '../../public/fonts/font.woff2' })
const Logo = ({}: logoProps) => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image src='/logo.svg' alt='logo' height={30} width={30} className='pb-2' />
        <p className={cn('text-lg text-neutral-700 pb-1 uppercase',font.className)}>trello</p>
      </div>
    </Link>
  )
}

export default Logo
