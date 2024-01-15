import { usePresentadorDeleteMutation } from '@/data/presentador'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const CastDeleteView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteCast, isLoading: loading } =
    usePresentadorDeleteMutation()

  async function handleDelete() {
    if (data) {
      deleteCast({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar Presentador"
      description="¿Estás seguro de que quieres eliminar al presentador?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default CastDeleteView
