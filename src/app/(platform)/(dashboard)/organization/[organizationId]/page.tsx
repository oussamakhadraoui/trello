'use client'

import { createBoard } from '@/actions/create-board'
import Test from '@/components/Test'
import FormInput from '@/components/form/FormInput'
import FormSubmit from '@/components/form/FormSubmit'
import { useAction } from '@/hooks/useAction'
import React from 'react'
import { useFormState } from 'react-dom'

interface pageProps {
  params: {
    organizationId: string
  }
}

const Page = ({ params: { organizationId } }: pageProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onError(error) {
      console.log(error)
    },
    onSuccess(data) {
      console.log(data)
    },
  })
  const OnSubmit = (FormData: FormData) => {
    const title = FormData.get('title') as string
    execute({ title })
  }

  return (
    <form action={OnSubmit}>
      <div className='flex flex-1 space-y-2'>
        <FormInput label='Board Title' errors={fieldErrors} id='title' />
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  )
}

export default Page
