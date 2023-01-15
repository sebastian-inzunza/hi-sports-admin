import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { UIProvider } from '@/contexts/ui.context'
import DefaultSeo from '@/components/ui/default-seo'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <UIProvider>
        <DefaultSeo />
        <Component {...pageProps} />
      </UIProvider>
    </div>
  )
}
