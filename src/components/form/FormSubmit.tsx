import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface FormSubmitProps {
  children: ReactNode
  disabled?: boolean
  className?: string
  variants?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
}

const FormSubmit = ({
  children,
  variants,
  className,
  disabled,
}: FormSubmitProps) => {
 const {pending} = useFormStatus()
  return (
    <Button
      disabled={disabled || pending}
      variant={variants}
      size={'sm'}
      className={cn("",className)}
      type='submit'
    >
      {children}
    </Button>
  )
}

export default FormSubmit
