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
      align: 'center' as AlignType,
    },
    {
      title: 'Sugerencia',
      dataIndex: 'content',
      key: 'content',
      align: 'center' as AlignType,
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
          title="Fecha de creación"
          ascending={true}
          isActive={false}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      render: (date: string) => new Date(date).toLocaleDateString(),
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
            detailsUrl={`${Routes.suggestions.details({ id })}`}
            deleteModalView={'DELETE_SUGGESTION'}
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
