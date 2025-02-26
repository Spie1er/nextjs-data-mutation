'use client'

import FormSubmit from '@/components/form-submit'
import { useFormState } from 'react-dom'

const PostForm = ({ action }) => {
  const [state, formAction] = useFormState(action, {})

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <div className='form-control'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' />
          {state.title && <p style={{ color: 'red' }}>{state.title}</p>}
        </div>
        <div className='form-control'>
          <label htmlFor='image'>Image</label>
          <input
            type='file'
            accept='image/png, image/jpeg'
            id='image'
            name='image'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='content'>Content</label>
          <textarea id='content' name='content' rows='5' />
          {state.content && <p style={{ color: 'red' }}>{state.content}</p>}
        </div>
        <div className='form-actions'>
          <FormSubmit />
        </div>
      </form>
    </>
  )
}
export default PostForm
