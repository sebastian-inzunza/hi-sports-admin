import { DefaultSeo as NextDefaultSeo } from 'next-seo'

const DefaultSeo = () => {
  return (
    <NextDefaultSeo
      title="Kali Connect - Admin Dashboard"
      description="Kali Connect - Admin Dashboard"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: 'https://kali-connect.vercel.app/',
        site_name: 'Kali Connect - Admin Dashboard',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 maximum-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'apple-touch-icon',
          href: 'icons/apple-icon-180.png',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
    />
  )
}

export default DefaultSeo
