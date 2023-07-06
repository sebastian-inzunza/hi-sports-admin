import ConfirmationCard from '@/components/common/confirmation-card'
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context'

const CustomerBanView = () => {
  const { data } = useModalState()

  const { closeModal } = useModalAction()

  // TODO: Create a mutation to make or revoke admin
  async function handleMakeAdmin() {
    // makeOrRevokeAdmin({ user_id: data });
    closeModal()
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleMakeAdmin}
      deleteBtnText="text-yes"
      title="text-make-admin"
      description="text-description-make-admin"
      deleteBtnLoading={false}
    />
  )
}

export default CustomerBanView
