/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'

import Search from '@/components/common/search'
import Layout from '@/components/layout/admin'
import { useAlertsQuery } from '@/data/alert'
import Loader from '@/components/ui/loader'
import ErrorMessage from '@/components/ui/error-message'
import AlertList from '@/components/alert/alert-list'
import AlertMap from '@/components/alert/alert-map'
import { Alert } from '@/types/alerts'
import Badge from '@/components/ui/badge'
import colorBadge from '@/utils/colorBadge'
import textAlertBadge from '@/utils/textAlertBadge'
import AlertAnimation from '@/components/alert/alert-animation'
import { Routes } from '@/config/routes'
import { SocketContext } from '@/contexts/sockets.context'

export default function Alerts() {
  const { online, alert } = useContext(SocketContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [showAlert, setShowAlert] = useState<Alert | null>()

  const {
    alerts: alertsData,
    error,
    loading,
    paginatorInfo,
  } = useAlertsQuery({
    limit: 5,
    page,
    search: searchTerm,
  })

  if (loading) {
    return <Loader text="Cargando alertas..." />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    setPage(current)
  }

  function selectAlert(alert: Alert) {
    setShowAlert(alert)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="flex justify-between">
            <Search onSearch={handleSearch} />
            <div className="flex items-center ml-4 space-x-2">
              <button className="bg-white shadow-lg p-2 rounded-md">
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
            {/* Status */}
            <div className="flex items-center ml-4 space-x-2">
              <span className="text-sm text-gray-500">
                {online ? 'Conectado' : 'Desconectado'}
              </span>
              <span
                className={`${
                  online ? 'bg-green-500' : 'bg-red-500'
                } w-3 h-3 rounded-full`}
              />
            </div>
          </div>

          <AlertList
            alerts={alertsData}
            paginatorInfo={paginatorInfo}
            onPagination={handlePagination}
            seletedAlert={selectAlert}
          />
        </div>
        <div className="col-span-1">
          {showAlert && (
            <div className="bg-white rounded-lg shadow-lg p-4 mt-2 mb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-heading">
                  {showAlert.id}
                </h2>
                <Badge
                  text={textAlertBadge(showAlert.status)}
                  color={colorBadge(showAlert.status)}
                />
              </div>
              <p className="text-sm text-gray-500">{showAlert.content}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  {new Date(showAlert.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                {showAlert.image && (
                  <Link href={showAlert.image} target="_blank" rel="noreferrer">
                    <span className="text-sm text-gray-500 underline cursor-pointer">
                      Ver imágen
                    </span>
                  </Link>
                )}
              </div>
            </div>
          )}
          {!showAlert && (
            <>
              <div className="p-4 mt-2 mb-3 flex flex-col items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-4 mt-2 mb-3">
                  <p className="text-sm text-gray-500 mt-2">
                    Selecciona una alerta para ver el detalle y geolocalización
                  </p>
                </div>
                <AlertAnimation />
              </div>
            </>
          )}
          {
            // If the admin select an alert, show AlertMap component
            showAlert && (
              <AlertMap lat={alert?.latitude} lng={alert?.longitude} />
            )
          }
        </div>
      </div>
    </>
  )
}

Alerts.Layout = Layout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx)
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: Routes.login,
        permanent: false,
      },
    }
  }
  return {
    props: {
      userPermissions: permissions,
    },
  }
}
