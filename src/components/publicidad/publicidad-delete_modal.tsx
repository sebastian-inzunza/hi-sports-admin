import { usePublicidadDeleteMutation } from '@/data/publicidad'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteBannnerView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deletePublicity, isLoading: loading } =
    usePublicidadDeleteMutation()

  async function handleDelete() {
    if (data) {
      deletePublicity({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar publicidad"
      description="¿Estás seguro de que quieres eliminar esta publicidad?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default DeleteBannnerView
