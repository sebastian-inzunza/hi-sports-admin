import Layout from '@/components/layout/admin'
import UserCreateForm from '@/components/user/user-form'

export default function CreateUser() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Usuario</h1>
      </div>

      <UserCreateForm />
    </>
  )
}

CreateUser.Layout = Layout
