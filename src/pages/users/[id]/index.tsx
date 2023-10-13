import AlertListSmall from '@/components/alert/alert-list-small'
import ProfileUpdateForm from '@/components/auth/profile-update-form'
import Layout from '@/components/layout/admin'
import ChatTable from '@/components/ui/chat-table'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useUserQuery } from '@/data/user'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export default function UserPage() {
  const router = useRouter()
  const {
    query: { id },
  } = router

  const { user, loading, error } = useUserQuery({
    id: Number(id),
  })

  if (loading) return <Loader />

  if (error) return <ErrorMessage message={error.message} />

  console.log(user)

  return (
    <>
      <div className="mb-10 flex w-full flex-wrap space-y-6 rtl:space-x-reverse xl:flex-nowrap xl:space-x-5 xl:space-y-0">
        <div className="w-full xl:w-1/2">
          {/* <AlertListSmall title="Alertas creadas" alerts={user?.alerts} /> */}
        </div>

        <div className="w-full xl:w-1/2">
          {
            /* Add the table created by conversation */
            // <ChatTable
            //   title="Conversaciones"
            //   messages={user?.conversations ?? []}
            // />
          }
        </div>
      </div>
      <ProfileUpdateForm me={user} />
    </>
  )
}

UserPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
})
