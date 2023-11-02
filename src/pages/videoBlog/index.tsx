import React, { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/admin'
import Card from '@/components/common/card'
import Search from '@/components/common/search'
import LinkButton from '@/components/ui/link-button'
import VideoBlogList from '@/components/videoBlog/viodeteca-list'

import Loader from '@/components/ui/loader/loader'
import { Routes } from '@/config/routes'
import { useVideoBlogQuery } from '@/data/videoBlog'

function VideoBlog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  const { VideoBlog, error, loading, paginatorInfo } = useVideoBlogQuery({
    limit: 10,
    page,
    search: searchTerm,
  })

  function handleSearch({ searchText }: { searchText: string }) {
    console.log(searchText)
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
          <h1 className="text-lg font-semibold text-heading">Video blogs</h1>
        </div>

        <div className="ms-auto flex w-full items-center md:w-3/4">
          <Search onSearch={handleSearch} />
          {VideoBlog?.length <= 4 ? (
            <LinkButton
              href={`${Routes.videoBlog.create}`}
              className="ms-4 h-12 bg-purple-900  hover:bg-purple-300 md:ms-6 "
            >
              <span>+ Crear Video blog</span>
            </LinkButton>
          ) : (
            <span className=" mx-3 rounded-md bg-red-500 p-2 text-white">
              El maximo son 5, edita uno o eliminalo
            </span>
          )}
        </div>
      </Card>
      <VideoBlogList
        videoBlogs={VideoBlog}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

export default VideoBlog

VideoBlog.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
})
