import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ErrorMessage from '@/components/ui/error-message'
import Layout from '@/components/layout/admin'
import Loader from '@/components/ui/loader/loader'

import { useMenuByIdQuery } from '@/data/menu'
import MenuForm from '@/components/Menu/menu-form'

export default function UpdateMenuPage() {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { menu, loading, error } = useMenuByIdQuery({
    id: query.id as string,
  })

  if (loading) return <Loader text={t('common:text-loading') ?? 'Loading...'} />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Editar Menú</h1>
      </div>
      <MenuForm defaultValues={menu} />
    </>
  )
}

UpdateMenuPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
