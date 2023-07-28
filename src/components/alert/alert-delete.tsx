import { useAlertDeleteMutation } from '@/data/alert'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const AlertDelete = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: deleteAlert, isLoading } = useAlertDeleteMutation()

  async function handleDelete() {
    console.log('Alert delete', data)
    deleteAlert({ id: data })
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText="text-yes"
      title="Eliminar alerta"
      description="Está seguro que desea eliminar esta alerta?"
      deleteBtnLoading={isLoading}
    />
  )
}

export default AlertDelete
