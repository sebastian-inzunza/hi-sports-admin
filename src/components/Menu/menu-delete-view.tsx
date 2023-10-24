import { useMenuDeleteMutation } from '@/data/menu'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const MenuDeleteView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteMenu, isLoading: loading } = useMenuDeleteMutation()

  async function handleDelete() {
    if (data) {
      deleteMenu({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar Menu"
      description="¿Estás seguro de que quieres  eliminar este elemento del menu?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default MenuDeleteView
