import EnvironmentForm from '@/components/environments/environment-form'
import Layout from '@/components/layout/admin'

export default function CreateEnvironment() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear ambiente</h1>
      </div>
      <EnvironmentForm />
    </>
  )
}
CreateEnvironment.Layout = Layout
