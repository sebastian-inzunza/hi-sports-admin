/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import cn from 'classnames'

interface Props {
  className?: string
  filterText?: any
  permission: boolean
}

const UserList = ({ permission, ...rest }: Props) => {
  return (
    <>
      <div
        className={cn('flex-auto', permission ? 'pb-6' : '')}
        {...rest}
      ></div>
    </>
  )
}

export default UserList
