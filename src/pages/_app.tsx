/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import '@/assets/css/main.css'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { UIProvider } from '@/contexts/ui.context'

import type { NextPageWithLayout } from '@/types/index'
import DefaultSeo from '@/components/ui/default-seo'
import { ModalProvider } from '@/components/ui/modal/modal.context'
import ManagedModal from '@/components/ui/modal/managed-modal'
import { SessionProvider } from 'next-auth/react'
import PrivateRoute from '@/utils/private-route'

type NoopProps = {
  children: React.ReactNode
}
const Noop = ({ children }: NoopProps) => <>{children}</>

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop
  const authProps = (Component as any).authenticate
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider>
          <UIProvider>
            <ModalProvider>
              <DefaultSeo />
              {authProps ? (
                <PrivateRoute authProps={authProps}>
                  <Layout {...pageProps}>
                    <Component {...pageProps} />
                  </Layout>
                </PrivateRoute>
              ) : (
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              )}

              <ToastContainer autoClose={2000} theme="colored" />
              <ManagedModal />
            </ModalProvider>
          </UIProvider>
          <ReactQueryDevtools />
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
