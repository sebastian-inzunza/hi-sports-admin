import LoginForm from '@/components/auth/login-form'
import AuthPageLayout from '@/components/layout/auth-layout'
import { Routes } from '@/config/routes'
import { getAuthCredentials, isAuthenticated } from '@/utils/auth-utils'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const { token, permissions } = getAuthCredentials()
  if (isAuthenticated({ token, permissions })) {
    router.replace(Routes.dashboard)
  }

  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  )
}
