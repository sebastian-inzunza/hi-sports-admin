import Layout from '@/components/layout/admin'
import PublicidadForm from '@/components/publicidad/publicidad-form'

export default function CreateVideoteca() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Publicidad</h1>
      </div>

      <PublicidadForm />
    </>
  )
}

CreateVideoteca.Layout = Layout
