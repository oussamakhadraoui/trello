'use server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as zod from 'zod'

const ValidationCreation = zod.object({
  titile: zod
    .string()
    .min(3, { message: 'Titile must be at least 3 characters' }),
})
export type State = {
  errors?: {
    titile?: string[] 
  }
  message?: string | null
}
export async function create(prevState: State, FormData: FormData) {
  const validation = ValidationCreation.safeParse({
    titile: FormData.get('titile'),
  })
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'missing fields',
    }
  }
  const { titile } = validation.data
  try {
    await db.oussama.create({
      data: {
        titile: titile,
      },
    })
  } catch (error) {
    console.log(error)
    return { message: 'Database Error' }
  }
  revalidatePath('/organization/org_2YFx6tSGhEkxI56VTwkHfWEdDqA')
  redirect('/organization/2566ADEEFGHISTVWY_dfghkkoqrtwxx')
}

export async function Delete(id: string) {
  await db.oussama.delete({
    where: {
      id: id,
    },
  })
  revalidatePath('/organization/org_2YFx6tSGhEkxI56VTwkHfWEdDqA')
}
