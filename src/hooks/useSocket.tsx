/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

import { useUI } from '@/contexts/ui.context'
import { getAuthCredentials } from '@/utils/auth-utils'
import { UserPagination, UsersResponse } from '@/types/users'

type GettingAlertType = {
  latitude?: number
  longitude?: number
  user_id: number
  content?: string
  image?: string
}

export const useSocket = (serverPath: string, namespace?: string) => {
  const { token } = getAuthCredentials()
  const [socket, setSocket] = useState<Socket | null>(null)
  const { openToaster } = useUI()
  const [alert, setAlert] = useState<GettingAlertType>()
  // User select to display on map
  const [user, setUser] = useState<any>()
  const [users, setUsers] = useState<UsersResponse[]>([])

  const [online, setOnline] = useState(false)

  const connectSocket = useCallback(() => {
    // If namespace is not defined, use the default namespace
    const socketServ = io(serverPath, {
      path: namespace || '/socket.io',
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      auth: {
        token: token,
      },
    })
    setSocket(socketServ)
  }, [serverPath])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  // Select the user to show the map with the user location.
  const selectUser = (user: any) => {
    setUser(user)
    if (socket) {
      socket.emit('tracker_by_user_id', {
        userId: user.id,
      })
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setOnline(socket.connected ? true : false)
      })
    }
    return () => {
      socket?.off('connect')
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on('new_alert', (alert: GettingAlertType) => {
        openToaster()
        setAlert(alert)
      })
    }
    return () => {
      socket?.off('new-alert')
    }
  }, [socket, alert])

  useEffect(() => {
    if (socket) {
      socket.on('users', (response: UserPagination) => {
        setUsers(response.users)
      })
    }
    return () => {
      socket?.off('users')
    }
  }, [socket, users])

  useEffect(() => {
    socket?.on('disconnect', () => {
      setOnline(false)
    })
    return () => {
      socket?.off('disconnect')
    }
  }, [socket])

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    alert,
    selectUser,
    user,
    users,
  }
}
