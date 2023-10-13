import { useTranslation } from 'next-i18next'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'

import { Routes } from '@/config/routes'
import AuthPageLayout from '@/components/layout/auth-layout'
import LoginForm from '@/components/auth/login-form'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
})

export default function LoginPage() {
  const router = useRouter()
  const { token, permissions } = getAuthCredentials()
  if (isAuthenticated({ token, permissions })) {
    router.replace(Routes.users.list)
  }
  const { t } = useTranslation('common')

  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        {t('admin-login-title')}
      </h3>
      <LoginForm />
    </AuthPageLayout>
  )
}
