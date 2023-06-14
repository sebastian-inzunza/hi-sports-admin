/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSocket } from '@/hooks/useSocket'
import { createContext, ReactNode, useEffect } from 'react'
import { Socket } from 'socket.io-client'

const socketsUrl = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || ''

type SocketContextType = {
  socket: Socket | null
  online: boolean
  connectSocket: () => void
  disconnectSocket: () => void
  alert: any | null
  selectUser: (user: any) => void
  user: any | null
}
export const SocketContext = createContext<SocketContextType>(
  {} as SocketContextType
)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    alert,
    selectUser,
    user,
  } = useSocket(socketsUrl)

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
        connectSocket,
        disconnectSocket,
        alert,
        selectUser,
        user,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
