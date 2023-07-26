import AppLayout from '@/components/layout/app'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPaths } from 'next'
import CreateOrUpdateEnvironment from '@/components/environments/environment-form'
import { useGetEnvironment } from '@/data/enviroment'
import { useRouter } from 'next/router'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'

export default function EnvironmentDetail() {
  const router = useRouter()
  const {
    query: { id },
  } = router
  const { data, error, loading } = useGetEnvironment({
    id: id?.toString() ?? '',
  })

  if (loading) return <Loader text="Cargando entorno..." />

  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Actualiza el entorno
        </h1>
      </div>
      <CreateOrUpdateEnvironment initialValues={data} />
    </>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

EnvironmentDetail.Layout = AppLayout
