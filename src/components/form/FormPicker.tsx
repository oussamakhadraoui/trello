'use client'
import { unsplash } from '@/lib/unSplash'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
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
  return (
    <div className='relative '>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 bg-muted transition',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return

              setSelectedImageId(image.id)
            }}
          >
            <Image
              fill
              src={image.urls.thumb}
              alt={"unsplash image"}
              className='object-cover rounded-sm'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormPicker
