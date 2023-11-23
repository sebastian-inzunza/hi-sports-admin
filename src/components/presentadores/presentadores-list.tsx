import Image from 'next/image'
import Pagination from '../ui/pagination'
import { Table } from '../ui/table'

import { siteSettings } from '@/settings/site.settings'
import { MappedPaginatorInfo } from '@/types'
import { Presentador } from '@/types/presentador'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'

type PresentadorListProps = {
  casts: Presentador[]
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const PresentadorList = ({
  casts,
  paginatorInfo,
  onPagination,
}: PresentadorListProps) => {
  console.log('presentadores', casts)

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Imágen',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <div className="flex justify-center">
          <Image
            src={image ?? siteSettings.logo.url}
            alt="Category Image"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      title: 'Nombre del presentador',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Ruta del presentador',
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
            editUrl={Routes.presentadores.edit({ id })}
            deleteModalView={'MODAL_CAST_BANNER'}
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
          data={casts}
          rowKey={'id'}
          emptyText={'No hay presentadores que mostrar'}
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

export default PresentadorList
