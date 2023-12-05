import Navbar from '@/components/layout/navigation/top-navbar'
import MobileNavigation from '@/components/layout/navigation/mobile-navigation'
import { siteSettings } from '@/settings/site.settings'
import { useTranslation } from 'next-i18next'
import SidebarItem from '@/components/layout/navigation/sidebar-item'
import logo from '../../../assets/placeholders/logo-His.png'
import Image from 'next/image'
import { useMeQuery } from '@/data/user'
import {
  SUPER_ADMIN,
  ADMIN_NOTES,
  ADMIN_PUBLICITY,
  ADMIN_MEDIA,
} from '@/utils/constants'

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation()
  const { data, isLoading: loading, error } = useMeQuery()

  const SidebarItemMap = () => (
    <>
      {data?.role === ADMIN_NOTES ? (
        <>
          {siteSettings.sidebarLinks.coordinador.map(
            ({ href, label, icon }) => (
              <SidebarItem
                href={href}
                label={t(label)}
                icon={icon}
                key={href}
              />
            )
          )}
        </>
      ) : data?.role === SUPER_ADMIN ? (
        <>
          {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
            <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
          ))}
        </>
      ) : data?.role === ADMIN_PUBLICITY ? (
        <>
          {siteSettings.sidebarLinks.ventas.map(({ href, label, icon }) => (
            <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
          ))}
        </>
      ) : data?.role === ADMIN_MEDIA ? (
        <>
          {siteSettings.sidebarLinks.redactor.map(({ href, label, icon }) => (
            <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
          ))}
        </>
      ) : null}
    </>
  )

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={'ltr'}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-sidebar px-4 pt-22 shadow ltr:left-0 ltr:right-auto rtl:left-auto rtl:right-0 lg:block">
          <div className="flex flex-col space-y-6 py-3">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="ltr:xl:pl-76 rtl:xl:pr-76 w-full ltr:lg:pl-72 rtl:lg:pl-0 rtl:lg:pr-72">
          <div className="h-full w-full p-5 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
export default AdminLayout
