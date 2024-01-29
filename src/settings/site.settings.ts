import { Routes } from '@/config/routes'

export const siteSettings = {
  name: 'Hi Sports',
  description: 'Hi Sports Connect Admin Panel',
  logo: {
    url: '/images/logo.png',
    alt: 'HiSport',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'es',
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
        href: Routes.users.list,
        label: 'Usuarios',
        icon: 'UsersIcon',
      },

      {
        href: Routes.blog.list,
        label: 'Blogs',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.categories.list,
        label: 'Categorías',
        icon: 'CategoriesIcon',
      },
      {
        href: Routes.videoteca.list,
        label: 'Videoteca',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.menu.list,
        label: 'Menú',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.presentadores.list,
        label: 'Presentadores',
        icon: 'CouponsIcon',
      },
      {
        href: Routes.videoBlog.list,
        label: 'VideoBlog',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.publicidad.list,
        label: 'Publicidad',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.programing.list,
        label: 'Programación',
        icon: 'Bell',
      },
    ],
    coordinador: [
      {
        href: Routes.blog.list,
        label: 'Blogs',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.categories.list,
        label: 'Categorías',
        icon: 'CategoriesIcon',
      },

      {
        href: Routes.videoBlog.list,
        label: 'VideoBlog',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.menu.list,
        label: 'Menú',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.videoteca.list,
        label: 'Videoteca',
        icon: 'DashboardIcon',
      },
    ],

    ventas: [
      {
        href: Routes.publicidad.list,
        label: 'Publicidad',
        icon: 'ReviewIcon',
      },
    ],

    redactor: [
      {
        href: Routes.blog.list,
        label: 'Blogs',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.categories.list,
        label: 'Categorías',
        icon: 'CategoriesIcon',
      },

      {
        href: Routes.videoBlog.list,
        label: 'VideoBlog',
        icon: 'ProductsIcon',
      },
      {
        href: Routes.menu.list,
        label: 'Menú',
        icon: 'ReviewIcon',
      },
      {
        href: Routes.presentadores.list,
        label: 'Presentadores',
        icon: 'CouponsIcon',
      },
      {
        href: Routes.videoteca.list,
        label: 'Videoteca',
        icon: 'DashboardIcon',
      },
    ],
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
