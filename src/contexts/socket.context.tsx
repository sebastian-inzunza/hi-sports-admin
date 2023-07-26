import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import useSocket from '@/hooks/useSocket'
import { Alert } from '@/types/alerts'
import { MappedPaginatorInfo } from '@/types'

interface SocketContextType {
  online: boolean
  alerts: any[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  limit: number
  paginatorInfo: MappedPaginatorInfo | null
  setPaginatorInfo: React.Dispatch<
    React.SetStateAction<MappedPaginatorInfo | null>
  >
}

const SocketContext = createContext<SocketContextType>({
  online: false,
  alerts: [],
  page: 1,
  setPage: () => {},
  limit: 10,
  paginatorInfo: null,
  setPaginatorInfo: () => {},
})

const URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:1337'

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = new Audio('./sounds/notification.mp3')
  const socketContext = useContext(SocketContext)
  const socket = useSocket(URL) // Replace with your Socket.io server URL

  const [page, setPage] = useState(1)

  socketContext.setPage = setPage

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socketContext.online = true
      })
      socket.on('disconnect', () => {
        socketContext.online = false
      })

      socket.on('new_alert', (alert: Alert) => {
        audio.play()
        toast.error(alert.content, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        socketContext.alerts.unshift(alert)
      })
    }
  }, [socket])

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = (): SocketContextType =>
  useContext(SocketContext)

export const useSockets = () => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error(`useSockets must be used within a SocketProvider`)
  }
  return context
}
