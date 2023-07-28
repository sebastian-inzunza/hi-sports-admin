import { useDeleteStoreNoticeMutation } from '@/data/store-notice'
import { useModalAction, useModalState } from '../ui/modal/modal.context'
import ConfirmationCard from '../common/confirmation-card'

const NoticeDeleteView = () => {
  const { closeModal } = useModalAction()
  const { data } = useModalState()
  const { mutate, isLoading: loading } = useDeleteStoreNoticeMutation()

  async function handleDelete() {
    mutate({ id: data })
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={'Eliminar'}
      title={'Eliminar aviso'}
      deleteBtnLoading={loading}
      description={'¿Estás seguro de que quieres eliminar este aviso?'}
    />
  )
}

export default NoticeDeleteView
