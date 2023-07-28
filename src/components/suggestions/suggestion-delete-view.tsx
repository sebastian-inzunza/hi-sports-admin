import { useSuggestionDeleteMutation } from '@/data/suggestions'

import ConfirmationCard from '@/components/common/confirmation-card'
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context'

const SuggestionDeleteView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteMutation, isLoading: loading } =
    useSuggestionDeleteMutation()

  function handleDelete() {
    deleteMutation({ id: data })
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      deleteBtnLoading={loading}
      deleteBtnText="Eliminar"
      onDelete={handleDelete}
    />
  )
}

export default SuggestionDeleteView
