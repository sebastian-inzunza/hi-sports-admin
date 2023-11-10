import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ErrorMessage from '@/components/ui/error-message'
import Layout from '@/components/layout/admin'
import Loader from '@/components/ui/loader/loader'

import { usePublicidadByIdQuery } from '@/data/publicidad'
import PublicidadForm from '@/components/publicidad/publicidad-form'

export default function UpdateVideotecaPage() {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { publicidad, loading, error } = usePublicidadByIdQuery({
    id: query.id as string,
  })

  if (loading) return <Loader text={t('common:text-loading') ?? 'Loading...'} />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Editar Publicidad
        </h1>
      </div>
      <PublicidadForm defaultValues={publicidad} />
    </>
  )
}

UpdateVideotecaPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
