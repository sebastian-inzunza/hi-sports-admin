import { useCategoryDeleteMutation } from '@/data/category'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const CategoryDeleteView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteCategory, isLoading: loading } =
    useCategoryDeleteMutation()

  async function handleDelete() {
    if (data) {
      deleteCategory({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar Categoría"
      description="¿Estás seguro de que quieres eliminar esta categoría?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default CategoryDeleteView
