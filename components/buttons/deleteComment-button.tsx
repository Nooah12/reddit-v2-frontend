'use client'

import React from 'react'
import { Button } from './button'
import { deleteComment } from '@/actions/delete-comment'
import { useMutation } from '@tanstack/react-query'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { handleServerActionError, toastServerError } from '@/lib/error-handling'

export const DeleteCommentButton = ({commentId}: {commentId: string}) => {
    const {mutate} = useMutation({ 
        mutationFn: async() => {
          handleServerActionError(await deleteComment(commentId))
        },
        onError: toastServerError,
    })

  return (
    <Button onClick={() => mutate()} variant='primary' className='w-10 h-10 !px-2 scale-75 flex items-center justify-center'> 
      <FontAwesomeIcon icon={faTrash} />  
    </Button>
  )
}