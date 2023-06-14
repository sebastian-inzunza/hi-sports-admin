import { io, Socket } from 'socket.io-client'

export const socket: Socket = io('https://kali-connect-api.herokuapp.com')

type CreateSocketOptions = {
  socketIOUrl: string
  onConnect: () => void
  onDisconnect: () => void
}

export const createSocket = ({
  socketIOUrl,
  onConnect,
  onDisconnect,
}: CreateSocketOptions) => {
  const socket = io(socketIOUrl)

  socket.on('connect', () => {
    onConnect()
  })

  socket.on('disconnect', () => {
    onDisconnect()
  })

  return socket
}
