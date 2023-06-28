import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { SUPER_ADMIN } from '@/utils/constants'
import { Routes } from '@/config/routes'
import { Config } from '@/config'
import AppLayout from '@/components/layout/app'

const AdminDashboard = dynamic(() => import('@/components/dashboard/admin'))

export default function Dashboard({
  userPermissions,
}: {
  userPermissions: string
}) {
  return <AdminDashboard />
  // if (userPermissions === SUPER_ADMIN) {
  //   // return <AdminDashboard />
  // }
  // return (
  //   <>
  //     <h1>Dashboard</h1>
  //   </>
  // )
}

Dashboard.Layout = AppLayout

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx
  // TODO: Improve it
  const generateRedirectUrl =
    locale !== Config.defaultLanguage
      ? `/${locale}${Routes.login}`
      : Routes.login
  const { token, permissions } = getAuthCredentials(ctx)
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: generateRedirectUrl,
        permanent: false,
      },
    }
  }
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
          'table',
          'widgets',
        ])),
        userPermissions: permissions,
      },
    }
  }
  return {
    props: {
      userPermissions: permissions,
    },
  }
}
