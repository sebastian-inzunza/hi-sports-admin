import { useVideoBlogDeleteMutation } from '@/data/videoBlog'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteBannnerView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteVideoblog, isLoading: loading } =
    useVideoBlogDeleteMutation()
  async function handleDelete() {
    if (data) {
      deleteVideoblog({ id: data })
      closeModal()
    }
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      title="Eliminar videoBlog"
      description="¿Estás seguro de que quieres eliminar este videoblog?"
      deleteBtnText="Eliminar"
      deleteBtnLoading={loading}
    />
  )
}

export default DeleteBannnerView
