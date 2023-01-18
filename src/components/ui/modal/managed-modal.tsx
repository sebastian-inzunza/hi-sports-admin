/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic'
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context'
import Modal from '@/components/ui/modal/modal'
import UserBanView from '@/components/user/user-ban-view'
import UserRoleView from '@/components/user/modify-user-role'

// const SuggestionDeleteView = dynamic(
//   () => import('@/components/suggestions/suggestion-delete-view')
// )

const NoteDeleteView = dynamic(
  () => import('@/components/blog/note-delete-view')
)

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState()
  const { closeModal } = useModalAction()

  function renderModal(view: MODAL_VIEWS | undefined, data: any) {
    console.log('information -->', data)
    switch (view) {
      case 'DELETE_NOTE':
        return <NoteDeleteView />
      case 'BAN_CUSTOMER':
        return <UserBanView />
      case 'MAKE_ADMIN':
        return <UserRoleView />
    }
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  )
}

export default ManagedModal
