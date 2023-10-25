import React, { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/admin'
import Card from '@/components/common/card'
import Search from '@/components/common/search'
import ErrorMessage from '@/components/ui/error-message'
import LinkButton from '@/components/ui/link-button'
import Loader from '@/components/ui/loader/loader'
import { Routes } from '@/config/routes'
import MenuList from '@/components/Menu/menu-list'
import { useMenuQuery } from '@/data/menu'

type Props = {}

function Menu({}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { menu, error, loading, paginatorInfo } = useMenuQuery({
    limit: 10,
    page,
    search: searchTerm,
  })

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
          <h1 className="text-lg font-semibold text-heading">Menu</h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${Routes.menu.create}`}
            className="ms-4 h-12 bg-purple-900  hover:bg-purple-300 md:ms-6 "
          >
            <span>+ Crear</span>
          </LinkButton>
        </div>
      </Card>
      <MenuList
        menus={menu ?? []}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default Menu

Menu.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
