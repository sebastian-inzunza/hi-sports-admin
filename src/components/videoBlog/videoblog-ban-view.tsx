import { videoBlogUnblockUserMutation } from '@/data/videoBlog'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const UserBanView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } =
    videoBlogUnblockUserMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    unblockUser({
      id: data.id,
      banned: data.banned,
    })

    // await deleteUser(data.id);
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.banned ? 'Desbloquear' : 'Bloquear'}
      title={data?.banned ? 'Desbloquear videoblog' : 'Bloquear videoblog'}
      deleteBtnLoading={loading}
      description={
        data?.banned
          ? '¿Estás seguro de que quieres desbloquear este videoblog?'
          : '¿Estás seguro de que quieres bloquear este videoblog?'
      }
    />
  )
}

export default UserBanView
