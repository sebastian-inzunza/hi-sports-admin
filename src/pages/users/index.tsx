import Layout from '@/components/layout/admin'

import { useSuggestionsQuery } from '@/data/suggestions'

import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import UserList from '@/components/user/user-list'

export default function Users() {
  const { suggestions, loading, error } = useSuggestionsQuery()

  console.log('Sugesstions', suggestions)
  console.log('Loading', loading)
  console.log('Error', error)

  function handleSearch({ searchText }: { searchText: string }) {
    console.log(searchText)
  }

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">Usuarios</h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton href={`#`} className="ms-4 md:ms-6 h-12">
            <span>+ Crear usuario</span>
          </LinkButton>
        </div>
      </Card>

      <UserList />
    </>
  )
}

Users.Layout = Layout
