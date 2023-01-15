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
        href: Routes.shop.list,
        label: 'Proveedores',
        icon: 'ShopIcon',
      },
      {
        href: Routes.adminMyShops,
        label: 'Proyectos',
        icon: 'MyShopIcon',
      },
      {
        href: Routes.product.list,
        label: 'Productos',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.attribute.list,
        label: 'Atributos',
        icon: 'AttributeIcon',
      },
      {
        href: Routes.tag.list,
        label: 'Tags',
        icon: 'TagIcon',
      },
      {
        href: Routes.order.list,
        label: 'Alertas',
        icon: 'OrdersIcon',
      },
      {
        href: Routes.user.list,
        label: 'Usuarios',
        icon: 'UsersIcon',
      },
      {
        href: Routes.withdraw.list,
        label: 'Withdraws',
        icon: 'WithdrawIcon',
      },
      {
        href: Routes.question.list,
        label: 'Chat',
        icon: 'QuestionIcon',
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
