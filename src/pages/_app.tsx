/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from 'next/app'
import '@/assets/css/main.css'

import { UIProvider } from '@/contexts/ui.context'

import type { NextPageWithLayout } from '@/types/index'
import DefaultSeo from '@/components/ui/default-seo'

type NoopProps = {
  children: React.ReactNode
}
const Noop = ({ children }: NoopProps) => <>{children}</>

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop

  return (
    <UIProvider>
      <DefaultSeo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  )
}
