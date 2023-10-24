import { useVideotecaDeleteMutation } from '@/data/videoteca'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteBannnerView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteBanner, isLoading: loading } =
    useVideotecaDeleteMutation()

  async function handleDelete() {
    if (data) {
      deleteBanner({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar banner"
      description="¿Estás seguro de que quieres eliminar este banner?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default DeleteBannnerView
