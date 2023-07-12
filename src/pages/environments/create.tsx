import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/admin'
import CreateOrUpdateEnvironment from '@/components/environments/environment-form'

export default function CreateEnvironment() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Entornos</h1>
      </div>

      <CreateOrUpdateEnvironment />
    </>
  )
}

CreateEnvironment.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
