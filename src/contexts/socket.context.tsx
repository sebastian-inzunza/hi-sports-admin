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

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [play] = useSound('/sounds/notification.mp3')

  const socketContext = useContext(SocketContext)
  const socket = useSocket('http://localhost:1337') // Replace with your Socket.io server URL

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socketContext.online = true
      })
      socket.on('disconnect', () => {
        socketContext.online = false
      })
      socket.on('all_alerts', (alert) => {
        console.log('all_alerts', alert)
        socketContext.alerts.push(alert)
      })

      socket.on('new_alert', (alert: Alert) => {
        console.log('new_alert', alert)
        toast.warning(alert.content, {
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
