import React from 'react'
import { NoMessageFound } from '@/components/icons/no-message-found'

const MessageNotFound = ({ ...rest }) => {
  return (
    <>
      <div className="flex h-full" {...rest}>
        <div className="m-auto">
          <div className="mb-8">
            <NoMessageFound />
          </div>
          <p className="font-semibold text-[#686D73]">
            No messages found. Start a conversation with your customers.
          </p>
        </div>
      </div>
    </>
  )
}

export default MessageNotFound
