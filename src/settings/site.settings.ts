import { Routes } from '@/config/routes'

export const siteSettings = {
  name: 'Kali Connect',
  description: 'Kali Connect Admin Panel',
  logo: {
    url: '/logo.svg',
    alt: 'KaliConnect',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'SISSA Digital',
    websiteUrl: 'https://sissadigital.com',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'Dashboard',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.operators.list,
        label: 'Operadores',
        icon: 'ShopIcon',
      },
      {
        href: Routes.user.list,
        label: 'Usuarios',
        icon: 'UsersIcon',
      },
      {
        href: Routes.blog.list,
        label: 'Blog',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.dataRecord.list,
        label: 'Date Record',
        icon: 'AttributeIcon',
      },
      {
        href: Routes.tracker.list,
        label: 'Tracker',
        icon: 'TagIcon',
      },
      {
        href: Routes.alerts.list,
        label: 'Alertas',
        icon: 'OrdersIcon',
      },
      {
        href: Routes.reviews.list,
        label: 'Sugerencias',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.settings,
        label: 'Configuración',
        icon: 'SettingsIcon',
      },
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
