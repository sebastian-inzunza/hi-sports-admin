import { useRouter } from 'next/router'
import cn from 'classnames'
import { useWindowSize } from 'react-use'

import Link from '@/components/ui/link'
import { Routes } from '@/config/routes'
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils'
import { RESPONSIVE_WIDTH } from '@/utils/constants'
import { BackIcon } from '@/components/icons/back-icon'
import Avatar from '@/components/common/avatar'
import { siteSettings } from '@/settings/site.settings'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  online: boolean
}
interface Props {
  className?: string
  user: User
}

const HeaderView = ({ className, user, ...rest }: Props) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const { permissions } = getAuthCredentials()
  let adminPermission = hasAccess(adminOnly, permissions)
  const routes = adminPermission
    ? Routes.message.list
    : `${Routes?.dashboard}?tab=1`

  return (
    <>
      <div
        className={cn(
          'relative flex shrink-0 items-center border-b border-solid border-b-[#E5E7EB] bg-white p-2 sm:h-20 sm:pl-6 sm:pr-9',
          width >= RESPONSIVE_WIDTH ? 'justify-between' : '',
          className
        )}
        {...rest}
      >
        {width <= RESPONSIVE_WIDTH ? (
          <Link
            href={routes}
            className="mr-1 inline-block p-1 pl-0 text-2xl transition-colors duration-300 hover:text-accent-hover"
          >
            <BackIcon />
          </Link>
        ) : (
          ''
        )}
        <div
          className={`flex ${
            adminPermission ? 'cursor-pointer' : ''
          } items-center`}
          onClick={() => (adminPermission ? router.push(`/${user?.id}`) : '')}
        >
          <Avatar
            src={user?.avatar ?? siteSettings?.avatar?.placeholder}
            {...rest}
            alt={user?.firstName}
          />
          <h2 className="ml-2 text-xs font-semibold text-[#64748B]">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
      </div>
    </>
  )
}
