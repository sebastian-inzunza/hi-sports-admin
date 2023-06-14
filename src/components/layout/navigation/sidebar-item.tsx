/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { getIcon } from '@/utils/get-icon'
import * as sidebarIcons from '@/components/icons/sidebar'
import { useUI } from '@/contexts/ui.context'

const SidebarItem = ({ href, icon, label, active }: any) => {
  const { closeSidebar } = useUI()
  return (
    <Link
      href={href}
      // Add proprty to check if the link is active or not
      className={`flex items-center rounded-md py-2 px-1 text-sm font-medium ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {getIcon({
        iconList: sidebarIcons,
        iconName: icon,
        className: 'w-5 h-5 me-4',
      })}
      <span onClick={closeSidebar} className="ml-3">
        {label}
      </span>
    </Link>
  )
}

export default SidebarItem
