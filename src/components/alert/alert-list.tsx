import Image from 'next/image'

import { Alert } from '@/types/alerts'
import { MappedPaginatorInfo } from '@/types/index'
import Badge from '../ui/badge/badge'
import Pagination from '../ui/pagination'
import colorBadge from '@/utils/colorBadge'
import textAlertBadge from '@/utils/textAlertBadge'

type AlertListProps = {
  alerts: Alert[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
  seletedAlert?: (alert: Alert) => void
}

const AlertList = ({
  alerts,
  paginatorInfo,
  onPagination,
  seletedAlert,
}: AlertListProps) => {
  function selectAlert(alert: Alert) {
    // seletedAlert(alert)
  }

  return (
    <>
      <div
        className="mb-6 overflow-hidden rounded shadow"
        data-testid="container1"
      >
        {/* Iteration to alerts list */}
        {alerts?.map((alert) => (
          <div
            key={alert.id}
            className="mt-2 rounded-lg bg-white p-4 shadow-lg"
            data-testid="container2"
            // onClick={() => selectAlert(alert)}
          >
            <div
              className="flex items-center justify-between"
              data-testid="container3"
            >
              <h2
                className="text-lg font-semibold text-heading"
                data-testid="h2testid1"
              >
                {alert.id}
              </h2>
              <Badge
                text={textAlertBadge(alert.status)}
                color={colorBadge(alert.status)}
              />
            </div>
            {/* Detail of alert (date and address) */}
            <div
              className="mt-2 flex items-center space-x-2"
              data-testid="container4"
            >
              <p className="text-sm text-body">23 Enero</p>
              {/* Bullet separator with talwindcss */}
              <span className="bg-body h-1 w-1 rounded-full bg-slate-600" />
              <p className="text-sm text-body">
                821 Av Patria, Guadalajara, Jal.
              </p>
            </div>
            {/* Description title */}
            <h3 className="mt-2 text-sm text-heading" data-testid="container5">
              Comentario
            </h3>
            <p className="mt-2 text-sm text-body">{alert.content}</p>

            {/* Created by user information */}
            <div
              className="mt-2 flex items-center space-x-2 text-sm text-body"
              data-testid="container6"
            >
              <Image
                src="/avatar-placeholder.svg"
                alt="User"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="text-sm text-heading">Juan Perez</p>
                <p className="text-sm text-body">23 Enero</p>

                {/* Button to see more information */}
                <button
                  className="text-sm text-body underline"
                  data-testid="container7"
                  onClick={() => selectAlert(alert)}
                >
                  Ver más
                </button>

                {/* Button to change status of alert */}
                <button className="ml-2 text-sm text-body underline">
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
