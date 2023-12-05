import Image from 'next/image'
import Pagination from '../ui/pagination'
import { Table } from '../ui/table'

import { siteSettings } from '@/settings/site.settings'
import { MappedPaginatorInfo } from '@/types'
import { Videoteca } from '@/types/videoteca'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'
import { useMeQuery } from '@/data/user'

type VideotecaListProps = {
  videotecas: Videoteca[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const VideotecaList = ({
  videotecas,
  paginatorInfo,
  onPagination,
}: VideotecaListProps) => {
  console.log('videotecas', videotecas)
  const { data } = useMeQuery()

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <div className="flex justify-center">
          <Image
            src={image ?? siteSettings.logo.url}
            alt="Banner Image"
            width={40}
            height={40}
          />
        </div>
      ),
    },
    {
      title: 'Direccion',
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
            editUrl={Routes.videoteca.edit({ id })}
            deleteModalView={
              data?.role === 'ADMIN_MEDIA' ? '' : 'MODAL_VIDEOTECA_BANNER'
            }
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
          data={videotecas ?? []}
          rowKey={'id'}
          emptyText={'No hay banner que mostrar'}
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

export default VideotecaList
