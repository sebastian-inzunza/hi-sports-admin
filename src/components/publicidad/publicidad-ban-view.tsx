import { publicidadUnblockUserMutation } from '@/data/publicidad'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'

const UserBanView = () => {
  const { data } = useModalState()
  const { mutate: unblockUser, isLoading: loading } =
    publicidadUnblockUserMutation()

  const { closeModal } = useModalAction()

  async function handleDelete() {
    if (data?.banned) {
      unblockUser({
        id: data.id,
        banned: !data.banned,
      })
    } else {
      unblockUser({
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
      title={data?.banned ? 'Desbloquear publicidad' : 'Bloquear publicidad'}
      deleteBtnLoading={loading}
      description={
        data?.banned
          ? '¿Estás seguro de que quieres desbloquear este publicidad?'
          : '¿Estás seguro de que quieres bloquear este publicidad?'
      }
    />
  )
}

export default UserBanView
