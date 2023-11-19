'use client'
import { unsplash } from '@/lib/unSplash'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

const FormPicker = ({ errors, id }: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })
        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>
          setImages(fetchedImages)
        } else {
          console.log('failed to get image from unsplash')
        }
      } catch (error) {
        console.log(error)
        setImages([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchImages()
  }, [])
  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
      </div>
    )
  }
  return <div>FormPicker</div>
}

export default FormPicker
