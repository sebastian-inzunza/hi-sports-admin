import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import MessagePageIndex from '@/components/message/index'

export default function MessagePage() {
  return (
    <>
      <MessagePageIndex />
    </>
  )
}

MessagePage.Layout = Layout

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
})
