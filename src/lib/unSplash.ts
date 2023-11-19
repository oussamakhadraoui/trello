import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY!,
  fetch: fetch,
})
