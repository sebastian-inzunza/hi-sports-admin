import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Card from '@/components/common/card'
import Layout from '@/components/layout/admin'
import SuggestionList from '@/components/suggestions/suggestions-list'
import Loader from '@/components/ui/loader/loader'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LinkButton from '@/components/ui/link-button'
import { Routes } from '@/config/routes'
import Search from '@/components/common/search'
import ErrorMessage from '@/components/ui/error-message'
import { useSuggestionQuery } from '@/data/suggestions'

export default function Suggestions() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { suggestions, loading, error, paginatorInfo } = useSuggestionQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) return <Loader text="Cargando usuarios..." />

  if (error) return <ErrorMessage message={error.message} />

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <h1 className="text-xl font-semibold text-heading">
            Sugerencias
            {t('form:input-label-customers')}
          </h1>
        </div>
        <div className="flex w-full items-center ms-auto md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.suggestions.create}`}
            className="h-12 ms-4 md:ms-6"
          >
            <span>+ {t('form:button-label-add-customer')}</span>
          </LinkButton>
        </div>
      </Card>
      {loading ? null : (
        <SuggestionList
          suggestions={suggestions ?? []}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
        />
      )}
    </>
  )
}

Suggestions.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
