import type { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import AppLayout from '@/components/layout/app'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'
const AdminDashboard = dynamic(() => import('@/components/dashboard/admin'))

export default function Dashboard() {
  return <AdminDashboard />
}

Dashboard.Layout = AppLayout

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
