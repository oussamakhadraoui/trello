'use client'
import { defaultImage } from '@/constant/images'
import { unsplash } from '@/lib/unSplash'
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import FormError from './FormError'

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
        throw Error('failed to get image from unsplash')
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
        setImages(defaultImage)
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
            <input type='radio' id={id} name={id} value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`} className='hidden' checked={selectedImageId === image.id}
            disabled={pending}/>
            <Image
              fill
              src={image.urls.thumb}
              alt={'unsplash image'}
              className='object-cover rounded-sm'
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 w-full h-full bg-black flex items-center justify-center'>
                <Check className='h-4 w-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormError id='image' errors={errors}/>
    </div>
  )
}

export default FormPicker
