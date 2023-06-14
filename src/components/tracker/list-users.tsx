// Create a list of users to track with a map component

// Path: src/components/tracker/list-users.tsx

import { SocketContext } from '@/contexts/sockets.context'
import { UsersResponse } from '@/types/users'
import React, { useContext } from 'react'

type ListUsersProps = {
  className?: string
  users: UsersResponse[] | undefined
}
export default function ListUsers({ users }: ListUsersProps) {
  const { selectUser } = useContext(SocketContext)

  function handleSelectUser(user: UsersResponse) {
    selectUser(user)
  }

  return (
    // Content a list of user, error caused by overflow list scroll
    <div className="flex flex-col h-full">
      <ul className="max-h-full overflow-y-auto">
        {users?.map((user) => (
          <li
            className="flex flex-row items-center justify-between mb-1 p-4 bg-white rounded-lg shadow-sm cursor-pointer"
            key={user.id}
            onClick={() => handleSelectUser(user)}
          >
            <div className="flex flex-row items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="ml-2">
                <p className="text-sm font-semibold">{user.firstName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Path: src/pages/tracker/index.tsx
