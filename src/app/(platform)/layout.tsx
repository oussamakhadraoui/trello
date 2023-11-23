import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/providers/modalProvider'

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      <ModalProvider/>
         {children}
       
    </ClerkProvider>
  )
}

export default PlatformLayout
