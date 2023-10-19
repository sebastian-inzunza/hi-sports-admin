import Layout from '@/components/layout/admin'
import VideotecaForm from '@/components/viodeteca/videoteca-form'

export default function CreateVideoteca() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Videoteca</h1>
      </div>

      <VideotecaForm />
    </>
  )
}

CreateVideoteca.Layout = Layout
