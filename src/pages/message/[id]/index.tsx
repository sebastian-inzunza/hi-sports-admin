import Layout from '@/components/layout/admin'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { adminOnly } from '@/utils/auth-utils'
import MessagePageIndex from '@/components/message/index'

export default function MessagePage() {
  return (
    <>
      <MessagePageIndex />
    </>
  )
}
MessagePage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
