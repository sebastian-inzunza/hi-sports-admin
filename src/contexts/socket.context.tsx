import React, { createContext, useContext, useEffect } from 'react'
import useSound from 'use-sound'
import { toast } from 'react-toastify'

import useSocket from '@/hooks/useSocket'
import { Alert } from '@/types/alerts'

interface SocketContextType {
  online: boolean
  alerts: any[]
}

const SocketContext = createContext<SocketContextType>({
  online: false,
  alerts: [],
})

const URL = process.env.NEXT_PUBLIC_REST_API_ENDPOINT || 'http://localhost:1337'

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [play] = useSound('/sounds/notification.mp3')

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

      socket.on('all_alerts', (alert) => {
        socketContext.alerts = alert
      })

      socket.on('new_alert', (alert: Alert) => {
        console.log('new_alert', alert)
        toast.info(alert.content, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        })
        play()
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
