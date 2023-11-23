import MenuForm from '@/components/Menu/menu-form'
import Layout from '@/components/layout/admin'

export default function CreateMenu() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Menú</h1>
      </div>

      <MenuForm />
    </>
  )
}

CreateMenu.Layout = Layout
