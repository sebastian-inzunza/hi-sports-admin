import Modal from '@/components/ui/modal/modal'
import dynamic from 'next/dynamic'
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context'
import MakeAdminView from '@/components/user/make-admin-view'
import NoteDeleteView from '@/components/blog/note-delete-view'
import DeleteEnvironmentView from '@/components/environments/environment-delete-view'
const BanCustomerView = dynamic(() => import('@/components/user/user-ban-view'))
const CategoryDeleteView = dynamic(
  () => import('@/components/category/category-delete-view')
)
const ComposerMessage = dynamic(
  () => import('@/components/message/compose-message')
)

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case 'BAN_CUSTOMER':
      return <BanCustomerView />
    case 'MAKE_ADMIN':
      return <MakeAdminView />
    case 'COMPOSE_MESSAGE':
      return <ComposerMessage />
    case 'LOCATE_USER':
      return <div>Locate User</div>
    case 'MODAL_DELETE_CATEGORY_VIEW':
      return <CategoryDeleteView />
    case 'DELETE_NOTE':
      return <NoteDeleteView />
    case 'DELETE_ENVIRONMENT':
      return <DeleteEnvironmentView />
    default:
      return null
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState()
  const { closeModal } = useModalAction()

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  )
}

export default ManagedModal
