import { Routes } from '@/config/routes'

export const siteSettings = {
  name: 'Kali Connect',
  description: 'Kali Connect Admin Panel',
  logo: {
    url: '/logo.png',
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
      labelTransKey: 'Perfil',
    },
    {
      href: Routes.logout,
      labelTransKey: 'Salir',
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
        href: Routes.notifications.list,
        label: 'Notificaciones',
        icon: 'ChatIcon',
      },
      {
        href: Routes.environments.list,
        label: 'Ambientes',
        icon: 'AdminIcon',
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
        href: Routes.tracker.list,
        label: 'Tracker',
        icon: 'Pin',
      },
      {
        href: Routes.alerts.list,
        label: 'Alertas',
        icon: 'BellIcon',
      },
      {
        href: Routes.suggestions.list,
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
