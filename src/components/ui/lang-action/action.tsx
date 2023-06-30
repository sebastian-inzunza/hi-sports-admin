/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router'
import ActionButtons from '../action-buttons'

export type LanguageSwitcherProps = {
  id: string
  record: any
  slug: string
  deleteModalView?: string | any
  routes: any
  className?: string | undefined
}

export default function LanguageSwitcher({
  record,
  id,
  deleteModalView,
  routes,
}: LanguageSwitcherProps) {
  const {
    query: { suggestions },
  } = useRouter()
  return (
    <ActionButtons
      id={record?.id}
      editUrl={routes.editWithoutLang(id, suggestions)}
      deleteModalView={deleteModalView}
    />
  )
}
