import { GetServerSideProps } from 'next'
import { useState } from 'react'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'

import Card from '@/components/common/card'
import Layout from '@/components/layout/admin'
import SuggestionList from '@/components/suggestions/suggestions-list'
import { useSuggestionsQuery } from '@/data/suggestions'
import Loader from '@/components/ui/loader'
import ErrorMessage from '@/components/ui/error-message'

export default function Suggestions() {
  const [page, setPage] = useState(1)

  const { suggestions, paginatorInfo, loading, error } = useSuggestionsQuery({
    limit: 5,
    page,
  })

  if (loading) return <Loader text="Cargando sugerencias" />
  if (error) return <ErrorMessage message={error.message} />

  function handlePagination(current: number) {
    setPage(current)
  }

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <h1 className="text-xl font-semibold text-heading">Sugerencias</h1>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx)
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: Routes.login,
        permanent: false,
      },
    }
  }
  return {
    props: {
      userPermissions: permissions,
    },
  }
}
