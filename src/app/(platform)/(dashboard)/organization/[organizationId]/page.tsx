"use client"
import {  create } from '@/actions/Create'
import React from 'react'
import { useFormState } from 'react-dom'


interface pageProps {
  params: {
    organizationId: string
  }
}

const Page = ({ params: { organizationId } }: pageProps) => {
  const initial = {message:null,errors:{}}
  const [state, dispatch] = useFormState(create,initial)
  

  return (
    <div>
      {/* <OrganizationSwitcher /> */}

      <form action={dispatch}>
        <input name='titile' id='titile' type='text' placeholder='search' />
        {state?.errors?.titile && <div>{state.errors?.titile}</div>}
        <button type='submit'>Search</button>
      </form>

    </div>
  )
}

export default Page
