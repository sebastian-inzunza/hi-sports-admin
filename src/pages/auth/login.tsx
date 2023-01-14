import LoginForm from '@/components/auth/login-form'
import AuthPageLayout from '@/components/layout/auth-layout'

export default function Login() {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  )
}
