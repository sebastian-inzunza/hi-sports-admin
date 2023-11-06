import Modal from '@/components/ui/modal/modal'
import dynamic from 'next/dynamic'
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context'
import MakeAdminView from '@/components/user/make-admin-view'
import NoteDeleteView from '@/components/blog/note-delete-view'
import DeleteEnvironmentView from '@/components/environments/environment-delete-view'
import AlertDelete from '@/components/alert/alert-delete'
import SuggestionDeleteView from '@/components/suggestions/suggestion-delete-view'
import NoticeDeleteView from '@/components/notice/notice-delete-view'
import MenuDeleteView from '@/components/Menu/menu-delete-view'
import CastDeleteView from '@/components/presentadores/presentadores-delete-view'
import DeleteVideoBlogView from '@/components/videoBlog/videoblog-delete_modal'
import DeleteBannnerView from '@/components/viodeteca/videoteca-delete_modal'
import DeletePublicity from '@/components/publicidad/publicidad-delete_modal'

const BanCustomerView = dynamic(() => import('@/components/user/user-ban-view'))
const CategoryDeleteView = dynamic(
  () => import('@/components/category/category-delete-view')
)
const ComposerMessage = dynamic(
  () => import('@/components/message/compose-message')
)

function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case 'MODAL_PUBLICIDAD':
      return <DeletePublicity /> //Cambiar a mi vista
    case 'MODAL_VIDEOTECA_BANNER':
      return <DeleteBannnerView /> //Cambiar a mi vista
    case 'MODAL_VIDEOBLOG_BANNER':
      return <DeleteVideoBlogView /> //Cambiar a mi vista
    case 'MODAL_CAST_BANNER':
      return <CastDeleteView /> //Cambiar a mi vista
    case 'MODAL_LATERAL_MENU':
      return <MenuDeleteView /> //Cambiar a mi vista
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
    case 'ALERT_DELETE':
      return <AlertDelete />
    case 'DELETE_SUGGESTION':
      return <SuggestionDeleteView />
    case 'DELETE_NOTICE':
      return <NoticeDeleteView />
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
