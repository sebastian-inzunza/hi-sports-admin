import Image from 'next/image'
import Pagination from '../ui/pagination'
import { Table } from '../ui/table'

import { siteSettings } from '@/settings/site.settings'
import { MappedPaginatorInfo } from '@/types'
import { Menu } from '@/types/menu'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'
import { useMeQuery } from '@/data/user'

type MenuListProps = {
  menus: Menu[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: string | number) => void
}
const CategoryList = ({
  menus,
  paginatorInfo,
  onPagination,
}: MenuListProps) => {
  console.log('Menus', menus)
  const { data } = useMeQuery()

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },

    {
      title: 'Nombre',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },

    {
      title: 'Dirección',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
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
            editUrl={Routes.menu.edit({ id })}
            deleteModalView={
              data?.role === 'ADMIN_MEDIA' ? '' : 'MODAL_LATERAL_MENU'
            }
            // detailsUrl={Routes.categories.details({ id })}
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
          data={menus}
          rowKey={'id'}
          emptyText={'No hay información que mostrar'}
        />
      </div>
      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={parseInt(paginatorInfo.currentPage)}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  )
}

export default CategoryList
