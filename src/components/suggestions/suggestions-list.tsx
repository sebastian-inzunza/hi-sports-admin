/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { AlignType, Table } from '@/components/ui/table'

import { siteSettings } from '@/settings/site.settings'
import TitleWithSort from '../ui/title-with-sort'
import Pagination from '../ui/pagination'
import {
  MappedPaginatorInfo,
  Suggestion,
  SuggestionByUser as User,
} from '@/types/index'
import ActionButtons from '../ui/action-buttons'

type SuggestionListProps = {
  suggestions: Suggestion[]
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
      title: 'Avatar',
      dataIndex: 'user',
      key: 'user',
      align: 'center' as AlignType,
      render: (user: User) => {
        return (
          <Image
            src={user?.image ?? siteSettings.logo.url}
            alt={user?.firstName ?? 'Avatar'}
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
      align: 'center' as AlignType,
      width: 200,
      render: (record: User) => {
        return (
          <div className="flex items-center">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-heading">
                {record?.firstName} {record?.lastName}
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
      render: (suggestion: string) => {
        return (
          <div className="flex items-center">
            <div className="flex flex-col">
              {/* Add text overlow */}
              <span className="text-sm font-semibold text-heading text-ellipsis">
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
      align: 'center' as AlignType,
      key: 'user',
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
      align: 'center' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            deleteModalView="DELETE_SUGGESTION"
            showSuggestion={true}
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
          emptyText={'No hay sugerencias'}
          data={suggestions}
          rowKey="id"
        />
      </div>

      {/* Pagination */}
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
