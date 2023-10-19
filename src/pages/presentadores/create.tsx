import Layout from '@/components/layout/admin'
import PresentadorForm from '@/components/presentadores/presentadores-form'

export default function CreateVideoteca() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Crear Presentador
        </h1>
      </div>

      <PresentadorForm />
    </>
  )
}

CreateVideoteca.Layout = Layout
