import { useRouter } from 'next/router'
import cn from 'classnames'
import Avatar from '@/components/common/avatar'
import { siteSettings } from '@/settings/site.settings'
import { Participant } from '@/types'
import { useWindowSize } from '@/utils/use-window-size'
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils'
import Link from '@/components/ui/link'
import { Routes } from '@/config/routes'
import { BackIcon } from '@/components/icons/back-icon'
import { RESPONSIVE_WIDTH } from '@/utils/constants'
import Button from '@/components/ui/button'
import PopOver from '@/components/ui/popover'
interface Props {
  className?: string
  user: Participant
}

const HeaderView = ({ className, user, ...rest }: Props) => {
  const userId = user?.id.toString()
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
        <PopOver
          iconStyle="vertical"
          popOverPanelClass="!w-full min-w-[10rem] max-w-full rounded bg-white py-2 px-1 text-left shadow-cardAction"
          popOverButtonClass="text-[#9CA3AF]"
        >
          <Button
            className="!h-auto w-full !justify-start !py-1 px-2 text-sm leading-6 hover:bg-gray-50 hover:text-accent"
            variant="custom"
            onClick={() =>
              router.push(`${Routes.users.details({ id: userId })}}`)
            }
          >
            See Profile
          </Button>

          <Button
            className="!h-auto w-full !justify-start !py-1 px-2 text-sm leading-6 hover:bg-gray-50 hover:text-accent"
            variant="custom"
          >
            Set As Default
          </Button>

          <Button
            variant="custom"
            className="!h-auto w-full !justify-start !py-1 px-2 text-sm leading-6 text-[#F83D3D] hover:bg-gray-50 hover:text-[#d03131]"
          >
            Delete
          </Button>
        </PopOver>
      </div>
    </>
  )
}

export default HeaderView
