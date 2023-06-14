/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SocketRequest {
  path: string
  data: any
}

export interface SocketParams {
  user_id: number
  message: string
  type: string
}
