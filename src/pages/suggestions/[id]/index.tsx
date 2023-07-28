import Layout from '@/components/layout/admin'
import SuggestionDetailView from '@/components/suggestions/suggestion-detail-view'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useReviewsQuery } from '@/data/suggestions'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function SuggestionPage() {
  const { query } = useRouter()
  const { t } = useTranslation()

  const {
    data,
    isLoading: loading,
    error,
  } = useReviewsQuery(query.id as string)
  if (loading) return <Loader text={t('common:text-loading') ?? ''} />
  if (error) return <ErrorMessage message={error.message} />

  return <SuggestionDetailView suggestion={data!} />
}
SuggestionPage.Layout = Layout
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form', 'table'])),
  },
})
