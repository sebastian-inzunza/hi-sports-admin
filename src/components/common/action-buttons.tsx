/* eslint-disable @typescript-eslint/no-explicit-any */
import { BanUser } from '@/components/icons/ban-user'
import { EditIcon } from '@/components/icons/edit'
import { TrashIcon } from '@/components/icons/trash'
import { Eye } from '@/components/icons/eye-icon'
import { CheckMarkCircle } from '@/components/icons/checkmark-circle'
import { useModalAction } from '@/components/ui/modal/modal.context'
import { CloseFillIcon } from '@/components/icons/close-fill'
import { AdminIcon } from '@/components/icons/admin-icon'
import Link from 'next/link'
import { Role } from '@/types/users'
import { ChatIcon } from '../icons/sidebar'

type Props = {
  id: string
  editModalView?: string | any
  deleteModalView?: string | any
  editUrl?: string
  detailsUrl?: string
  isUserActive?: boolean
  userStatus?: boolean
  isShopActive?: boolean
  approveButton?: boolean
  showContact?: boolean
  changeRefundStatus?: boolean
  showMakeAdminButton?: boolean
  showReplyQuestion?: boolean
  customLocale?: string
  role?: Role
}

const ActionButtons = ({
  id,
  editModalView,
  deleteModalView,
  editUrl,
  detailsUrl,
  userStatus = false,
  isUserActive = false,
  isShopActive,
  approveButton = false,
  showMakeAdminButton = false,
  showReplyQuestion = false,
  showContact = false,
  customLocale,
  role,
}: Props) => {
  const { openModal } = useModalAction()

  function handleDelete() {
    openModal(deleteModalView, id)
  }

  function handleEditModal() {
    openModal(editModalView, id)
  }

  function handleUserStatus(banned: boolean) {
    openModal('BAN_CUSTOMER', { id, banned })
  }

  function handleMakeAdmin() {
    openModal('MAKE_ADMIN', { id, role })
  }

  function handleShopStatus(status: boolean) {
    if (status === true) {
      //   openModal('SHOP_APPROVE_VIEW', id)
    } else {
      //   openModal('SHOP_DISAPPROVE_VIEW', id)
    }
  }

  function handleShowContact() {
    openModal('SHOW_CONTACT', id)
  }

  function handleReplyQuestion() {
    openModal('REPLY_QUESTION', id)
  }

  return (
    <div className="inline-flex w-auto items-center gap-8">
      {showReplyQuestion && (
        <button
          onClick={handleReplyQuestion}
          className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
        >
          Reply
        </button>
      )}
      {showMakeAdminButton && (
        <>
          {isUserActive ? (
            <button
              onClick={handleMakeAdmin}
              className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
              title={'Cambiar a operador'}
            >
              <AdminIcon width={18} />
            </button>
          ) : null}
        </>
      )}
      {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={'Eliminar'}
        >
          <TrashIcon width={16} />
        </button>
      )}
      {editModalView && (
        <button
          onClick={handleEditModal}
          className="text-body transition duration-200 hover:text-heading focus:outline-none"
          title={'Editar'}
        >
          <EditIcon width={16} />
        </button>
      )}
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
            title={'Aprobar'}
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
            title={'Desaprobar'}
          >
            <CloseFillIcon width={20} />
          </button>
        ))}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus(false)}
              className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
              title={'Bloquear'}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus(true)}
              className="text-accent transition duration-200 hover:text-accent focus:outline-none"
              title={'Activar'}
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}
      {editUrl && (
        <>
          {isUserActive ? (
            <Link
              href={editUrl}
              className={`disabled text-base transition duration-200 hover:text-heading`}
              title={'Editar'}
            >
              <EditIcon width={16} />
            </Link>
          ) : null}
        </>
      )}
      {detailsUrl && (
        <>
          {isUserActive ? (
            <Link
              href={detailsUrl}
              className={`ml-2 text-base transition duration-200 hover:text-heading`}
              title={'Detalles'}
              locale={customLocale}
            >
              <EditIcon width={24} />
            </Link>
          ) : null}
        </>
      )}
      {
        // showContact - show icon to contact with user (only for admin)
        showContact && (
          <button
            onClick={handleShowContact}
            className="text-accent transition duration-200 hover:text-accent-hover focus:outline-none"
          >
            <ChatIcon width={20} />
          </button>
        )
      }
    </div>
  )
}

export default ActionButtons
