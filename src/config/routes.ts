export const Routes = {
  dashboard: '/',
  login: '/auth/login',
  logout: '/logout',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  settings: '/settings',
  profileUpdate: '/profile-update',
  checkout: '/orders/checkout',
  user: {
    ...routesFactory('/users'),
  },
  operators: {
    ...routesFactory('/operators'),
  },
  blog: {
    ...routesFactory('/blog'),
  },
  tracker: {
    ...routesFactory('/tracker'),
  },
  category: {
    ...routesFactory('/categories'),
  },
  reports: {
    ...routesFactory('/reports'),
  },
  alerts: {
    ...routesFactory('/alerts'),
  },
  reviews: {
    ...routesFactory('/reviews'),
  },
  suggestions: {
    ...routesFactory('/suggestions'),
  },
  staff: {
    ...routesFactory('/staffs'),
  },
  refund: {
    ...routesFactory('/refunds'),
  },
  question: {
    ...routesFactory('/questions'),
  },
}

function routesFactory(endpoint: string) {
  return {
    list: `${endpoint}`,
    create: `${endpoint}/create`,
    editWithoutLang: (slug: string, shop?: string) => {
      return shop
        ? `/${shop}${endpoint}/${slug}/edit`
        : `${endpoint}/${slug}/edit`
    },
    edit: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/edit`
        : `${language}${endpoint}/${slug}/edit`
    },
    translate: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/translate`
        : `${language}${endpoint}/${slug}/translate`
    },
    details: (slug: string) => `${endpoint}/${slug}`,
  }
}
