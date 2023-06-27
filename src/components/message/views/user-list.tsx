import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

interface Props {
  className?: string
  filterText?: any
  permission: boolean
}
const UserList = ({ className, filterText, permission, ...rest }: Props) => {
  const { t } = useTranslation()
  const loadMoreRef = useRef(null)

  return (
    <>
      <div
        className={cn('flex-auto', permission ? 'pb-6' : '')}
        {...rest}
      ></div>
    </>
  )
}
