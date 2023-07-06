import { useBlockUserMutation, useUnblockUserMutation } from '@/data/users'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const UserBanView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } = useUnblockUserMutation()
  const { mutate: blockUser, isLoading: activeLoading } = useBlockUserMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    if (data?.banned) {
      unblockUser({
        id: data.id,
        banned: !data.banned,
      })
    } else {
      blockUser({
        id: data.id,
        banned: !data.banned,
      })
    }
    // await deleteUser(data.id);
    closeModal()
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.banned ? 'Desbloquear' : 'Bloquear'}
      title={data?.banned ? 'Desbloquear usuario' : 'Bloquear Usuario'}
      deleteBtnLoading={loading || activeLoading}
      description={
        data?.banned
          ? '¿Estás seguro de que quieres desbloquear este usuario?'
          : '¿Estás seguro de que quieres bloquear este usuario?'
      }
    />
  )
}

export default UserBanView
