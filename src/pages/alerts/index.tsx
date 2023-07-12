import { useTranslation } from 'next-i18next'
import AppLayout from '@/components/layout/app'
import Card from '@/components/common/card'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSocketContext } from '@/contexts/socket.context'
import AlertList from '@/components/alert/alert-list'
import { useState } from 'react'

export default function Alerts() {
  const { t } = useTranslation()
  const { alerts, paginatorInfo, setPage } = useSocketContext()

  function handlePagination(current: number) {
    setPage(current)
  }

  console.log('===== alerts =====')
  console.log(alerts)
  console.log('===== alerts =====')
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-lg font-semibold text-heading">Alertas</h1>
        </div>
      </Card>

      <AlertList
        alerts={alerts}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
      />
    </>
  )
}

Alerts.Layout = AppLayout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
