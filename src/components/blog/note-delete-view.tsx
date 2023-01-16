import ConfirmationCard from '@/components/common/confirmation-card'
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context'

const NoteDeleteView = () => {
  const { data: modalData } = useModalState()
  const { closeModal } = useModalAction()

  function handleDelete() {
    console.log('delete', modalData)
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      deleteBtnLoading={false}
      deleteBtnText="Delete"
      onDelete={handleDelete}
    />
  )
}

export default NoteDeleteView
