import { Table } from '../ui/table'

import { Alert } from '@/types/alerts'
import ActionButtons from '../ui/action-buttons'
import { AlignType } from 'rc-table/lib/interface'
import { Routes } from '@/config/routes'
import { StoreStatus } from '@/types'
import Badge from '../ui/badge/badge'
import colorBadge from '@/utils/colorBadge'

type AlertListProps = {
  alerts: Alert[] | null | undefined
  title: string
}

const AlertListSmall = ({ alerts, title }: AlertListProps) => {
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as AlignType,
    },
    {
      title: 'Mensaje',
      dataIndex: 'content',
      key: 'content',
      align: 'center' as AlignType,
    },
    {
      title: 'Estatus',
      dataIndex: 'status',
      key: 'statis',
      align: 'center',
      render: (status: StoreStatus) => (
        <Badge text={status} color={colorBadge(status)} />
      ),
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (_id: number, user: any) => {
        return (
          <ActionButtons
            id={user?.id}
            detailsUrl={Routes.alerts.details({ id: user.id?.toString() })}
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="overflow-hidden rounded shadow">
        <h3 className="border-b border-border-200 bg-light px-4 py-3 text-center font-semibold text-heading">
          {title}
        </h3>
        <Table
          columns={columns}
          data={alerts ?? []}
          rowKey="id"
          scroll={{ x: 200 }}
        />
      </div>
    </>
  )
}

export default AlertListSmall
