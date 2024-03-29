import React from 'react'
import Logo from './logo'
import { Button } from './ui/button'
import Link from 'next/link'

interface NavBarProps {}

const NavBar = ({}: NavBarProps) => {
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size={'sm'} variant={'outline'} asChild>
            <Link href='/sign-in'>Login</Link>
          </Button>
          <Button asChild size={"sm"}><Link href='/sign-up'>Get Trello for free</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
