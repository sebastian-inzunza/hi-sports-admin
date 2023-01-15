/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from 'react'
import { siteSettings } from '@/settings/site.settings'
import MobileNavigation from '../navigation/mobile-navigation'
import SidebarItem from '../navigation/sidebar-item'
import Navbar from '../navigation/top-navbar'

type AdminLayoutProps = {
  children?: React.ReactNode
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem href={href} label={label} icon={icon} key={href} />
      ))}
    </Fragment>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="xl:w-76 ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow lg:block">
          <div className="flex flex-col space-y-6 py-3">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="ltr:lg:pl-72 ltr:xl:pl-76 rtl:lg:pr-72 rtl:xl:pr-76 rtl:lg:pl-0 w-full">
          <div className="h-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
