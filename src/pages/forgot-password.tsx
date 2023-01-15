import AuthPageLayout from '@/components/layout/auth-layout'

export default function ForgotPassword() {
  return (
    <AuthPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-body">
        Olvidaste tu contraseña? Ingresa tu correo electrónico y te enviaremos
        un enlace para restablecerla.
      </h3>
      {/* TODO: Add forgot password form here */}
    </AuthPageLayout>
  )
}
