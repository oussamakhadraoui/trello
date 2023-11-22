import React, { forwardRef } from 'react'
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { FormTextarea } from '../form/formTextArea'
import FormSubmit from '../form/FormSubmit'

interface CardFormProps {
  listId: string

  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
   if(isEditing){
    return <form className='m-1 py-0.5 px-1 space-y-4'>

     <FormTextarea
      id='title'
      placeholder='Enter a title for this card'
      ref={ref}
      className='w-full'
      onKeyDown={()=>{}}
    />
    <input type="text" hidden id={"listId"} value={listId} name='listId' />
    <div className='flex items-center gap-x-1'>
     <FormSubmit>Add card</FormSubmit>
     <Button onClick={disableEditing} size="sm" variant={"ghost"}><X className='w-5 h-5'/></Button>
    </div>
    </form>
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
