import React, { ElementRef, forwardRef, useRef } from 'react'
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { FormTextarea } from '../form/formTextArea'
import FormSubmit from '../form/FormSubmit'
import { useAction } from '@/hooks/useAction'
import { createCard } from '@/actions/create-card'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
  listId: string

  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`)
        formRef.current?.reset()
        disableEditing()
      },
      onError: (error) => {
        toast.error(error)
      },
    })
    const onSubmit = (formData: FormData) => {
      const title = formData.get('title') as string
      const boardId = params.boardId as string
      const listId = formData.get('listId') as string
      execute({ title, listId, boardId })
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        disableEditing()
      }
    }
   useOnClickOutside(formRef,disableEditing)
   useEventListener('keydown', onKeyDown)
   const onTextareaKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        formRef.current?.requestSubmit()
      }
    }
    
    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className='m-1 py-0.5 px-1 space-y-4'
        >
          <FormTextarea
            id='title'
            placeholder='Enter a title for this card'
            ref={ref}
            className='w-full'
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
          />
          <input
            type='text'
            hidden
            id={'listId'}
            value={listId}
            name='listId'
          />
          <div className='flex items-center gap-x-1'>
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size='sm' variant={'ghost'}>
              <X className='w-5 h-5' />
            </Button>
          </div>
        </form>
      )
    }
    return (
      <div className='pt-2 px-2'>
        <Button
          onClick={enableEditing}
          className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm '
          size={'sm'}
          variant={'ghost'}
        >
          <Plus className='w-4 h-4 mr-2' /> Add Card
        </Button>
      </div>
    )
  }
)
CardForm.displayName = 'CardForm'
export default CardForm
