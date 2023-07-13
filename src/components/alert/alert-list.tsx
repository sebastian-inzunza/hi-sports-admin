import Image from 'next/image'
import { Table } from '../ui/table'
import Pagination from '../ui/pagination'

import { Alert, AlertStatus } from '@/types/alerts'
import { MappedPaginatorInfo } from '@/types/index'
import { siteSettings } from '@/settings/site.settings'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { formatDate } from '@/utils/format-date'
import colorBadge from '@/utils/colorBadge'
import { Routes } from '@/config/routes'

type AlertListProps = {
  alerts: Alert[] | null | undefined
  paginatorInfo?: MappedPaginatorInfo | null
  onPagination?: (page: number) => void
  seletedAlert?: (alert: Alert) => void
}

const AlertList = ({ alerts, paginatorInfo, onPagination }: AlertListProps) => {
  console.log('==== Getting alerts ====')
  console.log(alerts)
  console.log('==== Getting alerts ====')

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 50,
    },
    {
      title: 'Imágen',
      dataIndex: 'image',
      key: 'image',
      align: 'center' as AlignType,
      width: 60,
      render: (image: string) => (
        <Image
          src={image ?? siteSettings.logo.url}
          alt="Avatar"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: 'Mensaje',
      dataIndex: 'content',
      key: 'content',
      align: 'center' as AlignType,
      render: (text: string) => (
        // Create a label clean ui component
        <div
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
    },
    {
      title: 'Creado',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center' as AlignType,
      render: (date: string) => (
        <div className="text-sm text-gray-600">{formatDate(date)}</div>
      ),
    },
    {
      title: 'Última actualización',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center' as AlignType,
      render: (date: string) => (
        <div className="text-sm text-gray-600">{formatDate(date)}</div>
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'right' as AlignType,
      render: (id: string) => {
        return (
          <ActionButtons
            id={id}
            editModalView={'ALERT_EDIT'}
            deleteModalView={'ALERT_DELETE'}
            detailsUrl={Routes.alerts.details({ id })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table columns={columns} data={alerts ?? []} rowKey={'id'} />
      </div>
      {!!paginatorInfo && (
        <div>
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

export default AlertList
