import React, { createContext, useContext, useEffect } from 'react'
import useSound from 'use-sound'
import { toast } from 'react-toastify'

import useSocket from '@/hooks/useSocket'
import { Alert } from '@/types/alerts'
import { AlertPaginator, MappedPaginatorInfo } from '@/types'
import useAudio from '@/hooks/useAudio'

interface SocketContextType {
  online: boolean
  alerts: any[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  limit: number
  paginatorInfo: MappedPaginatorInfo | null
}

const SocketContext = createContext<SocketContextType>({
  online: false,
  alerts: [],
  paginatorInfo: null,
  page: 1,
  limit: 15,
  setPage: () => {},
})

const URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:1337'

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { audio, ready } = useAudio({ src: '/sounds/notification.mp3' })

  const socketContext = useContext(SocketContext)
  const socket = useSocket(URL) // Replace with your Socket.io server URL

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socketContext.online = true
      })
      socket.on('disconnect', () => {
        socketContext.online = false
      })

      socket.emit('user_connect', () => {})

      socket.emit('alerts', {
        page: socketContext.page,
        limit: socketContext.limit,
      })

      socket.on('all_alerts', (alerts: AlertPaginator) => {
        socketContext.alerts = alerts.data
        socketContext.paginatorInfo = alerts
      })

      socket.on('new_alert', (alert: Alert) => {
        toast.info(alert.content, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        if (ready) audio.play()
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
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`)
  }
  return context
}
