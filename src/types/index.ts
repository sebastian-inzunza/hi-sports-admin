/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'

export interface LoginInput {
  email: string
  password: string
}

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
