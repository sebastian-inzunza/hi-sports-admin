import { useDeleteEnvMutation } from '@/data/enviroment'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const DeleteEnvironmentView = () => {
  const { data } = useModalState()

  const { closeModal } = useModalAction()
  const { mutate: deleteEnvironment, isLoading: loading } =
    useDeleteEnvMutation()
  async function handleDelete() {
    deleteEnvironment({ id: data })
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={'Eliminar'}
      title={'Eliminar entorno'}
      deleteBtnLoading={loading}
      description={
        '¿Estás seguro de que quieres eliminar este entorno?, esta acción no puede ser revertida'
      }
    />
  )
}

export default DeleteEnvironmentView
