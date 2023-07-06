/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { Table } from '@/components/ui/table'

import { siteSettings } from '@/settings/site.settings'
import { SuggestionsResponse, User } from '@/types/suggestions'
import TitleWithSort from '../ui/title-with-sort'
import LanguageSwitcher from '../ui/lang-action/action'
import { Routes } from '@/config/routes'
import Pagination from '../ui/pagination'
import { MappedPaginatorInfo } from '@/types'
import { AlignType } from 'rc-table/lib/interface'
import ActionButtons from '../ui/action-buttons'

type SuggestionListProps = {
  suggestions: SuggestionsResponse[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const SuggestionList = ({
  suggestions,
  paginatorInfo,
  onPagination,
}: SuggestionListProps) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Sugerencia',
      dataIndex: 'content',
      key: 'content',
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
      render: (registration: SuggestionsResponse) => {
        return (
          // Format like 2023-07-06T00:02:15.622Z
          <span>
            {new Date(registration.createdAt).toLocaleDateString('es-ES', {
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
      align: 'center' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            userStatus={true}
            showMakeAdminButton={true}
            showContact={true}
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

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default SuggestionList
