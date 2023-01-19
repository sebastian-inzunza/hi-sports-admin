import Image from 'next/image'

import { Alert } from '@/types/alerts'
import { MappedPaginatorInfo } from '@/types/index'
import Badge from '../ui/badge'
import Pagination from '../ui/pagination'
import colorBadge from '@/utils/colorBadge'
import textAlertBadge from '@/utils/textAlertBadge'

type AlertListProps = {
  alerts: Alert[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
  seletedAlert: (alert: Alert) => void
}

const AlertList = ({
  alerts,
  paginatorInfo,
  onPagination,
  seletedAlert,
}: AlertListProps) => {
  function selectAlert(alert: Alert) {
    seletedAlert(alert)
  }

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        {/* Iteration to alerts list */}
        {alerts?.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-lg shadow-lg p-4 mt-2 pointer"
            onClick={() => selectAlert(alert)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-heading">{alert.id}</h2>
              <Badge
                text={textAlertBadge(alert.status)}
                color={colorBadge(alert.status)}
              />
            </div>
            {/* Detail of alert (date and address) */}
            <div className="flex items-center mt-2 space-x-2">
              <p className="text-sm text-body">23 Enero</p>
              {/* Bullet separator with talwindcss */}
              <span className="bg-body h-1 w-1 rounded-full bg-slate-600" />
              <p className="text-sm text-body">
                821 Av Patria, Guadalajara, Jal.
              </p>
            </div>
            {/* Description title */}
            <h3 className="text-sm text-heading mt-2">Comentario</h3>
            <p className="text-sm text-body mt-2">{alert.content}</p>

            {/* Created by user information */}
            <div className="flex items-center mt-2 space-x-2 text-sm text-body">
              <Image
                src="/avatar-placeholder.svg"
                alt="User"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm text-heading">Juan Perez</p>
                <p className="text-sm text-body">23 Enero</p>

                {/* Button to see more information */}
                <button className="text-sm text-body underline">Ver más</button>

                {/* Button to edit alert */}
                <button className="text-sm text-body underline ml-2">
                  Editar
                </button>

                {/* Button to delete alert */}
                <button className="text-sm text-body underline ml-2">
                  Eliminar
                </button>

                {/* Button to change status of alert */}
                <button className="text-sm text-body underline ml-2">
                  Cambiar estado
                </button>
              </div>
            </div>
          </div>
        ))}
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
