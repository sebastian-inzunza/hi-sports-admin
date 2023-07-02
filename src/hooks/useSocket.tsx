import { getAuthCredentials } from '@/utils/auth-utils'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const useSocket = (url: string) => {
  const { token } = getAuthCredentials()
  const [socket, setSocket] = useState<Socket | null>(null)

  console.log('==== useSocket read token ====')
  console.log(token)
  console.log('==== useSocket read token ====')

  useEffect(() => {
    const socketInstance = io(url, {
      auth: {
        authorization: token || undefined, // Pass the token if available
      },
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [url, token])

  return socket
}

export default useSocket
