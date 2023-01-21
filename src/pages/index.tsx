import dynamic from 'next/dynamic'
import AppLayout from '@/components/layout/app'
import { useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { Routes } from '@/config/routes'
const AdminDashboard = dynamic(() => import('@/components/dashboard/admin'))

export default function Dashboard() {
  const { data: session } = useSession()
  // If no session exists, display access denied message
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 text-center">
        <h1 className="text-4xl font-bold">Access Denied</h1>
      </div>
    )
  }

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
