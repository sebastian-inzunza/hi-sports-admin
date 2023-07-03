/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { Table } from '@/components/ui/table'

import { siteSettings } from '@/settings/site.settings'
import { SuggestionsResponse, User } from '@/types/suggestions'
import TitleWithSort from '../ui/title-with-sort'
import LanguageSwitcher from '../ui/lang-action/action'
import { Routes } from '@/config/routes'
import Pagination from '../ui/pagination'

type SuggestionListProps = {
  suggestions: SuggestionsResponse[]
  // paginatorInfo: MappedPaginatorInfo | null
  // onPagination: (current: number) => void
}
const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  console.log('suggestions', suggestions)
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'user',
      key: 'user',
      width: 120,
      render: (user: User) => {
        return (
          <Image
            src={user?.image ?? siteSettings.logo.url}
            alt={user?.name ?? 'Avatar'}
            width={60}
            height={60}
            className="overflow-hidden rounded"
          />
        )
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'user',
      key: 'user',
      width: 300,
      render: (record: User) => {
        return (
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-heading">
                {record?.name}
              </span>
              <span className="text-xs text-gray-500">{record?.email}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Sugerencia',
      dataIndex: 'content',
      key: 'content',
      width: 350,
      render: (suggestion: string) => {
        return (
          <div className="flex items-center">
            <div className="flex flex-col">
              {/* Add text overlow */}
              <span className="text-ellipsis text-sm font-semibold text-heading">
                {suggestion}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      title: (
        <TitleWithSort
          title="Miembro desde"
          ascending={true}
          isActive={false}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (registration: User) => {
        return (
          <span>
            {new Date(registration?.registration).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string, record: any) => {
        console.log('record', record)
        return (
          <LanguageSwitcher
            id={id}
            slug={record.slug}
            record={record}
            routes={Routes.suggestions}
            deleteModalView="DELETE_SUGGESTION"
          />
        )
      },
    },
  ]
  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          rowClassName="align-top"
          emptyText={'No hay sugerencias'}
          data={suggestions}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {/* {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )} */}
    </>
  )
}

export default SuggestionList
