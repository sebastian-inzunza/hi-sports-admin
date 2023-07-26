import Image from 'next/image'
import Pagination from '../ui/pagination'
import { Table } from '../ui/table'

import { siteSettings } from '@/settings/site.settings'
import { MappedPaginatorInfo } from '@/types'
import { Category } from '@/types/category'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'

type CategoryListProps = {
  categories: Category[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const CategoryList = ({
  categories,
  paginatorInfo,
  onPagination,
}: CategoryListProps) => {
  console.log('categories', categories)

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Imágen',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <Image
          src={image ?? siteSettings.logo.url}
          alt="Category Image"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Título',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date: string) => <span>{formatDate(date)}</span>,
    },
    {
      title: 'Actualizado',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      render: (date: string) => <span>{formatDate(date)}</span>,
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            editUrl={Routes.categories.edit({ id })}
            deleteModalView={'MODAL_DELETE_CATEGORY_VIEW'}
            detailsUrl={Routes.categories.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={categories} rowKey={'id'} />
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

export default CategoryList
