'use client'
import React, { forwardRef, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import FormError from './FormError'

interface FormInputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      className,
      defaultValue = '',
      disabled,
      errors,
      onBlur,
      placeholder,
      required,
      type,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
    
    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label ? (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutral-700'
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled || pending}
            required={required}
            onBlur={onBlur}
            className={cn('text-sm px-2 py-1 h-7', className)}
            ref={ref}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
