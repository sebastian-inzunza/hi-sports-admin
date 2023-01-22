import { useState } from 'react'
import { GetServerSideProps } from 'next'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'
import Layout from '@/components/layout/admin'
import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import UserList from '@/components/user/user-list'
import { useUsersQuery } from '@/data/users'
import Loader from '@/components/ui/loader'
import ErrorMessage from '@/components/ui/error-message'

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { users, loading, error, paginatorInfo } = useUsersQuery({
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
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">Usuarios</h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton href={`/users/create`} className="ms-4 md:ms-6 h-12">
            <span>+ Crear usuario</span>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <UserList
          users={users ?? []}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
        />
      )}
    </>
  )
}

Users.Layout = Layout

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
