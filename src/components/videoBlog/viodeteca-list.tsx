import Image from 'next/image'
import Pagination from '../ui/pagination'
import { Table } from '../ui/table'
import Badge from '../ui/badge/badge'
import StatusColor from './videoBlog-banned-color'

import { siteSettings } from '@/settings/site.settings'
import { MappedPaginatorInfo } from '@/types'
import { VideoBlog } from '@/types/videoBlog'
import { formatDate } from '@/utils/format-date'
import ActionButtons from '../ui/action-buttons'
import { Routes } from '@/config/routes'
import { useMeQuery } from '@/data/user'

type VideoBlogListProps = {
  videoBlogs: VideoBlog[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (current: number) => void
}
const VideoBLogList = ({
  videoBlogs,
  paginatorInfo,
  onPagination,
}: VideoBlogListProps) => {
  console.log('videoblog', videoBlogs)

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
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
    },
    {
      title: 'Estatus',
      dataIndex: 'banned',
      key: 'banned',
      align: 'center' as AlignType,
      render: (banned: true) => (
        <Badge
          text={!banned ? 'Inactivo' : 'Activo'}
          color={StatusColor(!banned)}
        />
      ),
    },

    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id: string, videoBlog: VideoBlog) => {
        return (
          <ActionButtons
            id={id}
            editUrl={Routes.videoBlog.edit({ id })}
            deleteModalView={
              data?.role === 'ADMIN_MEDIA' ? '' : 'MODAL_VIDEOBLOG_BANNER'
            }
            videoBlogStatus={data?.role === 'ADMIN_MEDIA' ? false : true}
            isVideoBlogrActive={videoBlog.banned}
            // detailsUrl={Routes.blog.details({ id: note.slug }) + '/' + 'details'}
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
          data={videoBlogs ?? []}
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

export default VideoBLogList
