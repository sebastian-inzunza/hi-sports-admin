import AppLayout from '@/components/layout/app'
import SettingsForm from '@/components/settings/settings-form'
import { Routes } from '@/config/routes'
import { useSettingsQuery } from '@/data/settings'
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from '@/utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function Settings() {
  const { settings, loading, error } = useSettingsQuery()
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Settings</h1>
      </div>
      <SettingsForm settings={settings} />
    </>
  )
}

Settings.Layout = AppLayout

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
