import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '@/components/layout/app'
import ErrorMessage from '@/components/ui/error-message'
import ChangePasswordForm from '@/components/auth/change-password-form'
import Loader from '@/components/ui/loader/loader'
import ProfileUpdateForm from '@/components/auth/profile-update-form'

import { useMeQuery } from '@/data/users'

export default function ProfilePage() {
  const { data, isLoading: loading, error } = useMeQuery()
  if (loading) return <Loader text={'Cargando perfil...'} />
  if (error) return <ErrorMessage message={error.message} />
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Actualiza tu perfil
        </h1>
      </div>
      <ProfileUpdateForm me={data} />
      <ChangePasswordForm />
    </>
  )
}

ProfilePage.Layout = Layout

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
