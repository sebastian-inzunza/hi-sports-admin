import { blogUnblockUserMutation } from '@/data/blog'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const UserBanView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } = blogUnblockUserMutation()

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
      title={data?.banned ? 'Desbloquear Blog' : 'Bloquear Blog'}
      deleteBtnLoading={loading}
      description={
        data?.banned
          ? '¿Estás seguro de que quieres desbloquear este Blog?'
          : '¿Estás seguro de que quieres bloquear este Blog?'
      }
    />
  )
}

export default UserBanView
