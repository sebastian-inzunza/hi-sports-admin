import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/admin'
import CreateOrUpdateNoticeForm from '@/components/notice/notice-form'

export default function CreateNotice() {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Avisos</h1>
      </div>
      <CreateOrUpdateNoticeForm />
    </>
  )
}

CreateNotice.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
