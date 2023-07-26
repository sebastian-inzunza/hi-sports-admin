import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ErrorMessage from '@/components/ui/error-message'
import Layout from '@/components/layout/admin'
import Loader from '@/components/ui/loader/loader'
import CreateOrUpdateNoticeForm from '@/components/notice/notice-form'

import { useStoreNoticeQuery } from '@/data/store-notice'
import { useCategoryByIdQuery } from '@/data/category'
import CategoryForm from '@/components/category/category-form'

export default function UpdateCategoriePage() {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { category, loading, error } = useCategoryByIdQuery({
    id: query.id as string,
  })

  if (loading) return <Loader text={t('common:text-loading') ?? 'Loading...'} />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-category')}
        </h1>
      </div>
      <CategoryForm defaultValues={category} />
    </>
  )
}

UpdateCategoriePage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
