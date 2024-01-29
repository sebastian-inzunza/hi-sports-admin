/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModifyRoleMutation } from '@/data/users'
import ConfirmationCard from '../common/confirmation-card'
import { useModalAction, useModalState } from '../ui/modal/modal.context'
import { Role } from '@/types/users'

const UserRoleView = () => {
  const { data } = useModalState()
  const { closeModal } = useModalAction()
  const { mutate: makeOrRevokeOperator, isLoading: loading } =
    useModifyRoleMutation()

  async function handleDelete() {
    makeOrRevokeOperator({
      id: data.id,
      role: data.role === Role.Operator ? Role.User : Role.Operator,
    })
    closeModal()
  }

  // Asign role enum to a variable
  let role = data.role

  // Use the variable to compare
  if (role === Role.Admin) {
    role = 'Administrador'
  } else if (role === Role.User) {
    role = 'Usuario'
  } else if (role === Role.Operator) {
    role = 'Operador'
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={'Modificar'}
      title={`Modificar rol de ${role}`}
      description={
        // back tick
        `¿Estás seguro de que quieres modificar el rol de este usuario?`
      }
      deleteBtnLoading={loading}
    />
  )
}

export default UserRoleView
