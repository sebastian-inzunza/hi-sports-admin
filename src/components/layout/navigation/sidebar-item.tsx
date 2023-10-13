import Link from '@/components/ui/link'
import * as sidebarIcons from '@/components/icons/sidebar'
import { useUI } from '@/contexts/ui.context'
import { getIcon } from '@/utils/get-icon'

const SidebarItem = ({ href, icon, label }: any) => {
  const { closeSidebar } = useUI()
  return (
    <Link
      href={href}
      className="flex w-full items-center text-start text-base text-body-dark text-white focus:text-accent"
    >
      {getIcon({
        iconList: sidebarIcons,
        iconName: icon,
        className: 'w-5 h-5 me-4',
      })}
      <span onClick={() => closeSidebar()}>{label}</span>
    </Link>
  )
}

export default SidebarItem
