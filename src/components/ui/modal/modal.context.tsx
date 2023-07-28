/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export type MODAL_VIEWS =
  | 'BAN_CUSTOMER'
  | 'MAKE_ADMIN'
  | 'SELECT_USER'
  | 'REPLY_QUESTION'
  | 'DELETE_QUESTION'
  | 'ACCEPT_ABUSE_REPORT'
  | 'DECLINE_ABUSE_REPORT'
  | 'REVIEW_IMAGE_POPOVER'
  | 'ABUSE_REPORT'
  | 'DELETE_SUGGESTION'
  | 'DELETE_NOTE'
  | 'SHOW_CONTACT'
  | 'COMPOSE_MESSAGE'
  | 'LOCATE_USER'
  | 'MODAL_DELETE_CATEGORY_VIEW'
  | 'DELETE_ENVIRONMENT'
  | 'NOTE_EDIT'
  | 'ALERT_EDIT'
  | 'ALERT_DELETE'
  | 'DELETE_NOTICE'

interface State {
  view?: MODAL_VIEWS
  data?: any
  isOpen: boolean
}
type Action =
  | { type: 'open'; view?: MODAL_VIEWS; payload?: any }
  | { type: 'close' }

const initialState: State = {
  view: undefined,
  isOpen: false,
  data: null,
}

function modalReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
      }
    case 'close':
      return {
        ...state,
        view: undefined,
        data: null,
        isOpen: false,
      }
    default:
      throw new Error('Unknown Modal Action!')
  }
}

const ModalStateContext = React.createContext<State>(initialState)
ModalStateContext.displayName = 'ModalStateContext'
const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined)
ModalActionContext.displayName = 'ModalActionContext'

type ModalProviderProps = {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState)
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  )
}

export function useModalState() {
  const context = React.useContext(ModalStateContext)
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`)
  }
  return context
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext)
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`)
  }
  return {
    openModal(view?: MODAL_VIEWS, payload?: unknown) {
      dispatch({ type: 'open', view, payload })
    },
    closeModal() {
      dispatch({ type: 'close' })
    },
  }
}
