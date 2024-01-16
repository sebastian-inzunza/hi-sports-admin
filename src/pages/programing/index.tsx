import Card from '@/components/common/card'
import Layout from '@/components/layout/admin'
import ProgramacionForm from '@/components/programming/programacion-form'

export default function CreateVideoteca() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <Card>
          <h1 className="text-lg font-semibold text-heading">
            Crear Programación
          </h1>
        </Card>
      </div>

      <ProgramacionForm />
    </>
  )
}

CreateVideoteca.Layout = Layout
