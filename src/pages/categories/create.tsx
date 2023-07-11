import CategoryForm from '@/components/category/category-form'
import Layout from '@/components/layout/admin'

export default function CreateCategory() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Categoría</h1>
      </div>

      <CategoryForm />
    </>
  )
}

CreateCategory.Layout = Layout
