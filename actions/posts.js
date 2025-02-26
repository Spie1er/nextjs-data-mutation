'use server'
import { redirect } from 'next/navigation'
import { storePost, updatePostLikeStatus } from '@/lib/posts'
import { uploadImage } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'

export const createPost = async (prevState, formData) => {
  const title = formData.get('title')
  const image = formData.get('image')
  const content = formData.get('content')

  const errors = {
    title: !title || title.trim().length === 0 ? 'Required field' : undefined,
    content:
      !content || content.trim().length === 0 ? 'Required field' : undefined,
  }

  if (Object.values(errors).some((error) => error !== undefined)) {
    return errors
  }

  let imageUrl

  try {
    imageUrl = await uploadImage(image)
  } catch (err) {
    throw new Error('Image upload failed')
  }

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  })

  revalidatePath('/', 'layout')
  redirect('/feed')
}

export const togglePostLikeStatus = async (postId) => {
  await updatePostLikeStatus(postId, 2)
  revalidatePath('/', 'layout')
}
