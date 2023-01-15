/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/assets/css/main.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import type { NextPageWithLayout } from '@/types/index'
import { UIProvider } from '@/contexts/ui.context'
import DefaultSeo from '@/components/ui/default-seo'
import { Config } from '@/config/index'

type NoopProps = {
  children: React.ReactNode
}
const Noop = ({ children }: NoopProps) => <>{children}</>

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop
  const { locale } = useRouter()
  const dir = Config.getDirection(locale)

  return (
    <div dir={dir}>
      <UIProvider>
        <DefaultSeo />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </div>
  )
}
