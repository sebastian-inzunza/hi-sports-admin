import Navbar from '@/components/layout/navigation/top-navbar'
import MobileNavigation from '@/components/layout/navigation/mobile-navigation'
import { siteSettings } from '@/settings/site.settings'
import { useTranslation } from 'next-i18next'
import SidebarItem from '@/components/layout/navigation/sidebar-item'
import { useRouter } from 'next/router'

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'

  const SidebarItemMap = () => (
    <>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
      ))}
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
        <aside className="xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow ltr:left-0 ltr:right-auto rtl:left-auto rtl:right-0 lg:block">
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
