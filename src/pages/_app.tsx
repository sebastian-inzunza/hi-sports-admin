import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { appWithTranslation } from 'next-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/assets/css/main.css'
import PrivateRoute from '@/utils/private-route'
import { UIProvider } from '@/contexts/ui.context'
import { ModalProvider } from '@/components/ui/modal/modal.context'
import DefaultSeo from '@/components/ui/default-seo'

const Noop: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>{children}</>
)

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const authProps = (Component as any).authenticate
  const Layout = (Component as any).Layout || Noop

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UIProvider>
          <ModalProvider>
            <>
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
            </>
            <ToastContainer autoClose={2000} theme="colored" />
          </ModalProvider>
        </UIProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
