'use client'
import { useMobileSideBar } from '@/hooks/useMobileSideBarStore'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent } from './ui/sheet'
import { SideBar } from './Sidebar'

interface MobileSidebarProps {}

const MobileSidebar = ({}: MobileSidebarProps) => {
  const pathname = usePathname()

  const [isMouneted, setIsMounted] = useState(false)

  const isOpen = useMobileSideBar((state) => state.isOpen)
  const onClose = useMobileSideBar((state) => state.onClose)
  const onOpen = useMobileSideBar((state) => state.onOpen)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  useEffect(() => {
    onClose()
  }, [pathname, onClose])
  if (!isMouneted) {
    return null
  }
  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant={'ghost'}
        size={'sm'}
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className='p-2 pt-10'>
          <SideBar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar
