import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ErrorMessage from '@/components/ui/error-message'
import Layout from '@/components/layout/admin'
import Loader from '@/components/ui/loader/loader'

import { useVideoBlogByIdQuery } from '@/data/videoBlog'
import VideotecaForm from '@/components/videoBlog/videblog-form'

export default function UpdateVideoBlogPage() {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { videoBlog, loading, error } = useVideoBlogByIdQuery({
    id: query.id as string,
  })

  if (loading) return <Loader text={t('common:text-loading') ?? 'Loading...'} />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Editar videoBlog</h1>
      </div>
      <VideotecaForm defaultValues={videoBlog} />
    </>
  )
}

UpdateVideoBlogPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
