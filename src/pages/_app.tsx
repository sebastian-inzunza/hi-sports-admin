/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'
import '@/assets/css/main.css'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

import { UIProvider } from '@/contexts/ui.context'

import type { NextPageWithLayout } from '@/types/index'
import DefaultSeo from '@/components/ui/default-seo'
import { ModalProvider } from '@/components/ui/modal/modal.context'
import ManagedModal from '@/components/ui/modal/managed-modal'

type NoopProps = {
  children: React.ReactNode
}
const Noop = ({ children }: NoopProps) => <>{children}</>

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UIProvider>
          <ModalProvider>
            <DefaultSeo />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer autoClose={2000} theme="colored" />
            <ManagedModal />
          </ModalProvider>
        </UIProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  )
}
