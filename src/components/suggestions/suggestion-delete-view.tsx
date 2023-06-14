import ConfirmationCard from '@/components/common/confirmation-card'
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context'
import { useDeleteSuggestionMutation } from '@/data/suggestions'
import { getErrorMessage } from '@/utils/form-error'

const SuggestionDeleteView = () => {
  const { data: modalData } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteSuggestion, isLoading: loading } =
    useDeleteSuggestionMutation()

  function handleDelete() {
    try {
      deleteSuggestion({ id: modalData })
      closeModal()
    } catch (error) {
      closeModal()
      getErrorMessage(error)
    }
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      deleteBtnLoading={loading}
      deleteBtnText="Delete"
      onDelete={handleDelete}
    />
  )
}

export default SuggestionDeleteView
