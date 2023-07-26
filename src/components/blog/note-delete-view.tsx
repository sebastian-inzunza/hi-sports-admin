import ConfirmationCard from '@/components/common/confirmation-card'
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context'
import { useDeleteNoteMutation } from '@/data/blog'

const NoteDeleteView = () => {
  const { data: modalData } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteNoteByID, isLoading: loading } = useDeleteNoteMutation()

  function handleDelete() {
    deleteNoteByID({
      id: modalData,
    })
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      deleteBtnLoading={loading}
      title="Estás seguro de eliminar esta nota?"
      description="Esta acción no se puede deshacer. Esta eliminará permanentemente la nota."
      deleteBtnText="Delete"
      onDelete={handleDelete}
    />
  )
}

export default NoteDeleteView
